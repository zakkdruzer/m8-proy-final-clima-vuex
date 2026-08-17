function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function calculateWeeklyStats(forecast = []) {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return {
      minTemperature: null,
      maxTemperature: null,
      averageTemperature: null,
      rainyDays: 0,
      clearDays: 0,
      cloudyDays: 0
    }
  }

  const minTemperatures = forecast
    .map((day) => day.minTemperature)
    .filter(isNumber)

  const maxTemperatures = forecast
    .map((day) => day.maxTemperature)
    .filter(isNumber)

  const dailyAverages = forecast
    .map((day) => {
      if (!isNumber(day.minTemperature) || !isNumber(day.maxTemperature)) {
        return null
      }

      return (day.minTemperature + day.maxTemperature) / 2
    })
    .filter(isNumber)

  const averageTemperature = dailyAverages.length > 0
    ? dailyAverages.reduce((sum, temperature) => {
        return sum + temperature
      }, 0) / dailyAverages.length
    : null

  return {
    minTemperature: minTemperatures.length > 0
      ? Math.min(...minTemperatures)
      : null,

    maxTemperature: maxTemperatures.length > 0
      ? Math.max(...maxTemperatures)
      : null,

    averageTemperature: averageTemperature === null
      ? null
      : Number(averageTemperature.toFixed(1)),

    rainyDays: forecast.filter((day) => {
      return (day.precipitationProbability || 0) >= 50
        || (day.precipitationSum || 0) >= 1
    }).length,

    clearDays: forecast.filter((day) => {
      return [0, 1].includes(day.weatherCode)
    }).length,

    cloudyDays: forecast.filter((day) => {
      return [2, 3, 45, 48].includes(day.weatherCode)
    }).length
  }
}