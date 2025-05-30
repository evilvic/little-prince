<script setup>
import { ref } from 'vue'
import { useStore } from './store'

const store = useStore()

const url = ref('')
const data = ref(null)

const processUrl = async () => {
    const response = await store.processUrl(url.value)
    data.value = response
}
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
</template>