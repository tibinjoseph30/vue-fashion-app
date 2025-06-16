import { createApp } from 'vue'
import App from './App.vue'
import '@/global.css'
import '@/styles/main.scss'
import router from './router/Router'

createApp(App).use(router).mount('#app')
