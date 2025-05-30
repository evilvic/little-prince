import { defineStore } from 'pinia'
import supabase from './supabase'
import { ingestUrl } from './api'

export const useStore = defineStore('store', {
    state: () => ({
        user: null,
        user_email: null,
        items: [],
    }),
    actions: {
        async sendAuthEmail(email) {
            try {
                const { data, error } = await supabase
                    .auth
                    .signInWithOtp({ email })
                if (error) throw error
                this.user_email = email
                return data
            } catch (error) {
                console.error(error)
            }
        },
        async validateUser(token) {
            try {
                const { data, error } = await supabase
                    .auth
                    .verifyOtp({
                        email: this.user_email,
                        token,
                        type: 'email'
                    })
                if (error) throw error
                return data
            } catch (error) {
                console.error(error)
            }
        },
        async getUser() {
            try {
                const { data, error } = await supabase.auth.getUser()
                if (error) throw error
                this.user = data.user
                return data.user
            } catch (error) {
                console.error(error)
            }
        },
        async processUrl(url) {
            try {
                const data = await ingestUrl(url)
                return data
            } catch (error) {
                console.error(error)
            }
        },
        async getJWT() {
            try {
                const { data, error } = await supabase.auth.getSession()
                if (error) throw error
                return data.session.access_token
            } catch (error) {
                console.error(error)
            }
        },
        async getItems() {
            try {
                const { data, error } = await supabase.from('items').select('*')
                if (error) throw error
                this.items = data
            } catch (error) {
                console.error(error)
            }
        },
    },
})