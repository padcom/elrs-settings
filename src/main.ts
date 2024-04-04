import './main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('./pages/Home.vue') },
    { path: '/hardware', component: () => import('./pages/Hardware.vue') },
  ],
})

createApp(App)
  .use(router)
  .mount('#app')
