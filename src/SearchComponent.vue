<script setup>
import { ref, watch } from 'vue'
import { useStore } from './store'

const store = useStore()
const query = ref('')

// simple debounce helper
const debounce = (fn, delay = 400) => {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

const runSearch = debounce(async (q) => {
  await store.search(q)
})

watch(query, (val) => {
  const trimmed = val.trim()

  // clear search when empty or less than 3 chars
  if (trimmed.length < 2) {
    store.clearSearch()
    return
  }

  runSearch(trimmed)
})
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      placeholder="Search"
      v-model="query"
    />
  </div>
</template>

<style scoped>
.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
}
</style>