<template>
  <div :class="weatherClass" class="weather-card">
    <h2>{{ weather.name }}</h2>
    <p>{{ weather.weather[0].description }}</p> <!-- Descripción del clima en español -->
    <div class="temperature">
      <span>{{ weather.main.temp }}°C</span> <!-- Temperatura en °C -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
  computed: {

    
    // Cambiar el estilo según la temperatura
    weatherClass() {
      const temp = this.weather.main.temp;  // Usamos la temperatura tal como está
      return temp > 293.15 ? 'warm' : 'cold';  // El umbral sigue siendo el mismo
    }
  },
}
</script>

<style scoped>
.weather-card {
  background: #2a2a2a;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 300px;
  margin: auto;
}

.warm {
  background: #ff7043; /* Calidez para clima cálido */
}

.cold {
  background: #37474f; /* Oscuro para clima frío */
}

h2 {
  font-size: 2em;
}

.temperature {
  font-size: 2.5em;
  font-weight: bold;
}
</style>