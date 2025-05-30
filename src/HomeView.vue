<script setup>
import { ref, onMounted, computed } from 'vue'
import { useStore } from './store'
import CardComponent from './CardComponent.vue'
import SearchComponent from './SearchComponent.vue'

const store = useStore()

const url = ref('')
const data = ref(null)

const itemsToDisplay = computed(() => {
    return store.searchActive ? store.searchResults : store.items
})

const processUrl = async () => {
    const response = await store.processUrl(url.value)
    data.value = response
}

onMounted(async () => {
    await store.getItems()
})
</script>

<template>
  <div class="main-container">
    <div class="header">
      <h1>Home</h1>
      <div class="ingest-row">
        <input type="text" v-model="url" placeholder="Pega una URL..." />
        <button @click="processUrl">Procesar URL</button>
      </div>
      <div v-if="data">
        <h2>Data</h2>
        <pre>{{ data }}</pre>
      </div>
      <SearchComponent />
    </div>
    <div>
      <p v-if="store.searchActive && store.searchResults.length === 0">
        No results found.
      </p>
      <div class="card-grid">
        <CardComponent
          v-for="item in itemsToDisplay"
          :key="item.id"
          :item="item"
          class="grid-item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  background: none;
  border-radius: 0;
  padding: 2rem 0 0 0;
  box-shadow: none;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0 2rem 2rem;
}

.ingest-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 500px;
}

.ingest-row input {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.ingest-row button {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  border: none;
  background: #222;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.ingest-row button:hover {
  background: #444;
}

.card-grid {
  column-count: 4;
  column-gap: 1.5rem;
  margin: 0 2rem 0 2rem;
  width: auto;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

@media (max-width: 1200px) {
  .card-grid {
    column-count: 3;
  }
}
@media (max-width: 900px) {
  .card-grid {
    column-count: 2;
  }
}
@media (max-width: 600px) {
  .card-grid {
    column-count: 1;
  }
}

.grid-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;
  display: block;
}
</style>