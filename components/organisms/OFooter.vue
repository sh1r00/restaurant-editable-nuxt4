<template>
  <footer
    class="bg-wood text-cream-dark mt-auto"
    role="contentinfo"
  >
    <div class="container-page py-12 sm:py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink
            :to="localePath('/')"
            class="font-heading text-2xl font-bold text-cream hover:text-white transition-colors"
          >
            {{ $t('siteName') }}
          </NuxtLink>
          <p class="mt-3 text-cream-dark/70 text-sm leading-relaxed">
            {{ $t('tagline') }}
          </p>
          <div class="flex gap-3 mt-4">
            <a href="#" class="text-cream-dark/60 hover:text-cream transition-colors" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" class="text-cream-dark/60 hover:text-cream transition-colors" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="text-cream-dark/60 hover:text-cream transition-colors" aria-label="Twitter / X">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-heading text-lg font-semibold text-cream mb-4">
            {{ $t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-cream-dark/70 hover:text-cream transition-colors text-sm"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Hours -->
        <div>
          <h3 class="font-heading text-lg font-semibold text-cream mb-4">
            {{ $t('hours.heading') }}
          </h3>
          <ul class="space-y-1.5 text-sm text-cream-dark/70">
            <li>{{ $t('hours.hoursData.monThu') }}</li>
            <li>{{ $t('hours.hoursData.friSat') }}</li>
            <li>{{ $t('hours.hoursData.sun') }}</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="font-heading text-lg font-semibold text-cream mb-4">
            {{ $t('contact.heading') }}
          </h3>
          <ul class="space-y-2 text-sm text-cream-dark/70">
            <li class="flex items-start gap-2">
              <AIcon name="map-pin" size="sm" decorative class="mt-0.5 shrink-0" />
              <span>{{ $t('hours.address') }}</span>
            </li>
            <li class="flex items-center gap-2">
              <AIcon name="phone" size="sm" decorative class="shrink-0" />
              <a :href="'tel:' + $t('hours.phone').replace(/[^+\d]/g, '')" class="hover:text-cream transition-colors">
                {{ $t('hours.phone') }}
              </a>
            </li>
            <li class="flex items-center gap-2">
              <AIcon name="mail" size="sm" decorative class="shrink-0" />
              <a :href="'mailto:' + $t('hours.email')" class="hover:text-cream transition-colors">
                {{ $t('hours.email') }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-10 pt-6 border-t border-cream-dark/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream-dark/50">
        <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/admin"
            class="flex items-center gap-1 text-cream-dark/40 hover:text-cream-dark/70 transition-colors"
            aria-label="Admin panel"
            title="Admin panel"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
            </svg>
            <span class="hidden sm:inline">Admin</span>
          </NuxtLink>
          <p>Crafted with passion. Served with love.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const quickLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/menu', label: 'nav.menu' },
  { to: '/about', label: 'nav.about' },
  { to: '/gallery', label: 'nav.gallery' },
  { to: '/contact', label: 'nav.contact' },
]
</script>
