import axios from "axios";

const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});

const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export async function searchPlacesByName(name) {
  const response = await geocodingApi.get("/search", {
    params: {
      name,
      count: 10,
      language: "es",
      format: "json",
    },
  });

  return response.data.results || [];
}

export async function getWeatherForecast(
  latitude,
  longitude,
  unit = "celsius",
) {
  const response = await weatherApi.get("/forecast", {
    params: {
      latitude,
      longitude,

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ].join(","),

      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "precipitation_sum",
        "wind_speed_10m_max",
      ].join(","),

      temperature_unit: unit,
      wind_speed_unit: "kmh",
      timezone: "auto",
      forecast_days: 7,
    },
  });

  return response.data;
}
