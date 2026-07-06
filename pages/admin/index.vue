<template>
  <AdminLayout>
    <div>
      <h1 class="font-heading text-2xl font-bold text-text mb-6">Dashboard</h1>

      <!-- Stats cards -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div class="bg-surface rounded-xl border border-border/50 p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl" aria-hidden="true">🍽️</span>
            <span class="text-sm text-text-muted font-medium">Total Menu Items</span>
          </div>
          <p class="text-3xl font-bold text-text">{{ menu.items.length }}</p>
        </div>

        <div class="bg-surface rounded-xl border border-border/50 p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl" aria-hidden="true">📂</span>
            <span class="text-sm text-text-muted font-medium">Categories</span>
          </div>
          <p class="text-3xl font-bold text-text">{{ categoryCount }}</p>
        </div>

        <div class="bg-surface rounded-xl border border-border/50 p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-2xl" aria-hidden="true">🕐</span>
            <span class="text-sm text-text-muted font-medium">Last Updated</span>
          </div>
          <p class="text-lg font-semibold text-text">
            {{ lastUpdatedDisplay }}
          </p>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="bg-surface rounded-xl border border-border/50 p-6">
        <h2 class="font-heading text-lg font-semibold text-text mb-4">Quick Actions</h2>
        <div class="flex flex-wrap gap-3">
          <NuxtLink
            to="/admin/menu"
            class="px-5 py-2.5 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark transition-colors"
          >
            Manage Menu Items
          </NuxtLink>
          <NuxtLink
            to="/"
            target="_blank"
            class="px-5 py-2.5 rounded-lg border border-border text-text-muted text-sm hover:bg-surface-alt transition-colors"
          >
            View Site →
          </NuxtLink>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { useAuthStore } from '~/stores/auth'
definePageMeta({
  layout: false,
})

const auth = useAuthStore()
const menu = useMenuStore()

// Auth guard
if (!auth.isAuthenticated) {
  await navigateTo('/admin/login')
}

const categoryCount = computed(() => {
  const cats = new Set(menu.items.map(i => i.category))
  return cats.size
})

const lastUpdatedDisplay = computed(() => {
  if (menu.lastUpdated) {
    return new Date(menu.lastUpdated).toLocaleString()
  }
  return 'Never'
})
</script>

<style scoped>
/* Ensure admin pages use a basic sans-serif for UI */
</style>
