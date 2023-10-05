import './assets/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const GOOGLE_CLIENT_ID = '627320695409-lks0260nctbbrmldf7tkm68lnaotm3pd.apps.googleusercontent.com'


const app = createApp(App)
const pinia = createPinia()

app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CLIENT_ID
})

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
