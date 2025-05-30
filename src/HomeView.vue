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
    <div>
        <h1>Home</h1>
        <input type="text" v-model="url" />
        <button @click="processUrl">Process URL</button>
        <div v-if="data">
            <h2>Data</h2>
            <pre>{{ data }}</pre>
        </div>
    </div>
    <div>
        <h2>Items</h2>
        <SearchComponent />

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
</template>

<style scoped>
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

/* ensure cards don't break inside the masonry-style grid */
.grid-item {
    break-inside: avoid;
}
</style>