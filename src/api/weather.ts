const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export const getWeather = async (
  city: string,
) => {
  const url =
    `https://api.openweathermap.org/data/2.5/weather` +
    `?q=${encodeURIComponent(city)}` +
    `&appid=${API_KEY}` +
    `&units=metric`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch weather data')
  }

  return response.json()
}