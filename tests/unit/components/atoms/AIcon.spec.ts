import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AIcon from '~/components/atoms/AIcon.vue'

describe('AIcon', () => {
  it('renders a span with role="img"', () => {
    const wrapper = mount(AIcon)
    const span = wrapper.find('span')
    expect(span.exists()).toBe(true)
    expect(span.attributes('role')).toBe('img')
  })

  it('renders sun icon when name="sun"', () => {
    const wrapper = mount(AIcon, { props: { name: 'sun' } })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    // Check for sun-specific element
    expect(wrapper.html()).toContain('circle')
  })

  it('renders moon icon when name="moon"', () => {
    const wrapper = mount(AIcon, { props: { name: 'moon' } })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.html()).toContain('path')
  })

  it('renders menu icon when name="menu"', () => {
    const wrapper = mount(AIcon, { props: { name: 'menu' } })
    const lines = wrapper.findAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(3)
  })

  it('renders close icon when name="close"', () => {
    const wrapper = mount(AIcon, { props: { name: 'close' } })
    const lines = wrapper.findAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(2)
  })

  it('renders phone icon when name="phone"', () => {
    const wrapper = mount(AIcon, { props: { name: 'phone' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders mail icon when name="mail"', () => {
    const wrapper = mount(AIcon, { props: { name: 'mail' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders map-pin icon when name="map-pin"', () => {
    const wrapper = mount(AIcon, { props: { name: 'map-pin' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders clock icon when name="clock"', () => {
    const wrapper = mount(AIcon, { props: { name: 'clock' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders chevron-down icon when name="chevron-down"', () => {
    const wrapper = mount(AIcon, { props: { name: 'chevron-down' } })
    expect(wrapper.find('polyline').exists()).toBe(true)
  })

  it('renders arrow-right icon when name="arrow-right"', () => {
    const wrapper = mount(AIcon, { props: { name: 'arrow-right' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders star icon when name="star" (or default)', () => {
    const wrapper = mount(AIcon)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders quote icon when name="quote"', () => {
    const wrapper = mount(AIcon, { props: { name: 'quote' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders default star icon when no name given', () => {
    const wrapper = mount(AIcon)
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.find('polygon').exists()).toBe(true)
  })

  it('applies size classes (sm, md, lg, xl)', () => {
    const sizes: Record<string, string> = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    }
    for (const [size, expected] of Object.entries(sizes)) {
      const wrapper = mount(AIcon, { props: { size: size as any } })
      for (const cls of expected.split(' ')) {
        expect(wrapper.classes()).toContain(cls)
      }
    }
  })

  it('sets aria-hidden="true" when decorative', () => {
    const wrapper = mount(AIcon, { props: { decorative: true } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })

  it('does not set aria-hidden when not decorative', () => {
    const wrapper = mount(AIcon, { props: { decorative: false } })
    expect(wrapper.attributes('aria-hidden')).toBeUndefined()
  })

  it('sets aria-label when not decorative and ariaLabel provided', () => {
    const wrapper = mount(AIcon, { props: { decorative: false, ariaLabel: 'Menu icon' } })
    expect(wrapper.attributes('aria-label')).toBe('Menu icon')
  })

  it('does not set aria-label when decorative', () => {
    const wrapper = mount(AIcon, { props: { decorative: true, ariaLabel: 'Should not show' } })
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('renders custom slot content instead of default SVG', () => {
    const wrapper = mount(AIcon, {
      slots: { default: '<span class="custom-icon">C</span>' },
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(false)
  })
})
