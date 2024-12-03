<script setup>
import { useRoute, useRouter } from 'vue-router'
import {computed, watch} from "vue";

const route = useRoute()
const router = useRouter()
const routePatch = computed(() => {
  return route.path
})

watch(routePatch, async (newValue, oldValue) => {
  console.log('test 2', newValue, oldValue)
  if (newValue !== '/') {
    const user = localStorage.getItem('user')
    console.log('test 3', user)
    if (!user) {
      console.log('test 4', router)
      // router.split()
      await router.push({ path: '/'}).then((event) => {
        console.log('test 5', event)
      }).catch((error) => {
        console.log('test 6', error)
      })
    }
  }
})
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
      <RouterLink to="/catalog">Go to About</RouterLink>
    </nav>

    <main class="main">
      <div class="container">
        <RouterView />
      </div>
    </main>
  </div>
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
