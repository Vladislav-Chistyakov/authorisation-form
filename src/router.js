import { createRouter, createWebHistory } from "vue-router";
import Authorization from "./views/Authorization.vue";
import Registration from "./views/Registration.vue";
import Catalog from "./views/Catalog.vue";
import CatalogElement from "./views/CatalogElement.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  { path: "/", redirect: "/signin" },
  { path: "/signin", name: "authorization", component: Authorization },
  { path: "/signup", name: "registration", component: Registration },
  { path: "/list", name: "catalog", component: Catalog },
  { path: "/list/:id", name: "element", component: CatalogElement },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "catalog" || to.name === "element") {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      next();
    } else {
      next({
        path: "/signin",
        name: "authorization",
        component: Authorization,
      });
    }
  } else {
    next();
  }
});
