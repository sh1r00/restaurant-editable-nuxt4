import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AMenuItem from '~/components/atoms/AMenuItem.vue'

describe('AMenuItem', () => {
  it('renders a NuxtLink with the correct to attribute', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu' },
      slots: { default: 'Menu' },
    })
    // NuxtLink is stubbed as <a :href="to">
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/menu')
  })

  it('renders slot content', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/about' },
      slots: { default: 'About Us' },
    })
    expect(wrapper.text()).toBe('About Us')
  })

  it('applies active classes when active prop is true', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu', active: true },
    })
    expect(wrapper.classes()).toContain('text-terracotta')
  })

  it('applies inactive classes when active prop is false', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu', active: false },
    })
    expect(wrapper.classes()).toContain('text-text-muted')
    expect(wrapper.classes()).toContain('hover:text-terracotta')
  })

  it('defaults active to false (undefined)', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu' },
    })
    // When active is undefined, it should NOT have text-terracotta
    expect(wrapper.classes()).not.toContain('text-terracotta')
  })

  it('sets aria-current="page" when active', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu', active: true },
    })
    expect(wrapper.attributes('aria-current')).toBe('page')
  })

  it('does not set aria-current when inactive', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu', active: false },
    })
    expect(wrapper.attributes('aria-current')).toBeUndefined()
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu', ariaLabel: 'Navigate to Menu' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Navigate to Menu')
  })

  it('does not set aria-label when not provided', () => {
    const wrapper = mount(AMenuItem, {
      props: { to: '/menu' },
    })
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })
})
