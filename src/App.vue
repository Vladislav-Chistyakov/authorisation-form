<script setup>
</script>

<template>
  <main class="main">
    <div class="container">
      <div class="wrapper">1</div>
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
