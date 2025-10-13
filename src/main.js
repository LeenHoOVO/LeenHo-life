import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PixelUI from '@mmt817/pixel-ui'

const app = createApp(App)

app.use(router)
app.use(PixelUI)

app.mount('#app')
