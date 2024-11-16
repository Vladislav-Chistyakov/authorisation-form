<script setup>
import { pageComponent } from './router/index.js'
</script>

<template>
  <main class="main">
    <div class="container">
      <component :is="pageComponent"></component>
    </div>
  </main>
</template>

<style lang="scss">
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
</style>
