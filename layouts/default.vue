<template>
  <div class="min-h-screen flex flex-col bg-cream text-text transition-colors duration-300">
    <a href="#main-content" class="skip-to-content">
      Skip to content
    </a>
    <OHeader />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <OFooter />
  </div>
</template>

<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
// Apply dark mode class to html element
const { isDark } = useDarkModeStore()

useHead({
  htmlAttrs: {
    class: computed(() => isDark.value ? 'dark' : ''),
  },
})
</script>
