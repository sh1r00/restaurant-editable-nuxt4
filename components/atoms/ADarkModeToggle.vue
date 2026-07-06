<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-surface-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
    :aria-label="isDark ? $t('nav.lightMode') || 'Switch to light mode' : $t('nav.darkMode') || 'Switch to dark mode'"
    @click="toggle"
  >
    <AIcon :name="isDark ? 'sun' : 'moon'" size="sm" decorative />
    <span class="hidden sm:inline">{{ isDark ? '☀️' : '🌙' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const { isDark, toggle } = useDarkModeStore()
</script>
