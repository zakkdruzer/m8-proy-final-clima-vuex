export function normalizePlace(place) {
  const name = place.name || 'Lugar sin nombre'
  const country = place.country || ''
  const admin1 = place.admin1 || ''

  return {
    id: `${name}-${place.latitude}-${place.longitude}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-'),

    name,
    country,
    countryCode: place.country_code || '',
    admin1,

    latitude: place.latitude,
    longitude: place.longitude,
    timezone: place.timezone || 'auto'
  }
}

export function normalizeWeather(apiData) {
  const current = apiData.current || {}
  const daily = apiData.daily || {}

  const dates = daily.time || []

  const forecast = dates.map((date, index) => ({
    date,
    weatherCode: daily.weather_code?.[index] ?? null,
    maxTemperature: daily.temperature_2m_max?.[index] ?? null,
    minTemperature: daily.temperature_2m_min?.[index] ?? null,
    precipitationProbability:
      daily.precipitation_probability_max?.[index] ?? null,
    precipitationSum: daily.precipitation_sum?.[index] ?? null,
    maxWindSpeed: daily.wind_speed_10m_max?.[index] ?? null
  }))

  return {
    current: {
      temperature: current.temperature_2m ?? null,
      humidity: current.relative_humidity_2m ?? null,
      apparentTemperature: current.apparent_temperature ?? null,
      precipitation: current.precipitation ?? null,
      weatherCode: current.weather_code ?? null,
      windSpeed: current.wind_speed_10m ?? null,
      time: current.time ?? null
    },

    forecast,

    timezone: apiData.timezone || '',

    units: {
      temperature: apiData.current_units?.temperature_2m || '°C',
      windSpeed: apiData.current_units?.wind_speed_10m || 'km/h',
      precipitation: apiData.current_units?.precipitation || 'mm'
    }
  }
}