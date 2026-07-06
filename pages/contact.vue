<template>
  <div>
    <!-- Page Header -->
    <section class="relative py-20 sm:py-28 overflow-hidden" aria-labelledby="contact-heading">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&h=600&fit=crop"
          alt=""
          class="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div class="absolute inset-0 bg-black/50" />
      </div>
      <div class="relative z-10 container-page text-center text-white">
        <h1 id="contact-heading" class="font-heading text-4xl sm:text-5xl font-bold mb-4">
          {{ $t('contact.heading') }}
        </h1>
        <p class="text-lg text-white/80 max-w-2xl mx-auto">
          {{ $t('contact.subtitle') }}
        </p>
      </div>
    </section>

    <!-- Form + Info -->
    <section class="py-16 sm:py-24 bg-surface-alt" aria-label="Contact form and information">
      <div class="container-page">
        <div class="grid lg:grid-cols-5 gap-10">
          <!-- Form -->
          <div class="lg:col-span-3">
            <form
              class="bg-surface rounded-2xl p-6 sm:p-8 shadow-lg border border-border/50"
              @submit.prevent="handleSubmit"
              novalidate
            >
              <h2 class="font-heading text-2xl font-bold mb-6 text-text">
                {{ $t('nav.reservations') }}
              </h2>

              <!-- Success / Error messages -->
              <div
                v-if="submitStatus === 'success'"
                class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg text-sm"
                role="alert"
              >
                {{ $t('contact.form.success') }}
              </div>
              <div
                v-if="submitStatus === 'error'"
                class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm"
                role="alert"
              >
                {{ $t('contact.form.error') }}
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <!-- Name -->
                <div class="sm:col-span-2">
                  <label for="contact-name" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.name') }}
                  </label>
                  <input
                    id="contact-name"
                    v-model="form.name"
                    type="text"
                    required
                    :aria-required="true"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text placeholder:text-text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                    :placeholder="$t('contact.form.name')"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="contact-email" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.email') }}
                  </label>
                  <input
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    required
                    :aria-required="true"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text placeholder:text-text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                    :placeholder="$t('contact.form.email')"
                  />
                </div>

                <!-- Phone -->
                <div>
                  <label for="contact-phone" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.phone') }}
                  </label>
                  <input
                    id="contact-phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text placeholder:text-text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                    :placeholder="$t('contact.form.phone')"
                  />
                </div>

                <!-- Date -->
                <div>
                  <label for="contact-date" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.date') }}
                  </label>
                  <input
                    id="contact-date"
                    v-model="form.date"
                    type="date"
                    required
                    :aria-required="true"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                  />
                </div>

                <!-- Time -->
                <div>
                  <label for="contact-time" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.time') }}
                  </label>
                  <input
                    id="contact-time"
                    v-model="form.time"
                    type="time"
                    required
                    :aria-required="true"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                  />
                </div>

                <!-- Guests -->
                <div class="sm:col-span-2">
                  <label for="contact-guests" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.guests') }}
                  </label>
                  <select
                    id="contact-guests"
                    v-model="form.guests"
                    required
                    :aria-required="true"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8+</option>
                  </select>
                </div>

                <!-- Message -->
                <div class="sm:col-span-2">
                  <label for="contact-message" class="block text-sm font-medium text-text mb-1.5">
                    {{ $t('contact.form.message') }}
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    rows="3"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-surface-alt text-text placeholder:text-text-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta transition-colors resize-y"
                    :placeholder="$t('contact.form.message')"
                  />
                </div>
              </div>

              <ABaseButton
                type="submit"
                variant="primary"
                size="lg"
                class="mt-6 w-full sm:w-auto"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
              </ABaseButton>
            </form>
          </div>

          <!-- Info sidebar -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Map placeholder -->
            <div class="bg-surface rounded-2xl overflow-hidden shadow-lg border border-border/50 h-[280px] flex items-center justify-center">
              <div class="text-center text-text-muted p-6">
                <AIcon name="map-pin" size="xl" decorative />
                <p class="mt-3 font-heading text-xl font-semibold text-text">{{ $t('contact.findUs') }}</p>
                <p class="text-sm mt-1">{{ $t('hours.address') }}</p>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="bg-surface rounded-2xl p-6 shadow-lg border border-border/50 space-y-6">
              <h3 class="font-heading text-xl font-bold text-text">{{ $t('hours.heading') }}</h3>

              <div class="space-y-2">
                <div class="flex items-start gap-3">
                  <AIcon name="clock" size="md" decorative class="text-terracotta shrink-0 mt-0.5" />
                  <div class="text-sm text-text-muted">
                    <p>{{ $t('hours.hoursData.monThu') }}</p>
                    <p>{{ $t('hours.hoursData.friSat') }}</p>
                    <p>{{ $t('hours.hoursData.sun') }}</p>
                  </div>
                </div>
              </div>

              <div class="space-y-3 pt-4 border-t border-border/50">
                <div class="flex items-center gap-3">
                  <AIcon name="phone" size="md" decorative class="text-terracotta shrink-0" />
                  <a :href="'tel:' + phoneDigits" class="text-text-muted hover:text-terracotta transition-colors text-sm">
                    {{ $t('hours.phone') }}
                  </a>
                </div>
                <div class="flex items-center gap-3">
                  <AIcon name="mail" size="md" decorative class="text-terracotta shrink-0" />
                  <a :href="'mailto:' + $t('hours.email')" class="text-text-muted hover:text-terracotta transition-colors text-sm">
                    {{ $t('hours.email') }}
                  </a>
                </div>
                <div class="flex items-start gap-3">
                  <AIcon name="map-pin" size="md" decorative class="text-terracotta shrink-0 mt-0.5" />
                  <p class="text-text-muted text-sm">{{ $t('hours.address') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const phoneDigits = computed(() => t('hours.phone').replace(/[^+\d]/g, ''))

const form = reactive({
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    // Simulate API call — in a real app, this would POST to a backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitStatus.value = 'success'
    // Reset form
    form.name = ''
    form.email = ''
    form.phone = ''
    form.date = ''
    form.time = ''
    form.guests = '2'
    form.message = ''
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
