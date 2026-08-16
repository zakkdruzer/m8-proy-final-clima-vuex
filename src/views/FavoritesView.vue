<template>
  <main class="page">
    <section class="page__header">
      <h1>Mis favoritos</h1>
      <p>
        Aquí podrás guardar los lugares que quieras consultar rápidamente.
      </p>
    </section>

    <section class="empty-state">
      <p>Aún no tienes lugares favoritos.</p>

      <RouterLink to="/" class="button-link">
        Buscar un lugar
      </RouterLink>
    </section>
  </main>
</template>