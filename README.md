# App de Clima SPA (Módulo 6)

Aplicación de clima construida como SPA usando Vue 3 + Vite, basada en una lista de lugares de Chile con información de clima actual, pronóstico semanal y estadísticas calculadas a partir de los datos del módulo anterior.

## Vistas principales

- **Home**  
  - Muestra un listado de al menos 5 lugares con su clima actual (nombre, región, estado, temperatura, humedad y viento).  
  - Permite buscar lugares por nombre usando un input con `v-model`.  
  - Permite elegir la unidad de temperatura (°C / °F), que se guarda y se reutiliza en toda la app.

- **Detalle de lugar**  
  - Muestra información ampliada de un lugar seleccionado desde Home.  
  - Incluye clima actual, detalles de humedad/viento, pronóstico semanal y estadísticas de la semana (mínima, máxima y promedio).  

## Rutas de Vue Router

La navegación se implementa con Vue Router y se maneja sin recargar la página.

- **`/`**  
  - Ruta principal (Home).  
  - Lista los lugares y permite seleccionar uno para ver su detalle.

- **`/place/:id`**  
  - Ruta dinámica para el detalle de cada lugar.  
  - `id` corresponde al identificador de cada lugar (por ejemplo, `santiago`, `valparaiso`, etc.).  

Para compatibilidad con GitHub Pages se utiliza `createWebHashHistory`, por lo que las rutas se verán como:

- `#/` para Home  
- `#/place/:id` para el detalle

## Datos de clima

Los datos de clima se cargan desde un módulo local en `src/data/lugares.js`, basado en la estructura trabajada en el módulo 4:

- Cada lugar incluye:  
  - `id`, `nombre`, `region`, `tempActual`, `estadoActual`, `icono`, `humedad`, `viento`.  
- Cada lugar tiene un `pronosticoSemanal` con:
  - `dia`, `min`, `max`, `estado`.  
- Las estadísticas semanales (mínima, máxima y promedio) se calculan en la vista de detalle a partir del `pronosticoSemanal`.

## Interacción y componentes

La app utiliza:

- `v-model` para búsqueda de lugares y selección de unidad de temperatura.
- `v-for` para renderizar listas de lugares y días del pronóstico.
- `v-if` / `v-else` para mostrar mensajes cuando no se encuentran resultados.
- `@click` para navegar al detalle y volver a Home.

Componentes principales:

- `App.vue` como componente raíz.  
- `HomeView.vue` y `PlaceDetailView.vue` como vistas.  
- Componentes reutilizables:
  - `LugarCard.vue` para cada tarjeta de lugar en Home.
  - `PronosticoSemanal.vue` para la lista de días de pronóstico.
  - `EstadisticasSemanales.vue` para mostrar las estadísticas de la semana.

## Cómo ejecutar el proyecto localmente

Requisitos:

- Node.js y npm instalados.

Pasos:

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar el build
npm run preview
```

La app se sirve por defecto en `http://localhost:5173/` (puede variar según la configuración de Vite).

## Deploy en GitHub Pages

Para publicar la app en GitHub Pages se realizaron estos ajustes:

1. **Configurar `base` en `vite.config.js`**

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/NOMBRE-DEL-REPO/', // reemplazar por el nombre real del repositorio
})
```

2. **Configurar Vue Router con `createWebHashHistory`**

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

Esto asegura que las rutas funcionen correctamente al recargar páginas en GitHub Pages.

3. **Instalar y configurar `gh-pages`**

En `package.json` se agregaron los scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Y se instaló la dependencia:

```bash
npm install gh-pages --save-dev
```

4. **Proceso de deploy**

```bash
npm run deploy
```

Esto genera la carpeta `dist` y publica el contenido en la rama `gh-pages`. En GitHub, en **Settings → Pages**, se configura:

- Source: `Deploy from a branch`
- Branch: `gh-pages`, carpeta `/`

La app queda publicada en:

```text
https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/
```

(Actualiza esta línea con tu usuario y el nombre real del repo.)

## Enlace al repositorio

- Repositorio público: `https://github.com/zakkdruzer/m6-proy-final-app-clima-vue`
- Deploy en GitHub Pages: `https://zakkdruzer.github.io/m6-proy-final-app-clima-vue/`
