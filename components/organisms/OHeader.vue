<template>
  <header
    class="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-border/50 transition-colors duration-300"
    role="banner"
  >
    <div class="container-page">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="flex items-center gap-2 group"
          aria-label="Savora — Home"
        >
          <span class="font-heading text-2xl sm:text-3xl font-bold text-terracotta tracking-tight">
            {{ $t('siteName') }}
          </span>
          <span class="hidden sm:block text-xs text-text-muted font-light italic -mt-1">
            {{ $t('tagline') }}
          </span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav
          class="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          <AMenuItem
            v-for="link in navLinks"
            :key="link.to"
            :to="localePath(link.to)"
            :active="isActive(link.to)"
            :aria-label="$t(link.label)"
          >
            {{ $t(link.label) }}
          </AMenuItem>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-2">
          <!-- Locale switcher -->
          <select
            :value="locale"
            class="bg-transparent border border-border/50 rounded-lg px-2 py-1.5 text-sm text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta cursor-pointer"
            aria-label="Select language"
            @change="switchLocale"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="am">አማ</option>
          </select>

          <ADarkModeToggle />

          <!-- Desktop CTA -->
          <ABaseButton
            variant="primary"
            size="sm"
            class="hidden sm:inline-flex ml-2"
            :aria-label="$t('nav.reserve')"
            @click="navigateTo(localePath('/contact'))"
          >
            {{ $t('nav.reserve') }}
          </ABaseButton>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg hover:bg-surface-alt focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileOpen"
            aria-controls="mobile-menu"
            @click="mobileOpen = !mobileOpen"
          >
            <AIcon :name="mobileOpen ? 'close' : 'menu'" size="md" decorative />
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <Transition name="slide">
        <nav
          v-if="mobileOpen"
          id="mobile-menu"
          class="md:hidden border-t border-border/50 py-4 pb-6"
          aria-label="Mobile navigation"
        >
          <div class="flex flex-col gap-2">
            <AMenuItem
              v-for="link in navLinks"
              :key="link.to"
              :to="localePath(link.to)"
              :active="isActive(link.to)"
              :aria-label="$t(link.label)"
              class="py-3 text-lg"
              @click="mobileOpen = false"
            >
              {{ $t(link.label) }}
            </AMenuItem>
            <ABaseButton
              variant="primary"
              size="md"
              class="mt-2 w-full justify-center"
              @click="navigateTo(localePath('/contact')); mobileOpen = false"
            >
              {{ $t('nav.reserve') }}
            </ABaseButton>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const mobileOpen = ref(false)

const switchLocale = (e: Event) => {
  const target = e.target as HTMLSelectElement
  navigateTo(switchLocalePath(target.value))
}

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/menu', label: 'nav.menu' },
  { to: '/about', label: 'nav.about' },
  { to: '/gallery', label: 'nav.gallery' },
  { to: '/contact', label: 'nav.contact' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/' || route.path === `/${locale.value}`
  return route.path.includes(path)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
