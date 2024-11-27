import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

const routes = [
    { path: '/', name: 'authorization', component: ()=> import('./views/Authorization.vue') },
    { path: '/catalog', name: 'catalog', component: ()=> import('./views/Catalog.vue') },
    { path: '/catalog/:id', name: 'element', component: ()=> import('./views/CatalogElement.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
