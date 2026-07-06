import { config } from '@vue/test-utils'
import { vi, beforeEach } from 'vitest'
import { ref, computed, watch } from 'vue'

vi.stubGlobal('ref', ref)
vi.stubGlobal('computed', computed)
vi.stubGlobal('watch', watch)

const cookieStore: Record<string, any> = {}
vi.stubGlobal('useCookie', (key: string, opts?: any) => {
  if (!(key in cookieStore)) {
    const defaultVal = opts?.default ? (typeof opts.default === 'function' ? opts.default() : opts.default) : null
    cookieStore[key] = ref(defaultVal)
  }
  return cookieStore[key]
})

vi.stubGlobal('useHead', vi.fn())
vi.stubGlobal('useSeoMeta', vi.fn())
vi.stubGlobal('useRuntimeConfig', vi.fn(() => ({})))
vi.stubGlobal('navigateTo', vi.fn())
vi.stubGlobal('useRoute', vi.fn(() => ({ path: '/', params: {}, query: {}, fullPath: '/' })))
vi.stubGlobal('useRouter', vi.fn(() => ({ push: vi.fn(), replace: vi.fn() })))
vi.stubGlobal('useLocalePath', vi.fn(() => (path: string) => path))
vi.stubGlobal('localePath', vi.fn((path: string) => path))
vi.stubGlobal('useSwitchLocalePath', vi.fn((path: string) => path))
vi.stubGlobal('useI18n', vi.fn(() => ({ locale: ref('en'), t: (key: string) => key })))
vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({}))

import { useDarkModeStore } from '~/stores/darkMode'
vi.stubGlobal('useDarkModeStore', useDarkModeStore)

import AIcon from '~/components/atoms/AIcon.vue'
import ABaseButton from '~/components/atoms/ABaseButton.vue'
import AMenuItem from '~/components/atoms/AMenuItem.vue'
config.global.components = { AIcon, ABaseButton, AMenuItem }

config.global.stubs = {
  NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
  ClientOnly: { template: '<div><slot /></div>' },
  Transition: { template: '<div><slot /></div>' },
  ADarkModeToggle: { template: '<button class="dm-toggle-stub">🌙</button>' },
}

beforeEach(() => {
  for (const k of Object.keys(cookieStore)) delete cookieStore[k]
})
