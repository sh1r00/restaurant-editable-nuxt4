import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDarkModeStore } from '~/stores/darkMode'

describe('darkMode store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('initialises with isDark = false', () => {
    const store = useDarkModeStore()
    expect(store.isDark).toBe(false)
  })

  it('toggle switches isDark from false to true', () => {
    const store = useDarkModeStore()
    store.toggle()
    expect(store.isDark).toBe(true)
  })

  it('toggle switches isDark back to false', () => {
    const store = useDarkModeStore()
    store.isDark = true
    store.toggle()
    expect(store.isDark).toBe(false)
  })

  it('toggle persists to localStorage', () => {
    const store = useDarkModeStore()
    store.toggle()
    expect(localStorage.getItem('dark-mode')).toBe('true')
  })

  it('initialize reads from localStorage', () => {
    localStorage.setItem('dark-mode', 'true')
    const store = useDarkModeStore()
    store.initialize()
    expect(store.isDark).toBe(true)
  })
})
