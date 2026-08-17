export function generateWeatherAlerts(forecast = []) {
  if (!Array.isArray(forecast) || forecast.length === 0) {
    return []
  }

  const alerts = []

  const hottestTemperature = Math.max(
    ...forecast
      .map((day) => day.maxTemperature)
      .filter((temperature) => typeof temperature === 'number')
  )

  const rainyDays = forecast.filter((day) => {
    return (day.precipitationProbability || 0) >= 60
      || (day.precipitationSum || 0) >= 5
  }).length

  const freezingDays = forecast.filter((day) => {
    return typeof day.minTemperature === 'number'
      && day.minTemperature <= 0
  }).length

  const windyDays = forecast.filter((day) => {
    return typeof day.maxWindSpeed === 'number'
      && day.maxWindSpeed >= 50
  }).length

  if (hottestTemperature >= 30) {
    alerts.push({
      type: 'warning',
      title: 'Posible ola de calor',
      message: 'Se esperan temperaturas máximas de 30 °C o más durante la semana.'
    })
  }

  if (rainyDays >= 4) {
    alerts.push({
      type: 'info',
      title: 'Semana lluviosa',
      message: `Se esperan precipitaciones importantes durante ${rainyDays} días.`
    })
  }

  if (freezingDays >= 2) {
    alerts.push({
      type: 'danger',
      title: 'Riesgo de heladas',
      message: `Se esperan temperaturas mínimas de 0 °C o menos durante ${freezingDays} días.`
    })
  }

  if (windyDays >= 2) {
    alerts.push({
      type: 'warning',
      title: 'Vientos fuertes',
      message: `Se esperan vientos de 50 km/h o más durante ${windyDays} días.`
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      type: 'success',
      title: 'Condiciones estables',
      message: 'No se detectaron alertas meteorológicas relevantes para esta semana.'
    })
  }

  return alerts
}