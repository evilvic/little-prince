<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from './store'
import CardComponent from './CardComponent.vue'

const store = useStore()

const url = ref('')
const data = ref(null)
const items = ref(null)

const processUrl = async () => {
    const response = await store.processUrl(url.value)
    data.value = response
}

onMounted(async () => {
    await store.getItems()
    items.value = store.items
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
    <div v-if="items">
        <h2>Items</h2>

        <div class="card-grid">
            <CardComponent
                v-for="item in items"
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