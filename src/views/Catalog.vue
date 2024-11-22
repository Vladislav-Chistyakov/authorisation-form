<script setup>
import {onBeforeMount, ref} from 'vue'

const clearUserLocalStore = async function () {
  console.log('Очистка local store')
  await localStorage.removeItem('user')
}

const checkUserLocalStore = async function () {
  const user = await localStorage.getItem('user')
  console.log('Проверка local store', user)
}

const list = ref([])
const pending = ref(true)
const error = ref(null)
const api = 'https://vue-study.skillbox.cc/api/products'

const getListCatalog = async () => {
  pending.value = true
  try {
    await fetch(api).then(async (res) => {
      list.value = await res.json()
      list.value = list.value.items
      console.warn('getListCatalog: ', list.value)
    }).catch(() => error.value = true)
  }
  finally {
    pending.value = false
  }
}

onBeforeMount(async () => {
  await getListCatalog()
})
</script>

<template>
  <div class="catalog wrapper">
    <h1 class="catalog__heading">Каталог</h1>

    <div>
      <button @click="clearUserLocalStore">Очистка local store</button>
      <button @click="checkUserLocalStore">проверка local store</button>
    </div>

    <ul
        v-if="list.length > 0 && !pending"
        class="catalog__list"
    >
      <li v-for="(item, index) in  list" :key="index" class="catalog__item">
        <button type="button">
          <div style="height: 100px; width: 100px;">
            <div :style="`height: 100%; width: 100%; background-color: red; background-image: url(${item.image.file.url}); background-size: cover;`" />
          </div>
          <strong>{{ item.title }}</strong>
        </button>
      </li>
    </ul>

    <div v-if="pending">
      <strong>Зазгрузка</strong>
    </div>

    <div v-if="error && !pending">
      <strong>{{ error }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/container';
@include container.container;

.catalog {
  .catalog__heading {
    margin: 0;
  }

  .catalog__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .catalog__item {
    margin: 0;
    padding: 0;
  }
}
</style>
