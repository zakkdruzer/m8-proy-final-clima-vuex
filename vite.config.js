// Configuración de Vite para que el build funcione correctamente en GitHub Pages.
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/m8-proy-final-clima-vuex/',
})