<template>
  <div :class="weatherClass" class="weather-card">
    <h2>{{ weather.name }}</h2>
    <p>{{ weather.weather[0].description }}</p>
    <div class="temperature">
      <span>{{ weather.main.temp }}°C</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
  computed: {
    // Cambia la clase según la temperatura (umbral fijo)
    weatherClass() {
      const temp = this.weather.main.temp;
      return temp > 293.15 ? 'warm' : 'cold';
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
  background: #ff7043;
}

.cold {
  background: #37474f;
}

h2 {
  font-size: 2em;
}

.temperature {
  font-size: 2.5em;
  font-weight: bold;
}
</style>