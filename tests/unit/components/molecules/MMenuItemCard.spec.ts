import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MMenuItemCard from '~/components/molecules/MMenuItemCard.vue'
import type { MenuItem } from '~/data/menuItems'
import { dietaryLabels } from '~/data/menuItems'

const sampleItem: MenuItem = {
  id: 'st1',
  name: 'Burrata Caprese',
  description: 'Creamy burrata with heirloom tomatoes.',
  price: 16,
  category: 'starters',
  image: 'https://images.unsplash.com/photo-test.jpg',
  dietary: ['vegetarian', 'glutenFree'],
}

describe('MMenuItemCard (smoke)', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders item name', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('Burrata Caprese')
  })

  it('renders item price', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('$16')
  })

  it('renders dietary labels', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    // dietaryLabels are translated via $t
    expect(wrapper.text()).toContain(dietaryLabels.vegetarian)
  })

  it('renders image with correct src and alt', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://images.unsplash.com/photo-test.jpg')
    expect(img.attributes('alt')).toBe('Burrata Caprese')
  })

  it('renders item description', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('Creamy burrata with heirloom tomatoes.')
  })

  it('sets aria-label on article', () => {
    const wrapper = mount(MMenuItemCard, {
      props: { item: sampleItem },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.attributes('aria-label')).toBe('Burrata Caprese')
  })
})
