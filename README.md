# App de Clima SPA – Módulo 7 (Usuarios, Login y Estado Global)

Aplicación de clima construida con Vue 3 + Vite que muestra el clima actual de distintos lugares de Chile y, en esta iteración del módulo 7, agrega un sistema básico de usuarios con login, estado global en Vuex y personalización de preferencias.

## Sistema de usuarios y autenticación

El sistema de usuarios está pensado para fines educativos y utiliza datos simulados en el front (usuarios mock) en lugar de un backend real.

### Credenciales de prueba

El sistema de login utiliza usuarios simulados definidos en el front. Para probar la autenticación se puede usar el siguiente usuario de ejemplo:

- Email: `demo@climaapp.com`
- Contraseña: `123456`

Al iniciar sesión con estas credenciales, la app mostrará el nombre del usuario en el header, habilitará las rutas protegidas (`/favoritos`, `/preferencias`) y aplicará sus preferencias de clima (unidad y tema). 

### Qué se guarda de cada usuario

Cada usuario incluye:

- `name`: nombre para mostrar en la interfaz (header/navbar).
- `email`: correo usado para el login.
- `preferences`:
  - `temperatureUnit`: unidad de temperatura preferida (`C` o `F`).
  - `theme`: tema visual (`light` o `dark`).
- `favorites`: arreglo de IDs de lugares favoritos (coinciden con los IDs de `src/data/lugares.js`).

Estos datos se almacenan en el módulo `auth` de Vuex, junto con:

- `isAuthenticated`: flag que indica si hay sesión activa.
- `loginError`: mensaje de error de login para mostrar en la vista de inicio de sesión.

### Flujo de login y logout

- El usuario ingresa email y contraseña en `/login`.
- La acción `auth/login` compara las credenciales con un arreglo de usuarios mock.
- En caso de éxito:
  - Se guarda el usuario (sin contraseña) en Vuex.
  - `isAuthenticated` pasa a `true`.
  - La app redirige a la ruta Home (`/`).
- En caso de error:
  - Se define un mensaje claro de error en `loginError` (“Usuario o contraseña incorrectos”).
  - No se mantiene usuario en el estado.

En el header se muestra:

- El texto “Conectado como: [Nombre]” cuando hay sesión activa.
- Un botón “Cerrar sesión” que dispara la acción `auth/logout`, limpia el estado del usuario y redirige a `/login`.

## Rutas relacionadas con autenticación y personalización

La navegación se implementa con Vue Router usando `createWebHashHistory` para compatibilidad con GitHub Pages.

Rutas principales:

- `/`  
  Home pública que muestra la lista de lugares y su clima actual. 
- `/place/:id`  
  Detalle ampliado del lugar, con clima actual, pronóstico semanal y estadísticas.
- `/login`  
  Vista de formulario de inicio de sesión (email + contraseña), con manejo de éxito y error.
- `/favoritos`  
  Vista protegida que muestra los lugares favoritos del usuario autenticado. Solo accesible si `isAuthenticated` es `true`; en caso contrario se redirige a `/login`.
- `/preferencias`  
  Vista protegida donde el usuario puede configurar sus preferencias de clima (unidad °C/°F y tema claro/oscuro). También requiere sesión activa y redirige a `/login` si no hay usuario autenticado.

Las rutas protegidas usan un guard global en el router que revisa la propiedad `requiresAuth` en `meta` y el estado `auth/isLoggedIn` en Vuex.

## Personalización según usuario

La aplicación ajusta parte de la interfaz según el usuario que ha iniciado sesión:

- **Lugares favoritos:**  
  La vista `/favoritos` lee el arreglo de IDs de favoritos desde `auth.userFavorites` y filtra la lista de lugares de `src/data/lugares.js` para mostrar solo los favoritos del usuario.
- **Preferencias de clima:**  
  La vista `/preferencias` permite modificar:
  - Unidad de temperatura (`C` o `F`), que se reutiliza en Home y Favoritos.
  - Tema visual (`light` o `dark`), que afecta el aspecto general de la app. 
  Estos datos se actualizan mediante la acción `auth/updatePreferences` y se leen en distintas vistas a través de getters de Vuex.

## Cómo ejecutar el proyecto

### Requisitos previos

- Node.js y npm instalados.

### Pasos para correr el proyecto localmente

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

Por defecto la app se sirve en `http://localhost:5173/` (puede variar según la configuración de Vite).

### Build y preview de producción

```bash
# Generar build para producción
npm run build

# Previsualizar el build
npm run preview
```

## Estado global con Vuex

El estado global se maneja con Vuex e incluye al menos el módulo `auth` para autenticación y preferencias.

El módulo `auth` define:

- `state`: usuario actual, `isAuthenticated`, `loginError`.
- `mutations`: para iniciar sesión, cerrar sesión y actualizar preferencias.
- `actions`: para manejar el proceso de login/logout y cambios en preferencias.
- `getters`: para acceder de forma cómoda a `isLoggedIn`, `userName`, `userPreferences` y `userFavorites`.

Los componentes (Home, Login, Favoritos, Preferencias, header) leen los datos del usuario desde Vuex usando `useStore` y `computed`.

---

## Enlace al repo:

https://github.com/zakkdruzer/m7-proy-final-clima-vuex

## Puedes ver el resultado en:

https://zakkdruzer.github.io/m7-proy-final-clima-vuex/#/