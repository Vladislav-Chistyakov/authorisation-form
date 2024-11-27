<script setup>
// const test = location
//
// const path = function () {
//   console.log(location.value)
// }
//
// watch(test, (newVal, oldVal) => {
//   console.log(test)
//   console.log(testOne.value)
//   if (newVal !== oldVal) {
//     console.warn('newVal', newVal)
//     testOne.value = newVal
//   }
// })
import {useRoute} from "vue-router";

const route = useRoute()
</script>

<template>
  <div>
    <p>
      <strong>Current route path:</strong> {{ route }}
    </p>

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
