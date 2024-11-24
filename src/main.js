import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router";
import './style.css'
import App from './App.vue'
import Authorization from "./views/Authorization.vue";
import Catalog from "./views/Catalog.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'authorization', component: Authorization },
        { path: '/catalog', name: 'catalog', component: Catalog },
    ]
})

createApp(App)
    .use(router)
    .mount('#app')
