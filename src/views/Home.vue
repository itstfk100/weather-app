<template>
    <div :class="weatherClass" class="home">
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
  
  export default {
    components: {
      WeatherCard
    },
    data() {
      return {
        city: 'Lima', // Ciudad predeterminada es Lima
        weather: null,
        apiKey: 'ca2059bea7ec3fcd2ffaeb03bfc84ddb', // Tu API Key
      }
    },
    computed: {
      weatherClass() {
        if (!this.weather) return ''; // Si no hay datos, no aplicamos ninguna clase
        const weatherCondition = this.weather.weather[0].main.toLowerCase(); // Condición principal (p.ej. "clear", "rain")
        
        if (weatherCondition.includes('clear')) {
          return 'clear-sky'; // Si es un día soleado
        } else if (weatherCondition.includes('clouds')) {
          return 'cloudy'; // Si está nublado
        } else if (weatherCondition.includes('rain')) {
          return 'rainy'; // Si está lloviendo
        } else if (weatherCondition.includes('snow')) {
          return 'snowy'; // Si está nevando
        } else {
          return 'default'; // Fondo por defecto si no encaja en ninguna categoría
        }
      }
    },
    methods: {
      async getWeather() {
        try {
          const response = await this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
          this.weather = response.data;  // Almacena la respuesta en `weather`
        } catch (error) {
          console.error(error);
        }
      }
    },
    mounted() {
      this.getWeather(); // Obtén el clima cuando se monta el componente
    }
  }
  </script>
  
  <style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0;
    margin: 0;
    background-size: cover; /* Aseguramos que el fondo cubra toda la pantalla */
    background-position: center;
    transition: background-color 0.5s ease-in-out;
  }
  
  .content {
    text-align: center;
    color: white;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente para contraste */
    width: 100%;
    max-width: 500px; /* Limitar el ancho máximo para pantallas grandes */
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
  
  .clear-sky {
    background: linear-gradient(to top, #ff7e5f, #feb47b); /* Fondo cálido (soleado) */
  }
  
  .cloudy {
    background: linear-gradient(to top, #bdc3c7, #2c3e50); /* Fondo nublado */
  }
  
  .rainy {
    background: linear-gradient(to top, #2c3e50, #34495e); /* Fondo lluvioso */
  }
  
  .snowy {
    background: linear-gradient(to top, #00d2ff, #3a7bd5); /* Fondo nevado */
  }
  
  .default {
    background: linear-gradient(to top, #6a11cb, #2575fc); /* Fondo por defecto */
  }
  
  @media (max-width: 768px) {
    .home {
      padding: 20px;
    }
    
    .content {
      padding: 20px;
      width: 90%;
      max-width: 400px; /* Reducir el tamaño de la caja de contenido en pantallas más pequeñas */
    }
  
    .city-input {
      font-size: 1.2em;
    }
  
    p {
      font-size: 1.2em;
    }
  }
  </style>
  