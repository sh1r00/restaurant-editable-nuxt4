import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

describe('ABaseButton', () => {
  it('renders a button element', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: 'Click Me' },
    })
    const btn = wrapper.find('button')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('Click Me')
  })

  it('has default type="button"', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('accepts type prop', () => {
    const wrapper = mount(ABaseButton, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('renders with primary variant classes by default', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.classes()).toContain('bg-terracotta')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('renders with secondary variant classes', () => {
    const wrapper = mount(ABaseButton, { props: { variant: 'secondary' } })
    expect(wrapper.classes()).toContain('bg-wood')
  })

  it('renders with outline variant classes', () => {
    const wrapper = mount(ABaseButton, { props: { variant: 'outline' } })
    expect(wrapper.classes()).toContain('border-2')
    expect(wrapper.classes()).toContain('border-terracotta')
  })

  it('renders with ghost variant classes', () => {
    const wrapper = mount(ABaseButton, { props: { variant: 'ghost' } })
    expect(wrapper.classes()).toContain('text-terracotta')
  })

  it('applies size classes (sm, md, lg)', () => {
    const sm = mount(ABaseButton, { props: { size: 'sm' } })
    expect(sm.classes()).toContain('text-sm')

    const md = mount(ABaseButton, { props: { size: 'md' } })
    expect(md.classes()).toContain('text-base')

    const lg = mount(ABaseButton, { props: { size: 'lg' } })
    expect(lg.classes()).toContain('text-lg')
  })

  it('sets disabled attribute and classes when disabled', () => {
    const wrapper = mount(ABaseButton, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('disabled:opacity-50')
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed')
  })

  it('does not set aria-label when not provided', () => {
    const wrapper = mount(ABaseButton)
    expect(wrapper.attributes('aria-label')).toBeUndefined()
  })

  it('sets aria-label when provided', () => {
    const wrapper = mount(ABaseButton, { props: { ariaLabel: 'Save' } })
    expect(wrapper.attributes('aria-label')).toBe('Save')
  })

  it('renders slot content', () => {
    const wrapper = mount(ABaseButton, {
      slots: { default: '<span class="icon">★</span> Submit' },
    })
    expect(wrapper.html()).toContain('<span class="icon">★</span>')
    expect(wrapper.text()).toContain('Submit')
  })

  it('emits click event', async () => {
    const wrapper = mount(ABaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')?.length).toBe(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(ABaseButton, { props: { disabled: true } })
    await wrapper.trigger('click')
    // The native button won't fire click when disabled in happy-dom
    expect(wrapper.emitted('click')).toBeFalsy()
  })
})
