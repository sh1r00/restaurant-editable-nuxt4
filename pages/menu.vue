<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="menu-heading">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=600&fit=crop"
          alt=""
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div class="relative z-10 container-page text-center text-white">
        <h1 id="menu-heading" class="font-heading text-4xl sm:text-5xl font-bold mb-4">
          {{ $t('menu.heading') }}
        </h1>
        <p class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ $t('menu.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Menu Content -->
    <section class="py-16 sm:py-24 bg-surface-alt" aria-label="Menu categories">
      <div class="container-page">
        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Menu categories">
          <button
            v-for="cat in categories"
            :key="cat.key"
            role="tab"
            :aria-selected="activeCategory === cat.key"
            :aria-controls="`panel-${cat.key}`"
            :id="`tab-${cat.key}`"
            class="px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            :class="activeCategory === cat.key
              ? 'bg-terracotta text-white shadow-md'
              : 'bg-surface text-text-muted hover:bg-surface-alt hover:text-terracotta border border-border/50'"
            @click="activeCategory = cat.key"
          >
            {{ $t(cat.label) }}
          </button>
        </div>

        <!-- Menu Grid -->
        <div
          v-for="cat in categories"
          :key="cat.key"
          :id="`panel-${cat.key}`"
          role="tabpanel"
          :aria-labelledby="`tab-${cat.key}`"
          :hidden="activeCategory !== cat.key"
        >
          <div
            v-if="activeCategory === cat.key"
            class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <MMenuItemCard
              v-for="item in filteredItems(cat.key)"
              :key="item.id"
              :item="item"
            />
          </div>
          <div
            v-if="activeCategory === cat.key && filteredItems(cat.key).length === 0"
            class="text-center py-16 text-text-muted"
          >
            <p class="text-lg">No items in this category yet.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dietary Legend -->
    <section class="py-12 bg-surface border-t border-border/30" aria-label="Dietary information">
      <div class="container-page">
        <div class="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-green-600" aria-hidden="true" />
            {{ $t('menu.dietary.vegetarian') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-green-700" aria-hidden="true" />
            {{ $t('menu.dietary.vegan') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-amber-500" aria-hidden="true" />
            {{ $t('menu.dietary.glutenFree') }}
          </span>
          <span class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
            {{ $t('menu.dietary.spicy') }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { menuCategories } from '~/data/menuItems'

const menuStore = useMenuStore()
const activeCategory = ref<string>('starters')

const categories = menuCategories

const filteredItems = (cat: string) =>
  menuStore.getFilteredItems(cat)
</script>
