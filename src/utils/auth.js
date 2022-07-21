// Authorization
import storage from './storage'
const TOKEN_KEY = 'HEIMA_TOUTIAO_TOKEN'
const TOKEN_HISTORY = 'HEIMA_TOUTIAO_HISTORY'

export const getToken = () => storage.get(TOKEN_KEY)

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const removeToken = () => storage.remove()

export const getHistory = () => storage.get(TOKEN_HISTORY)

export const setHistory = (token) => storage.set(TOKEN_HISTORY, token)

export const removeHistory = () => storage.remove(TOKEN_HISTORY)
