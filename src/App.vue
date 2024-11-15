<script setup>
import router from './router'
import {computed} from "vue";
import { onBeforeRouteUpdate } from 'vue-router'
// ...

onBeforeRouteUpdate(async (to, from) => {
  // react to route changes...
  console.warn(to, from)
})

const location = computed(() => {
  return router.options.history.location
})

const routes = computed(() => {
  return router.getRoutes()
})
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="wrapper" style="color: red">
        <pre>
          {{ location }}
        </pre>
        <pre>
          {{ routes }}
        </pre>

        <RouterLink to="/authorization">authorization</RouterLink> |
        <RouterLink to="/catalog">catalog</RouterLink>
<!--        <component :is="router.[]"-->
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use '~/src/assets/main';
@use '~/src/assets/sass/colors';

* {
  font-family: 'Inter', Helvetica, Arial, sans-serif;
}

body {
  background-color: colors.$bg-main;
}
</style>

<style scoped lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/container';
@include container.container;

.main {
  background-color: colors.$bg-main;
}

.container {
  background-color: colors.$text-lite-green;
}

.wrapper {
  background-color: colors.$bg-block;
}
</style>
