import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { ref } from 'vue'
import OHeader from '~/components/organisms/OHeader.vue'

// Mock the useDarkMode store
const mockIsDark = ref(false)
vi.mock('~/stores/darkMode', () => ({
  useDarkMode: () => ({
    isDark: mockIsDark,
    toggle: vi.fn(),
  }),
  useDarkModeStore: () => ({
    isDark: mockIsDark,
    toggle: vi.fn(),
  }),
}))

describe('OHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockIsDark.value = false
  })

  function mountHeader(overrides: Record<string, any> = {}) {
    return mount(OHeader, {
      global: {
        mocks: {
          $t: (key: string) => key,
        },
        stubs: {
          Transition: { template: '<div><slot /></div>' },
          NuxtLink: { template: '<a :href="to"><slot /></a>', props: ['to'] },
          ADarkModeToggle: { template: '<button class="dm-toggle-stub">🌙</button>' },
        },
        ...overrides,
      },
    })
  }

  it('renders without crashing', () => {
    const wrapper = mountHeader()
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the site name from i18n', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('siteName')
  })

  it('renders the tagline from i18n', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('tagline')
  })

  it('renders all navigation links (5 items)', () => {
    const wrapper = mountHeader()
    const navLinks = wrapper.findAllComponents({ name: 'AMenuItem' })
    // Desktop nav has 5, mobile nav has 5 = 10 total (mobile hidden initially)
    // But mobile is v-if="mobileOpen" which defaults to false
    expect(navLinks.length).toBe(5) // desktop only
  })

  it('renders a locale switcher select', () => {
    const wrapper = mountHeader()
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    expect(select.attributes('aria-label')).toBe('Select language')
  })

  it('renders the reserve CTA button', () => {
    const wrapper = mountHeader()
    const ctaBtn = wrapper.findComponent({ name: 'ABaseButton' })
    expect(ctaBtn.exists()).toBe(true)
  })

  it('renders the dark mode toggle', () => {
    const wrapper = mountHeader()
    const toggle = wrapper.find('.dm-toggle-stub')
    expect(toggle.exists()).toBe(true)
  })

  it('renders mobile menu button', () => {
    const wrapper = mountHeader()
    // Find the mobile menu toggle button (has md:hidden class)
    const buttons = wrapper.findAll('button')
    const mobileBtn = buttons.find(b => b.attributes('aria-controls') === 'mobile-menu')
    expect(mobileBtn?.exists()).toBe(true)
  })

  it('does not show mobile menu by default', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('#mobile-menu').exists()).toBe(false)
  })

  it('opens mobile menu on button click', async () => {
    const wrapper = mountHeader()
    const mobileBtn = wrapper.find('button[aria-controls="mobile-menu"]')
    expect(mobileBtn.exists()).toBe(true)

    await mobileBtn.trigger('click')
    expect(wrapper.find('#mobile-menu').exists()).toBe(true)
  })

  it('shows close icon when mobile menu is open', async () => {
    const wrapper = mountHeader()
    const mobileBtn = wrapper.find('button[aria-controls="mobile-menu"]')
    await mobileBtn.trigger('click')
    // aria-label should update
    expect(mobileBtn.attributes('aria-label')).toBe('Close menu')
    expect(mobileBtn.attributes('aria-expanded')).toBe('true')
  })

  it('has role="banner" on the header', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('header').attributes('role')).toBe('banner')
  })

  it('mobile nav has correct aria-label', async () => {
    const wrapper = mountHeader()
    const mobileBtn = wrapper.find('button[aria-controls="mobile-menu"]')
    await mobileBtn.trigger('click')
    const mobileNav = wrapper.find('#mobile-menu')
    expect(mobileNav.attributes('aria-label')).toBe('Mobile navigation')
  })
})
