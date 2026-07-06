import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'
import { useDarkModeStore } from '~/stores/darkMode'

describe('ADarkModeToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    useDarkModeStore().isDark = false
  })

  function mountToggle() {
    return mount(ADarkModeToggle, {
      global: {
        mocks: { $t: (k: string) => k },
        stubs: { AIcon: { template: '<span class="icon">{{ $attrs.name }}</span>', inheritAttrs: false } },
      },
    })
  }

  it('renders a button', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows moon icon when light', () => {
    const wrapper = mountToggle()
    expect(wrapper.find('.icon').text()).toBe('moon')
  })

  it('shows sun icon when dark', () => {
    useDarkModeStore().isDark = true
    const wrapper = mountToggle()
    expect(wrapper.find('.icon').text()).toBe('sun')
  })

  it('calls toggle on click', async () => {
    const wrapper = mountToggle()
    expect(useDarkModeStore().isDark).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(useDarkModeStore().isDark).toBe(true)
  })
})
