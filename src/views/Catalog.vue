<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

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
        <RouterLink :to="`/catalog/${item.id}`" class="catalog__link">

          <img :src="item.image.file.url" :alt="item.title" class="catalog__link-img" width="100" height="100" />

          <div class="catalog__link-info">
            <strong class="catalog__link-title">{{ item.title }}</strong>

            <strong class="catalog__link-price">{{ item.price }}</strong>
          </div>
        </RouterLink>
      </li>
    </ul>

    <div v-if="pending" class="catalog__loading">
      <strong class="catalog__loading">
        Зазгрузка...
      </strong>
    </div>

    <div v-if="error && !pending" class="catalog__error-block">
      <strong class="catalog__error">{{ error }}</strong>
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

  .catalog {
  }

  .catalog__heading {
  }

  .catalog__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .catalog__item {
    padding: 0;
  }

  .catalog__link {
  }

  .catalog__link-img {
  }

  .catalog__link-info {
  }

  .catalog__link-title {
  }

  .catalog__link-price {
  }

  .catalog__loading {
  }

  .catalog__error-block {
  }

  .catalog__error {
  }
}
</style>
