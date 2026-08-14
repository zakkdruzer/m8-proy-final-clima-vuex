<!-- Componente que muestra la tarjeta de un lugar con su clima actual. -->
<template>
  <article class="card lugar-card">
    <header class="lugar-card__header">
      <h2 class="lugar-card__name">{{ lugar.nombre }}</h2>
      <p class="lugar-card__region">{{ lugar.region }}</p>
    </header>

    <section class="lugar-card__body">
      <p class="lugar-card__state">
        Estado actual: {{ lugar.estadoActual }}
      </p>
      <p class="lugar-card__temp">
        Temperatura actual: {{ lugar.tempActual }}°{{ unidad }}
      </p>
      <p class="lugar-card__details">
        Humedad: {{ lugar.humedad }}% · Viento: {{ lugar.viento }} km/h
      </p>
    </section>

    <footer class="lugar-card__footer">
      <!-- Botón para ir al detalle del lugar -->
      <button class="lugar-card__button" @click="$emit('ver-detalle', lugar.id)">
        Ver detalle
      </button>
    </footer>
  </article>
</template>

<script>
// Componente de presentación; recibe datos del lugar y unidad desde el padre.
export default {
  name: 'LugarCard',
  props: {
    lugar: {
      type: Object,
      required: true, // Objeto con los datos del lugar (nombre, región, clima, etc.).
    },
    unidad: {
      type: String,
      required: true, // Unidad de temperatura a mostrar: 'C' o 'F'.
    },
  },
}
</script>

<style scoped>
/* Estilos base de la tarjeta; se complementan con estilos globales según tema. */

.card {
  padding: 1rem; /* Espacio interno de la tarjeta. */
  border-radius: 8px; /* Bordes redondeados. */
  background-color: #ffffff; /* Fondo claro por defecto (tema light). */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Sombra suave. */
  display: flex; /* Usamos flex para organizar contenido verticalmente. */
  flex-direction: column; /* Apilamos header, body y footer en columna. */
  gap: 0.5rem; /* Separación entre secciones internas. */
}

.lugar-card__name {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.lugar-card__region {
  font-size: 0.9rem;
  opacity: 0.8;
}

.lugar-card__state,
.lugar-card__temp,
.lugar-card__details {
  font-size: 0.95rem;
}

.lugar-card__button {
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  border: none;
  background-color: #22c55e; /* Color verde para el botón. */
  color: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
}

.lugar-card__button:hover {
  background-color: #16a34a; /* Color más intenso al pasar el mouse. */
}
</style>