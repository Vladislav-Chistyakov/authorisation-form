<script setup>
import { location, pageComponent } from './router/index.js'
import {computed, watch} from 'vue'
import { router } from './router'

const testOne = pageComponent

const test = location

const path = function () {
  console.log(location.value)
}

watch(test, (newVal, oldVal) => {
  console.log(test)
  console.log(testOne.value)
  if (newVal !== oldVal) {
    console.warn('newVal', newVal)
    testOne.value = newVal
  }
})
</script>

<template>
  <main class="main">
    <button @click="path"></button>
    <div class="container">
      {{ test }}
      <component :is="testOne"></component>
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
