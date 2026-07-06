<template>
  <NuxtLink
    :to="to"
    :class="[
      'inline-flex items-center gap-1.5 font-medium transition-colors duration-200',
      active
        ? 'text-terracotta'
        : 'text-text-muted hover:text-terracotta',
    ]"
    :aria-current="active ? 'page' : undefined"
    :aria-label="ariaLabel"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
  active?: boolean
  ariaLabel?: string
}>()
</script>
