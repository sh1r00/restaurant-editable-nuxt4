<template>
  <blockquote
    class="bg-surface rounded-2xl p-6 sm:p-8 shadow-md border border-border/50 relative"
    :aria-label="$t('testimonials.heading') + ' — ' + author"
  >
    <div class="text-terracotta/20 absolute top-4 left-4">
      <AIcon name="quote" size="xl" decorative />
    </div>
    <p class="text-text text-base sm:text-lg leading-relaxed italic mb-4 relative z-10">
      "{{ text }}"
    </p>
    <footer class="flex items-center gap-3 border-t border-border/50 pt-4">
      <div class="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta font-bold text-sm">
        {{ author.charAt(0) }}
      </div>
      <div>
        <cite class="not-italic font-semibold text-text block">{{ author }}</cite>
        <span v-if="role" class="text-text-muted text-sm">{{ role }}</span>
      </div>
      <div class="ml-auto flex gap-0.5 text-terracotta">
        <AIcon v-for="i in 5" :key="i" name="star" size="sm" decorative />
      </div>
    </footer>
  </blockquote>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  author: string
  role?: string
}>()
</script>
