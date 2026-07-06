// Pinia auth store — session persisted in localStorage
import { defineStore } from 'pinia'

const STORAGE_KEY = 'savora_admin_session'
const DEFAULT_PASSWORD = 'admin123'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const lastLogin = ref<string | null>(null)

  // Restore session from localStorage on init
  const _restore = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const data = JSON.parse(stored)
          if (data.authenticated) {
            isAuthenticated.value = true
            lastLogin.value = data.lastLogin || null
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  const _persist = () => {
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        authenticated: isAuthenticated.value,
        lastLogin: lastLogin.value,
      }))
    }
  }

  const login = (password: string): boolean => {
    if (password === DEFAULT_PASSWORD) {
      isAuthenticated.value = true
      lastLogin.value = new Date().toISOString()
      _persist()
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    lastLogin.value = null
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  // Restore on initialisation
  _restore()

  return { isAuthenticated, lastLogin, login, logout }
})
