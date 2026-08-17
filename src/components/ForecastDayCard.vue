<script setup>
import { computed } from 'vue'
import { getWeatherInfo } from '@/utils/weatherCodes'

const props = defineProps({
  day: {
    type: Object,
    required: true
  },

  temperatureSymbol: {
    type: String,
    default: '°C'
  }
})

const weatherInfo = computed(() => {
  return getWeatherInfo(props.day.weatherCode)
})

const formattedDate = computed(() => {
  if (!props.day.date) {
    return 'Fecha no disponible'
  }

  return new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date(`${props.day.date}T12:00:00`))
})
</script>

<template>
  <article class="forecast-day-card">
    <p class="forecast-day-card__date">
      {{ formattedDate }}
    </p>

    <p
      class="forecast-day-card__icon"
      :aria-label="weatherInfo.label"
      role="img"
    >
      {{ weatherInfo.icon }}
    </p>

    <h3>{{ weatherInfo.label }}</h3>

    <p class="forecast-day-card__temperatures">
      <span class="forecast-day-card__max">
        {{ day.maxTemperature }}{{ temperatureSymbol }}
      </span>

      <span class="forecast-day-card__min">
        {{ day.minTemperature }}{{ temperatureSymbol }}
      </span>
    </p>

    <dl class="forecast-day-card__details">
      <div>
        <dt>Lluvia</dt>
        <dd>{{ day.precipitationProbability }}%</dd>
      </div>

      <div>
        <dt>Precipitación</dt>
        <dd>{{ day.precipitationSum }} mm</dd>
      </div>

      <div>
        <dt>Viento máx.</dt>
        <dd>{{ day.maxWindSpeed }} km/h</dd>
      </div>
    </dl>
  </article>
</template>