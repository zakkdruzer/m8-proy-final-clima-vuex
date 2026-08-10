const STORAGE_KEY = 'unidad-temperatura'

// Leer unidad guardada o usar 'C' por defecto
export function getSavedUnit() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'F' ? 'F' : 'C'
}

// Guardar unidad seleccionada
export function saveUnit(unit) {
  window.localStorage.setItem(STORAGE_KEY, unit)
}