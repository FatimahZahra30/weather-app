const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const CURRENT_URL =
  'https://api.openweathermap.org/data/2.5/weather'

const FORECAST_URL =
  'https://api.openweathermap.org/data/2.5/forecast'

const GEOCODING_URL =
  'https://api.openweathermap.org/geo/1.0/direct'


/* =========================
   Types
   ========================= */

export interface LocationResult {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
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
}


/* =========================
   Search Locations
   ========================= */

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


/* =========================
   Get Weather
   ========================= */

export const getWeather = async (
  lat: number,
  lon: number,
): Promise<WeatherData> => {

  /* =========================
     Current Weather
     ========================= */

  const currentResponse = await fetch(
    `${CURRENT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  )

  if (!currentResponse.ok) {
    throw new Error('Failed to fetch current weather')
  }

  const currentData = await currentResponse.json()


  /* =========================
     Forecast
     ========================= */

  const forecastResponse = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  )

  if (!forecastResponse.ok) {
    throw new Error('Failed to fetch forecast')
  }

  const forecastData = await forecastResponse.json()


  /* =========================
     Today's High / Low
     ========================= */

  const today = new Date()

  const todayString =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const todayForecasts = forecastData.list.filter(
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


  /* =========================
     Return Clean Data
     ========================= */

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
  }
}