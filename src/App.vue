<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const routePatch = computed(() => {
  return route.path
})

// watch(routePatch, async (newValue) => {
//   if (newValue !== '/') {
//     const user = localStorage.getItem('user')
//     if (!user) {
//       await router.push({ path: '/'})
//       .catch((error) => {
//         console.error('Error, ошибка при переходе на другую страницу: ', error)
//       })
//     }
//   }
// })
</script>

<template>
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/normalize';

@include normalize.normalize;

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
</style>
