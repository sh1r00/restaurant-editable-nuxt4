<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel || undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses,
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  ariaLabel?: string
}>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const variantMap: Record<string, string> = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-light active:bg-terracotta-dark',
  secondary: 'bg-wood text-cream hover:bg-wood-light',
  outline: 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
  ghost: 'text-terracotta hover:bg-terracotta/10',
}

const sizeMap: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

const variantClasses = computed(() => variantMap[props.variant])
const sizeClasses = computed(() => sizeMap[props.size])
</script>
