<script setup>
import { useRoute, useRouter } from 'vue-router'
import {onBeforeMount, onMounted, ref} from 'vue'

const route = useRoute()

const card = ref(null)
const pending = ref(true)
const error = ref(null)
const api = `https://vue-study.skillbox.cc/api/products/${route.params.id}`

const getCatalogCard = async () => {
  pending.value = true
  try {
    await fetch(api).then(async (res) => {
      card.value = await res.json()
      console.warn('getListCatalog: ', card.value)
    }).catch(() => error.value = true)
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
  <div>
    {{ $route.params.id }}
    <div>
      <pre>
        {{ card }}
      </pre>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
