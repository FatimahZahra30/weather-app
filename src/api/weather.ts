const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const CURRENT_URL =
  'https://api.openweathermap.org/data/2.5/weather'

const FORECAST_URL =
  'https://api.openweathermap.org/data/2.5/forecast'

const GEOCODING_URL =
  'https://api.openweathermap.org/geo/1.0/direct'

export interface LocationResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export interface ForecastItem {
  time: string
  temperature: number
  description: string
  icon: string
}

export interface DailyForecast {
  date: string
  day: string
  temperature: number
  description: string
  icon: string
}

export interface WeatherData {
  name: string
  temperature: number
  feelsLike: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  high: number
  low: number
  timezone: number
  dt: number
  sunrise: number
  sunset: number
  hourly: ForecastItem[]
  daily: DailyForecast[]
}

export const searchLocations = async (
  query: string,
): Promise<LocationResult[]> => {
  if (!query.trim()) {
    return []
  }

  const response = await fetch(
    `${GEOCODING_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`,
  )

  if (!response.ok) {
    throw new Error('Failed to search locations')
  }

  const data = await response.json()

  return data.map((location: any) => ({
    name: location.name,
    country: location.country,
    state: location.state,
    lat: location.lat,
    lon: location.lon,
  }))
}

export const getWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {
  const currentResponse = await fetch(
    `${CURRENT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  )

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current weather')
  }

  const currentData = await currentResponse.json()

  const forecastResponse = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  )

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast')
  }

  const forecastData = await forecastResponse.json()

  const forecastList = forecastData.list

  const hourly: ForecastItem[] = forecastList
    .slice(0, 6)
    .map((item: any) => ({
      time: item.dt_txt,
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }))

  const dailyMap = new Map<string, any[]>()

  forecastList.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0]

    if (!dailyMap.has(date)) {
      dailyMap.set(date, [])
    }

    dailyMap.get(date)!.push(item)
  })

  const daily: DailyForecast[] = Array.from(dailyMap.entries())
    .slice(0, 5)
    .map(([date, items]) => {
      const temperatures = items.map(
        (item: any) => item.main.temp,
      )

      const averageTemperature =
        temperatures.reduce(
          (sum: number, temp: number) => sum + temp,
          0,
        ) / temperatures.length

      const representativeItem =
        items[Math.floor(items.length / 2)]

      const dayDate = new Date(
        `${date}T12:00:00`,
      )

      return {
        date,
        day: dayDate.toLocaleDateString(
          'en-US',
          {
            weekday: 'long',
          },
        ),
        temperature: averageTemperature,
        description:
          representativeItem.weather[0].description,
        icon:
          representativeItem.weather[0].icon,
      }
    })

  const today = new Date()

  const todayString =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(
      today.getDate(),
    ).padStart(2, '0')}`

  const todayForecasts = forecastList.filter(
    (item: any) =>
      item.dt_txt.startsWith(todayString),
  )

  const temperatures = todayForecasts.map(
    (item: any) => item.main.temp,
  )

  const high = temperatures.length
    ? Math.max(...temperatures)
    : currentData.main.temp

  const low = temperatures.length
    ? Math.min(...temperatures)
    : currentData.main.temp

  return {
    name: currentData.name,
    temperature: currentData.main.temp,
    feelsLike: currentData.main.feels_like,
    description: currentData.weather[0].description,
    icon: currentData.weather[0].icon,
    humidity: currentData.main.humidity,
    windSpeed: currentData.wind.speed,
    high,
    low,
    timezone: currentData.timezone,
    dt: currentData.dt,
    sunrise: currentData.sys.sunrise,
    sunset: currentData.sys.sunset,
    hourly,
    daily,
  }
}