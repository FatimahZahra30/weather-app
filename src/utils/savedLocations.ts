export interface SavedLocation {
  name: string
  lat: number
  lon: number
}

const STORAGE_KEY = 'savedLocations'

export const getSavedLocations = (): SavedLocation[] => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return []
  }

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export const isLocationSaved = (
  lat: number,
  lon: number,
): boolean => {
  const locations = getSavedLocations()

  return locations.some(
    location =>
      Math.abs(location.lat - lat) < 0.0001 &&
      Math.abs(location.lon - lon) < 0.0001,
  )
}

export const addSavedLocation = (
  location: SavedLocation,
) => {
  const locations = getSavedLocations()

  const alreadySaved = locations.some(
    saved =>
      Math.abs(saved.lat - location.lat) < 0.0001 &&
      Math.abs(saved.lon - location.lon) < 0.0001,
  )

  if (alreadySaved) {
    return
  }

  locations.push(location)

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(locations),
  )
}

export const removeSavedLocation = (
  lat: number,
  lon: number,
) => {
  const locations = getSavedLocations()

  const updatedLocations = locations.filter(
    location =>
      Math.abs(location.lat - lat) >= 0.0001 ||
      Math.abs(location.lon - lon) >= 0.0001,
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedLocations),
  )
}