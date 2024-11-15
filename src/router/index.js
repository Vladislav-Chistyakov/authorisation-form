import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '../views/Authorization.vue'
import Catalog from '../views/Catalog.vue'
import NotFound from '../views/NotFound.vue'
import { ref, computed } from 'vue'

const routes = [
    { path: '/authorization', component: Authorization, name: 'authorization' },
    { path: '/catalog', component: Catalog, name: 'catalog' },
    // { path: '/catalog', component: Catalog, name: 'catalog' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
// export const currentPath = ref(window.location.hash)
//
// window.addEventListener('hashchange', (event) => {
//     console.log('route', window.location.hash, event)
//     currentPath.value = window.location.hash
// })
//
// export const currentView = computed(() => {
//     console.warn('test 1', currentPath.value)
//     console.warn('test 2', currentPath.value)
//     return routes[currentPath.value.slice(1) || '/'] || NotFound
// })
