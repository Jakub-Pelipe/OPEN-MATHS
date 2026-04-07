import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import views
import Home from './views/Home.vue'
import Auth from './views/Auth.vue'
import Learn from './views/Learn.vue'
import Methodology from './views/Methodology.vue'

// Import global styles
import './assets/global.css'

// Define routes
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/auth',
    component: Auth,
    name: 'auth'
  },
  {
    path: '/learn',
    component: Learn,
    name: 'learn'
  },
  {
    path: '/methodology',
    component: Methodology,
    name: 'methodology'
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Create app instance
const app = createApp(App)

// Use router
app.use(router)

// Mount app
app.mount('#app')