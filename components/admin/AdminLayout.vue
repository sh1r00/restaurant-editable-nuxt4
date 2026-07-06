<template>
  <div class="min-h-screen flex flex-col bg-surface-alt">
    <!-- Admin Header -->
    <header class="bg-wood text-cream-dark border-b border-cream-dark/10">
      <div class="flex items-center justify-between px-4 sm:px-6 h-14">
        <div class="flex items-center gap-3">
          <NuxtLink to="/admin" class="font-heading text-lg font-bold text-cream hover:text-white transition-colors">
            Savora Admin
          </NuxtLink>
          <span class="text-xs text-cream-dark/50 hidden sm:inline">CMS Panel</span>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="text-cream-dark/70 hover:text-cream text-sm transition-colors"
            target="_blank"
          >
            View Site
          </NuxtLink>
          <button
            class="px-3 py-1.5 rounded-lg text-sm text-cream-dark/70 hover:text-cream hover:bg-cream-dark/10 transition-colors"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-56 bg-surface border-r border-border/30 flex-shrink-0 hidden md:block">
        <nav class="p-4 space-y-1" aria-label="Admin navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(link.to)
              ? 'bg-terracotta text-white'
              : 'text-text-muted hover:text-text hover:bg-surface-alt'"
          >
            <span class="text-lg" aria-hidden="true">{{ link.icon }}</span>
            {{ link.label }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-4 sm:p-6 overflow-auto">
        <slot />
      </main>
    </div>

    <!-- Mobile bottom nav -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 bg-surface border-t border-border/30 z-40" aria-label="Admin mobile navigation">
      <div class="flex justify-around py-2">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs rounded-lg transition-colors"
          :class="isActive(link.to)
            ? 'text-terracotta'
            : 'text-text-muted'"
        >
          <span class="text-lg" aria-hidden="true">{{ link.icon }}</span>
          {{ link.label }}
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const route = useRoute()
const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  navigateTo('/admin/login')
}

const navLinks = [
  { to: '/admin', label: 'Dashboard', icon: '📊' },
  { to: '/admin/menu', label: 'Menu', icon: '🍽️' },
]

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}
</script>
