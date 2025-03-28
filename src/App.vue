<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './views/Home.vue'

export default {
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  background: #121212; /* Fondo oscuro */
  color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>