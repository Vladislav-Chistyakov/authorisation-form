<script setup>
import { pageComponent } from './router/index.js'
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="wrapper">
        <component :is="pageComponent"></component>
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
  padding: 0;
  background-color: colors.$bg-main;
}

.container {
  background-color: colors.$text-lite-green;
}

.wrapper {
  background-color: colors.$bg-block;
}
</style>
