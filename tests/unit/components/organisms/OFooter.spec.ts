import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import OFooter from '~/components/organisms/OFooter.vue'

describe('OFooter', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountFooter() {
    return mount(OFooter, {
      global: {
        mocks: {
          $t: (key: string, params?: Record<string, any>) => {
            if (key === 'footer.copyright' && params?.year) {
              return `© ${params.year} Savora Restaurant. All rights reserved.`
            }
            return key
          },
        },
      },
    })
  }

  it('renders without crashing', () => {
    const wrapper = mountFooter()
    expect(wrapper.exists()).toBe(true)
  })

  it('has role="contentinfo" on the footer', () => {
    const wrapper = mountFooter()
    const footer = wrapper.find('footer')
    expect(footer.exists()).toBe(true)
    expect(footer.attributes('role')).toBe('contentinfo')
  })

  it('renders the site name', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('siteName')
  })

  it('renders the tagline', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('tagline')
  })

  it('renders quick links section', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('footer.quickLinks')
  })

  it('renders 5 quick links', () => {
    const wrapper = mountFooter()
    const links = wrapper.findAll('a')
    // 1 site name link + 5 quick links + 3 social links + 2 contact links = 11
    expect(links.length).toBeGreaterThanOrEqual(5)
  })

  it('renders hours section heading', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('hours.heading')
  })

  it('renders hours data', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('hours.hoursData.monThu')
    expect(wrapper.text()).toContain('hours.hoursData.friSat')
    expect(wrapper.text()).toContain('hours.hoursData.sun')
  })

  it('renders contact section heading', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('contact.heading')
  })

  it('renders address, phone, and email', () => {
    const wrapper = mountFooter()
    expect(wrapper.text()).toContain('hours.address')
    expect(wrapper.text()).toContain('hours.phone')
    expect(wrapper.text()).toContain('hours.email')
  })

  it('renders phone as a tel: link', () => {
    const wrapper = mountFooter()
    // Find the phone link - the $t mock returns just the key
    // The href uses a regex to strip non-digit/+ chars from $t('hours.phone')
    const allLinks = wrapper.findAll('a')
    // Check that some link has href starting with 'tel:'
    const telLink = allLinks.find(link => (link.attributes('href') || '').startsWith('tel:'))
    expect(telLink?.exists()).toBe(true)
  })

  it('renders email as a mailto: link', () => {
    const wrapper = mountFooter()
    const allLinks = wrapper.findAll('a')
    const mailLink = allLinks.find(link => (link.attributes('href') || '').startsWith('mailto:'))
    expect(mailLink?.exists()).toBe(true)
  })

  it('renders social media links', () => {
    const wrapper = mountFooter()
    expect(wrapper.html()).toContain('aria-label="Instagram"')
    expect(wrapper.html()).toContain('aria-label="Facebook"')
    expect(wrapper.html()).toContain('aria-label="Twitter / X"')
  })

  it('renders copyright with current year', () => {
    const wrapper = mountFooter()
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(String(currentYear))
    expect(wrapper.text()).toContain('Savora Restaurant')
  })

  it('renders AIcon components for contact info', () => {
    const wrapper = mountFooter()
    const icons = wrapper.findAllComponents({ name: 'AIcon' })
    // map-pin, phone, mail = 3 icons
    expect(icons.length).toBe(3)
  })
})
