<template>
  <div class="min-h-screen flex items-center justify-center bg-surface-alt px-4">
    <div class="w-full max-w-sm">
      <div class="bg-surface rounded-2xl shadow-lg border border-border/50 p-8">
        <div class="text-center mb-8">
          <h1 class="font-heading text-2xl font-bold text-text mb-1">Admin Login</h1>
          <p class="text-text-muted text-sm">Enter password to access the CMS</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="admin-password" class="block text-sm font-medium text-text mb-1">Password</label>
            <input
              id="admin-password"
              v-model="password"
              type="password"
              required
              autocomplete="current-password"
              class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              placeholder="Enter admin password"
              :disabled="loading"
            />
          </div>

          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>

          <button
            type="submit"
            :disabled="loading || !password"
            class="w-full py-2.5 rounded-lg bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 pt-4 border-t border-border/30 text-center">
          <NuxtLink to="/" class="text-sm text-text-muted hover:text-terracotta transition-colors">
            ← Back to site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
definePageMeta({
  layout: false,
})

const auth = useAuthStore()
const password = ref('')
const error = ref('')
const loading = ref(false)

// Redirect if already authenticated
if (auth.isAuthenticated) {
  await navigateTo('/admin')
}

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const success = auth.login(password.value)
    if (success) {
      await navigateTo('/admin')
    } else {
      error.value = 'Invalid password. Please try again.'
    }
  } catch {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
