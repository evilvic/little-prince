<script setup>
import { ref } from 'vue'
import { useStore } from './store'

const store = useStore()

const query = ref('')

const handleSearch = async () => {
    if (query.value.length > 3) {
        const results = await store.search(query.value)
        if (results) {
            store.searchResults = results
        }
    }
}
</script>

<template>
    <div class="search-container">
        <input
            type="text"
            placeholder="Search"
            v-model="query"
            @change="handleSearch"
            @blur="handleSearch"
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