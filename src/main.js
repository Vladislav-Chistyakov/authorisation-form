import {computed, createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from './views/NotFound.vue'
import './style.css'
import App from './App.vue'

const routes = [
    { path: '/', name: 'authorization', component: ()=> import('./views/Authorization.vue') },
    { path: '/catalog', name: 'catalog', component: ()=> import('./views/Catalog.vue') },
    { path: '/catalog/:id', name: 'element', component: ()=> import('./views/CatalogElement.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const  currentPath = computed(() => {
    return createWebHistory()
})

export const currentView = computed(() => {
    return routes[currentPath.value.slice(1) || '/'] || NotFound
})

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')
