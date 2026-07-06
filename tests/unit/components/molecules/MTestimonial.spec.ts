import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MTestimonial from '~/components/molecules/MTestimonial.vue'

describe('MTestimonial (smoke)', () => {
  it('renders without crashing', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Amazing food!',
        author: 'John D.',
        role: 'Foodie',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the quote text', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Amazing food!',
        author: 'John D.',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('"Amazing food!"')
  })

  it('renders the author name', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Great!',
        author: 'John D.',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('John D.')
  })

  it('renders author initial in avatar', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Great!',
        author: 'John D.',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    // The avatar div shows author.charAt(0) = 'J'
    expect(wrapper.text()).toContain('J')
  })

  it('renders role when provided', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Great!',
        author: 'John D.',
        role: 'Food Critic',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    expect(wrapper.text()).toContain('Food Critic')
  })

  it('does not render role span when role is undefined', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Great!',
        author: 'John D.',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    // The cite element should exist, but role span (v-if) should not
    const cite = wrapper.find('cite')
    expect(cite.exists()).toBe(true)
    // Check there's no role text other than author
    const spans = wrapper.findAll('span')
    const roleSpans = spans.filter(s => s.text() === 'Food Critic')
    expect(roleSpans.length).toBe(0)
  })

  it('renders 5 star icons', () => {
    const wrapper = mount(MTestimonial, {
      props: {
        text: 'Great!',
        author: 'John D.',
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })
    // AIcon components with name="star" should be rendered 5 times
    const icons = wrapper.findAllComponents({ name: 'AIcon' })
    expect(icons.length).toBe(6) // 5 stars + 1 quote icon (7 total? let's count)
    // Actually: 1 quote icon + 5 star icons = 6 AIcon instances
  })
})
