<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="about-heading">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=600&fit=crop"
          alt=""
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div class="relative z-10 container-page text-center text-white">
        <h1 id="about-heading" class="font-heading text-4xl sm:text-5xl font-bold mb-4">
          {{ $t('about.heading') }}
        </h1>
      </div>
    </section>

    <!-- Blurb -->
    <section class="py-16 sm:py-24 bg-surface-alt" aria-label="Our story">
      <div class="container-page max-w-4xl">
        <p class="text-text-muted text-lg sm:text-xl leading-relaxed text-center">
          {{ $t('about.blurb') }}
        </p>
      </div>
    </section>

    <!-- Chef Story -->
    <section class="py-16 sm:py-24 bg-surface" aria-labelledby="chef-heading">
      <div class="container-page">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <h2 id="chef-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-2 text-text">
              {{ $t('about.chef') }}
            </h2>
            <p class="text-terracotta font-heading text-xl italic mb-6">
              {{ $t('about.chefName') }}
            </p>
            <p class="text-text-muted text-lg leading-relaxed">
              {{ $t('about.chefStory') }}
            </p>
          </div>
          <div class="order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=600&fit=crop"
              :alt="$t('about.chefName')"
              class="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="py-16 sm:py-24 bg-surface-alt" aria-labelledby="philosophy-heading">
      <div class="container-page">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&h=600&fit=crop"
              :alt="$t('about.philosophy')"
              class="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 id="philosophy-heading" class="font-heading text-3xl sm:text-4xl font-bold mb-6 text-text">
              {{ $t('about.philosophy') }}
            </h2>
            <p class="text-text-muted text-lg leading-relaxed">
              {{ $t('about.philosophyText') }}
            </p>
            <ABaseButton variant="primary" class="mt-8" @click="navigateTo(localePath('/menu'))">
              {{ $t('nav.menu') }}
              <AIcon name="arrow-right" size="sm" decorative />
            </ABaseButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
