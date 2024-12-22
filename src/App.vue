<script setup></script>

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
