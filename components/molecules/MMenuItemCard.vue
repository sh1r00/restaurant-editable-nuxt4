<template>
  <article
    class="group bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 flex flex-col"
    :aria-label="item.name"
  >
    <div class="relative overflow-hidden aspect-[3/2]">
      <img
        :src="item.image"
        :alt="item.name"
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div class="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
        <span
          v-for="diet in item.dietary"
          :key="diet"
          class="px-2 py-0.5 text-xs font-medium rounded-full bg-cream-dark/90 text-wood text-[11px]"
          :aria-label="$t(dietaryLabels[diet])"
        >
          {{ $t(dietaryLabels[diet]) }}
        </span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-1">
      <div class="flex items-start justify-between gap-3 mb-2">
        <h3 class="font-heading text-lg font-semibold text-text leading-tight">
          {{ item.name }}
        </h3>
        <span class="text-terracotta font-bold text-lg whitespace-nowrap">
          ${{ item.price }}
        </span>
      </div>
      <p class="text-text-muted text-sm leading-relaxed flex-1">
        {{ item.description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/data/menuItems'
import { dietaryLabels } from '~/data/menuItems'

defineProps<{
  item: MenuItem
}>()
</script>
