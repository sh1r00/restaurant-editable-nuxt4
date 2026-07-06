// Pinia menu store — loads from localStorage (simulating CMS persistence)
import { defineStore } from 'pinia'
import type { MenuItem } from '~/data/menuItems'
import { menuItems as seedItems } from '~/data/menuItems'

const STORAGE_KEY = 'savora_menu_items'

export const useMenuStore = defineStore('menu', () => {
  const items = ref<MenuItem[]>([])
  const loading = ref(false)
  const lastUpdated = ref<string | null>(null)

  // Load items from localStorage (simulating CMS)
  const _loadFromStorage = (): MenuItem[] => {
    if (!import.meta.client) return [...seedItems]
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed.items) && parsed.items.length > 0) {
          lastUpdated.value = parsed.lastUpdated || null
          return parsed.items
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
    // First load: seed with defaults and persist
    const seeded = [...seedItems]
    _saveToStorage(seeded, new Date().toISOString())
    return seeded
  }

  const _saveToStorage = (data: MenuItem[], updated: string) => {
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        items: data,
        lastUpdated: updated,
      }))
    } catch {
      // localStorage might be full
    }
  }

  // Initialise store
  const fetchItems = () => {
    loading.value = true
    items.value = _loadFromStorage()
    loading.value = false
  }

  const addItem = (item: Omit<MenuItem, 'id'>): MenuItem => {
    const newItem: MenuItem = {
      ...item,
      id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    }
    items.value.push(newItem)
    const now = new Date().toISOString()
    lastUpdated.value = now
    _saveToStorage(items.value, now)
    return newItem
  }

  const updateItem = (id: string, updates: Partial<Omit<MenuItem, 'id'>>): MenuItem | null => {
    const index = items.value.findIndex(i => i.id === id)
    if (index === -1) return null
    items.value[index] = { ...items.value[index], ...updates }
    const now = new Date().toISOString()
    lastUpdated.value = now
    _saveToStorage(items.value, now)
    return items.value[index]
  }

  const deleteItem = (id: string): boolean => {
    const index = items.value.findIndex(i => i.id === id)
    if (index === -1) return false
    items.value.splice(index, 1)
    const now = new Date().toISOString()
    lastUpdated.value = now
    _saveToStorage(items.value, now)
    return true
  }

  const getFeaturedItems = (): MenuItem[] => {
    const featuredIds = ['st1', 'm1', 'm2', 'd1', 'd4', 'dr1']
    return items.value.filter(item => featuredIds.includes(item.id))
  }

  const getFilteredItems = (category: string): MenuItem[] => {
    return items.value.filter(item => item.category === category)
  }

  // Auto-initialise on first access
  if (items.value.length === 0) {
    fetchItems()
  }

  return {
    items,
    loading,
    lastUpdated,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    getFeaturedItems,
    getFilteredItems,
  }
})
