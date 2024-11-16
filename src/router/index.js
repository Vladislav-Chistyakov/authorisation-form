import Authorization from '../views/Authorization.vue'
import Catalog from '../views/Catalog.vue'
import NotFound from '../views/NotFound.vue'
import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'authorization', component: Authorization },
    { path: '/catalog', name: 'catalog', component: Catalog },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export const location = computed(() => {
    return router.options.history.location
})

export const pageComponent = computed(() => {
    for (const optionsPage of router.options.routes) {
        if (optionsPage.path === location.value) {
            return optionsPage.component
        }
    }
    return NotFound
})
