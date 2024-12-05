<script setup>
import { useRoute } from 'vue-router'
import { onBeforeMount, ref} from 'vue'

const route = useRoute()

const card = ref(null)
const pending = ref(true)
const error = ref(null)
const api = `https://vue-study.skillbox.cc/api/products/${route.params.id}`

const getCatalogCard = async () => {
  pending.value = true
  try {
    await fetch(api)
        .then(async (res) => card.value = await res.json())
        .catch(() => error.value = true)
  }
  finally {
    pending.value = false
  }
}

onBeforeMount(async () => {
  await getCatalogCard()
})
</script>

<template>
  <div class="wrapper product-card">
    <div v-if="card" class="product-card__info">
      <div v-if="card.title &&  card.image && card.image.file && card.image.file.url" class="product-card__block-image">
        <img
            :src="card.image.file.url"
            :alt="card.title"
            class="product-card__image"
        />
      </div>

      <div class="product-card__content">
        <strong v-if="card.title" class="product-card__product-name">
          {{ card.title }}
        </strong>

        <p v-if="card.price" class="product-card__product-price">
          Цена: {{ card.price.toLocaleString('ru-RU', { style: "currency", currency: "RUB" }) }}
        </p>

        <p v-if="card.category && card.category.title" class="product-card__product-category">
          Категория: {{ card.category.title }}
        </p>

        <div class="product-card__block-color">
          <p class="product-card__color-description">
            Доступные цвета:
          </p>

          <ul v-if="card.colors" class="product-card__list-colors">
            <li
                v-for="(item, index) in card.colors"
                :key="index"
                :style="{ backgroundColor: item.code, height: 30 + 'px', width: 30 + 'px' }"
                class="product-card__item-color"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/src/assets/sass/colors';
@use '~/src/assets/sass/container';
@include container.container;

.product-card {
  padding-top: 20px;
}

.product-card__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  background: colors.$bg-car;
  border-radius: 20px;
}

.product-card__block-image {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.product-card__image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 280px;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.product-card__product-name,
.product-card__product-price,
.product-card__product-category,
.product-card__color-description {
  color: colors.$text-grey;
}

.product-card__product-name {
  font-size: 24px;
  line-height: 26px;
}

.product-card__product-price {
  font-size: 28px;
  line-height: 32px;
  font-weight: bold;
}

.product-card__product-category {
  font-size: 18px;
  line-height: 20px;
}

.product-card__block-color {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.product-card__color-description {
  font-size: 16px;
  line-height: 18px;
}

.product-card__list-colors {
  display: flex;
  flex-direction: row;
  gap: 8px;
}

.product-card__item-color {
  border-radius: 8px;
}

@media screen and (min-width: 576px) {
  .product-card__info {
    flex-direction: row;
    padding: 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  .product-card__block-image {
    max-width: 300px;
  }

  .product-card__content {
    padding: 20px 0;
  }
}

@media screen and (min-width: 1024px) {
  .product-card {
    padding-top: 60px;
  }
}
</style>
