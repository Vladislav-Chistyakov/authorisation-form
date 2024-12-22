<script setup>
import { onBeforeMount, ref } from 'vue'

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

    <ul
        v-if="list.length > 0 && !pending"
        class="catalog__list"
    >
      <li v-for="(item, index) in  list" :key="index" class="catalog__item">
        <RouterLink :to="`/list/${item.id}`" class="catalog__link">

          <div class="catalog__link-img-block" >
            <img :src="item.image.file.url" :alt="item.title" class="catalog__link-img" />
          </div>


          <div class="catalog__link-info">
            <strong class="catalog__link-title">{{ item.title }}</strong>

            <strong class="catalog__link-price">
              {{ item.price.toLocaleString('ru-RU', { style: "currency", currency: "RUB" }) }}
            </strong>
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
      <strong class="catalog__error">ERROR: {{ error }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/container';
@include container.container;

.catalog {
  padding-top: 20px;
  padding-bottom: 20px;
}

.catalog__heading {
  margin: 0 0 16px 0;
}

.catalog__list {
  margin: 0;
  padding: 0 0 30px;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.catalog__item {
  background-color: colors.$bg-car;
  padding: 12px 16px;
  border-radius: 20px;
}

.catalog__link-img-block {
  padding: 10px;
  border-radius: 16px;
  overflow: hidden;
  background-color: colors.$bg-block;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.catalog__link-img {
  object-fit: contain;
  width: auto;
  height: 200px;
  max-width: 200px;
}

.catalog__link-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.catalog__link-title {
  font-size: 16px;
  line-height: 18px;
  color: colors.$text-grey;
}

.catalog__link-price {
  font-size: 14px;
  line-height: 16px;
  color: colors.$text-grey;
}

.catalog__loading {
  text-align: center;
  padding: 20px 0;
}

.catalog__error-block {
  display: flex;
  padding: 20px;
  border-radius: 20px;
  background-color: colors.$bg-car;
  margin-bottom: 20px;
}

.catalog__error {
  font-size: 18px;
  line-height: 20px;
  color: #dc0000;
}

@media screen and (min-width: 576px) {
  .catalog__list {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
}

@media screen and (min-width: 1024px) {
  .catalog__list {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
}
</style>
