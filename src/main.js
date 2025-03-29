import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import Particles from 'vue3-particles'

const app = createApp(App)

app.config.globalProperties.$axios = axios
document.body.style.margin = '0';      // Elimina márgenes
document.body.style.padding = '0';     // Elimina rellenos
document.body.style.height = '100vh';  // Asegura que ocupe toda la altura de la ventana
document.body.style.backgroundColor = '#121212'; // Fondo oscuro

// Configuración global de Axios
app.config.globalProperties.$axios = axios

app.mount('#app')

