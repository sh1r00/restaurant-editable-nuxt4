<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="gallery-heading">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1920&h=600&fit=crop"
          alt=""
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div class="relative z-10 container-page text-center text-white">
        <h1 id="gallery-heading" class="font-heading text-4xl sm:text-5xl font-bold mb-4">
          {{ $t('gallery.heading') }}
        </h1>
        <p class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ $t('gallery.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16 sm:py-24 bg-surface-alt" aria-label="Gallery images">
      <div class="container-page">
        <!-- Filter tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Gallery filters">
          <button
            role="tab"
            :aria-selected="activeFilter === 'all'"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            :class="activeFilter === 'all'
              ? 'bg-terracotta text-white shadow-md'
              : 'bg-surface text-text-muted hover:text-terracotta border border-border/50'"
            @click="activeFilter = 'all'"
          >
            All
          </button>
          <button
            v-for="filt in filters"
            :key="filt.key"
            role="tab"
            :aria-selected="activeFilter === filt.key"
            class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            :class="activeFilter === filt.key
              ? 'bg-terracotta text-white shadow-md'
              : 'bg-surface text-text-muted hover:text-terracotta border border-border/50'"
            @click="activeFilter = filt.key"
          >
            {{ filt.label }}
          </button>
        </div>

        <!-- Masonry-like grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="photo in filteredPhotos"
            :key="photo.id"
            class="group relative overflow-hidden rounded-xl aspect-square bg-surface cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300"
            @click="openLightbox(photo)"
            @keydown.enter.prevent="openLightbox(photo)"
            @keydown.space.prevent="openLightbox(photo)"
            tabindex="0"
            role="button"
            :aria-label="photo.alt"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-4">
              <span class="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                {{ photo.alt }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredPhotos.length === 0" class="text-center py-20 text-text-muted">
          <p class="text-lg">No photos in this category.</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="lightboxPhoto"
          class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxPhoto.alt"
          @click.self="lightboxPhoto = null"
          @keydown.escape="lightboxPhoto = null"
        >
          <button
            class="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Close lightbox"
            @click="lightboxPhoto = null"
          >
            <AIcon name="close" size="lg" decorative />
          </button>
          <img
            :src="lightboxPhoto.src"
            :alt="lightboxPhoto.alt"
            class="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
interface GalleryPhoto {
  id: number
  src: string
  alt: string
  category: string
}

const { t } = useI18n()

const photos: GalleryPhoto[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — dining room`, category: 'interior' },
  { id: 2, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — bar`, category: 'interior' },
  { id: 3, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — plated dish`, category: 'food' },
  { id: 4, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — signature dish`, category: 'food' },
  { id: 5, src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — outdoor seating`, category: 'interior' },
  { id: 6, src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — seafood`, category: 'food' },
  { id: 7, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — chef at work`, category: 'kitchen' },
  { id: 8, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — team`, category: 'kitchen' },
  { id: 9, src: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — fresh ingredients`, category: 'kitchen' },
  { id: 10, src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — dessert`, category: 'food' },
  { id: 11, src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — cocktails`, category: 'drinks' },
  { id: 12, src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&h=800&fit=crop', alt: `${t('gallery.altPrefix')} — table setting`, category: 'interior' },
]

const filters = [
  { key: 'food', label: 'Food' },
  { key: 'drinks', label: 'Drinks' },
  { key: 'interior', label: 'Interior' },
  { key: 'kitchen', label: 'Kitchen' },
]

const activeFilter = ref('all')
const lightboxPhoto = ref<GalleryPhoto | null>(null)

const filteredPhotos = computed(() =>
  activeFilter.value === 'all'
    ? photos
    : photos.filter(p => p.category === activeFilter.value)
)

const openLightbox = (photo: GalleryPhoto) => {
  lightboxPhoto.value = photo
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
