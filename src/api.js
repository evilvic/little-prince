import axios from 'axios'
import supabase from './supabase'

const baseURL = import.meta.env.VITE_FRIEND_FOX_URL

const getJWT = async () => {
    try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        return data.session.access_token
    } catch (error) {
        console.error(error)
    }
}

const api = axios.create({ baseURL })

export const ingestUrl = async (url) => {
    const response = await api.post('/ingest', { url })
    return response.data
}

api.interceptors.request.use(async (config) => {
    const jwt = await getJWT()
    config.headers.Authorization = `Bearer ${jwt}`
    return config
})

export default api