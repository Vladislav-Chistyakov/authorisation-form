<script setup></script>

<template>
  <main class="main">
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style lang="scss">
@use '@/assets/sass/colors';

* {
  font-family: 'Inter', Helvetica, Arial, sans-serif;
}

body {
  background-color: colors.$bg-main;
}
</style>

<style scoped lang="scss">
@use '@/assets/sass/colors';
@use '@/assets/sass/container';
@include container.container;

.main {
  background-color: colors.$bg-main;
}
</style>
