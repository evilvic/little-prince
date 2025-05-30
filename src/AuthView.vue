<script setup>
import { ref } from 'vue'
import { useStore } from './store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const email = ref('')
const token = ref('')

const handleEmail = async () => {
    await store.sendAuthEmail(email.value)
}

const handleToken = async () => {
    await store.validateUser(token.value)
    router.push('/')
}
</script>

<template>
    <div>
        <h1>Auth</h1>
        <input type="email" v-model="email" />
        <button @click="handleEmail">Send Email</button>
        <input type="text" v-model="token" />
        <button @click="handleToken">Validate Token</button>
    </div>
</template>