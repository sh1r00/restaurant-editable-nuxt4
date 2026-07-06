<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
          alt=""
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>
      <div class="relative z-10 container-page text-center text-white py-20">
        <h1
          id="hero-heading"
          class="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          {{ $t('hero.title') }}
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-white/85 leading-relaxed">
          {{ $t('hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <ABaseButton
            variant="primary"
            size="lg"
            @click="navigateTo(localePath('/contact'))"
          >
            {{ $t('hero.cta') }}
            <AIcon name="arrow-right" size="md" decorative />
          </ABaseButton>
          <ABaseButton
            variant="outline"
            size="lg"
            class="!border-white !text-white hover:!bg-white hover:!text-wood"
            @click="navigateTo(localePath('/menu'))"
          >
            {{ $t('nav.menu') }}
          </ABaseButton>
        </div>
      </div>
    </section>

    <!-- About Blurb -->
    <section class="py-20 sm:py-28 bg-surface-alt" aria-labelledby="about-blurb-heading">
      <div class="container-page">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
              :alt="$t('about.heading')"
              class="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              loading="lazy"
            />
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-terracotta rounded-2xl hidden lg:flex items-center justify-center shadow-lg">
              <span class="text-white font-heading text-center text-sm leading-tight font-bold">Est.<br/>2010</span>
            </div>
          </div>
          <div>
            <h2 id="about-blurb-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-6 text-text">
              {{ $t('about.heading') }}
            </h2>
            <p class="text-text-muted text-lg leading-relaxed mb-8">
              {{ $t('about.blurb') }}
            </p>
            <ABaseButton variant="outline" @click="navigateTo(localePath('/about'))">
              {{ $t('about.heading') }}
              <AIcon name="arrow-right" size="sm" decorative />
            </ABaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Dishes -->
    <section class="py-20 sm:py-28 bg-surface" aria-labelledby="featured-heading">
      <div class="container-page">
        <div class="text-center mb-14">
          <h2 id="featured-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-4 text-text">
            {{ $t('featured.heading') }}
          </h2>
          <p class="text-text-muted text-lg">
            {{ $t('featured.subtitle') }}
          </p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MMenuItemCard
            v-for="item in featuredItems"
            :key="item.id"
            :item="item"
          />
        </div>
        <div class="text-center mt-10">
          <ABaseButton variant="outline" @click="navigateTo(localePath('/menu'))">
            {{ $t('nav.menu') }}
            <AIcon name="arrow-right" size="sm" decorative />
          </ABaseButton>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 sm:py-28 bg-surface-alt" aria-labelledby="testimonials-heading">
      <div class="container-page">
        <h2 id="testimonials-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-12 text-center text-text">
          {{ $t('testimonials.heading') }}
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <MTestimonial
            v-for="(t, i) in testimonials"
            :key="i"
            :text="t.text"
            :author="t.author"
            :role="t.role"
          />
        </div>
      </div>
    </section>

    <!-- Hours & Location -->
    <section class="py-20 sm:py-28 bg-wood text-cream-dark" aria-labelledby="hours-heading">
      <div class="container-page">
        <div class="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 id="hours-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-6 text-cream">
              {{ $t('hours.heading') }}
            </h2>
            <div class="space-y-4 mb-8">
              <div class="flex items-start gap-3">
                <AIcon name="clock" size="lg" decorative class="text-terracotta-light shrink-0 mt-0.5" />
                <div>
                  <p class="text-cream-dark/80 text-base">{{ $t('hours.hoursData.monThu') }}</p>
                  <p class="text-cream-dark/80 text-base">{{ $t('hours.hoursData.friSat') }}</p>
                  <p class="text-cream-dark/80 text-base">{{ $t('hours.hoursData.sun') }}</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <AIcon name="map-pin" size="lg" decorative class="text-terracotta-light shrink-0 mt-0.5" />
                <p class="text-cream-dark/80 text-base">{{ $t('hours.address') }}</p>
              </div>
              <div class="flex items-start gap-3">
                <AIcon name="phone" size="lg" decorative class="text-terracotta-light shrink-0 mt-0.5" />
                <a :href="'tel:' + phoneDigits" class="text-cream-dark/80 hover:text-cream transition-colors text-base">
                  {{ $t('hours.phone') }}
                </a>
              </div>
            </div>
            <ABaseButton
              variant="primary"
              @click="navigateTo(localePath('/contact'))"
            >
              {{ $t('nav.reserve') }}
            </ABaseButton>
          </div>
          <div class="rounded-2xl overflow-hidden shadow-xl h-[350px] bg-surface-alt/10 flex items-center justify-center">
            <div class="text-center text-cream-dark/40">
              <AIcon name="map-pin" size="xl" decorative />
              <p class="mt-3 font-heading text-xl">Map</p>
              <p class="text-sm">{{ $t('hours.address') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { testimonials } from '~/data/testimonials'

const localePath = useLocalePath()
const { t } = useI18n()

const menuStore = useMenuStore()

const phoneDigits = computed(() => t('hours.phone').replace(/[^+\\d]/g, ''))
const featuredItems = computed(() => menuStore.getFeaturedItems())
</script>
