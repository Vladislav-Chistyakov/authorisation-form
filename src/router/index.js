import Authorization from '../views/Authorization.vue'
import Catalog from '../views/Catalog.vue'
import NotFound from '../views/NotFound.vue'
import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'authorization', component: Authorization },
    { path: '/catalog', name: 'catalog', component: Catalog },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

export const location = computed(() => {
    return router.options.history.location
})

export const pageComponent = computed(() => {
    const localInfo = localStorage.getItem('user') || null
    console.warn('localInfo', localInfo)
    for (const optionsPage of router.options.routes) {
        if (optionsPage.path === location.value) {
            if (!localInfo) {
                return Authorization
            }
            return optionsPage.component
        }
    }
    return NotFound
})
