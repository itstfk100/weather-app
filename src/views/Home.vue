<template>
  <div :class="weatherClass" class="home">
    <!-- Fondo de partículas animadas -->
    <Particles id="tsparticles" :options="particlesOptions" class="particles-bg" />
    
    <!-- Capa del contenido -->
    <div class="content">
      <input 
        v-model="city" 
        @keyup.enter="getWeather" 
        placeholder="Introduce una ciudad"
        class="city-input"
      />
      <WeatherCard v-if="weather" :weather="weather" />
      <p v-else>Esperando el clima...</p>
    </div>
  </div>
</template>

<script>
import WeatherCard from '../components/WeatherCard.vue'
import Particles from "vue3-particles"

export default {
  name: "Home",
  components: {
    WeatherCard,
    Particles
  },
  data() {
    return {
      city: 'Lima', // Ciudad predeterminada
      weather: null,
      apiKey: 'ca2059bea7ec3fcd2ffaeb03bfc84ddb',
      // Opciones de configuración para las partículas
      particlesOptions: {
        background: {
          color: { value: "#121212" }
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
          }
        },
        particles: {
          color: { value: "#ffffff" },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          collisions: { enable: true },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 2,
            straight: false
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 5 } }
        },
        detectRetina: true
      }
    }
  },
  computed: {
    // Define la clase del fondo en función de la condición climática
    weatherClass() {
      if (!this.weather) return 'default';
      const weatherCondition = this.weather.weather[0].main.toLowerCase();
      if (weatherCondition.includes('clear')) {
        return 'clear-sky';
      } else if (weatherCondition.includes('clouds')) {
        return 'cloudy';
      } else if (weatherCondition.includes('rain')) {
        return 'rainy';
      } else if (weatherCondition.includes('snow')) {
        return 'snowy';
      } else {
        return 'default';
      }
    }
  },
  methods: {
    async getWeather() {
      try {
        const response = await this.$axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`
        );
        this.weather = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    this.getWeather();
  }
}
</script>

<style scoped>
.home {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-size: cover;
  background-position: center;
  transition: background-color 0.5s ease-in-out;
}

/* Fondo de partículas detrás del contenido */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 500px;
}

.city-input {
  padding: 15px;
  margin-bottom: 30px;
  font-size: 1.5em;
  border: none;
  border-radius: 5px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
}

p {
  font-size: 1.5em;
  color: #ccc;
}

/* Fondos adaptados según las condiciones climáticas */
.clear-sky {
  background: linear-gradient(to top, #ff7e5f, #feb47b);
}

.cloudy {
  background: linear-gradient(to top, #bdc3c7, #2c3e50);
}

.rainy {
  background: linear-gradient(to top, #2c3e50, #34495e);
}

.snowy {
  background: linear-gradient(to top, #00d2ff, #3a7bd5);
}

.default {
  background: linear-gradient(to top, #6a11cb, #2575fc);
}

@media (max-width: 768px) {
  .home {
    padding: 20px;
  }
  
  .content {
    padding: 20px;
    width: 90%;
    max-width: 400px;
  }
  
  .city-input {
    font-size: 1.2em;
  }
  
  p {
    font-size: 1.2em;
  }
}
</style>