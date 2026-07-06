<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div>
      <label for="menu-name" class="block text-sm font-medium text-text mb-1">Name *</label>
      <input
        id="menu-name"
        v-model="form.name"
        type="text"
        required
        class="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        placeholder="e.g., Burrata Caprese"
      />
    </div>

    <div>
      <label for="menu-desc" class="block text-sm font-medium text-text mb-1">Description *</label>
      <textarea
        id="menu-desc"
        v-model="form.description"
        rows="3"
        required
        class="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta resize-y"
        placeholder="Describe the dish..."
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="menu-price" class="block text-sm font-medium text-text mb-1">Price ($) *</label>
        <input
          id="menu-price"
          v-model.number="form.price"
          type="number"
          step="0.01"
          min="0"
          required
          class="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        />
      </div>

      <div>
        <label for="menu-category" class="block text-sm font-medium text-text mb-1">Category *</label>
        <select
          id="menu-category"
          v-model="form.category"
          required
          class="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <option value="" disabled>Select category</option>
          <option value="starters">Starters</option>
          <option value="mains">Mains</option>
          <option value="desserts">Desserts</option>
          <option value="drinks">Drinks</option>
        </select>
      </div>
    </div>

    <div>
      <label for="menu-image" class="block text-sm font-medium text-text mb-1">Image URL</label>
      <input
        id="menu-image"
        v-model="form.image"
        type="url"
        class="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
        placeholder="https://images.unsplash.com/..."
      />
    </div>

    <div>
      <span class="block text-sm font-medium text-text mb-2">Dietary Tags</span>
      <div class="flex flex-wrap gap-3">
        <label
          v-for="diet in dietaryOptions"
          :key="diet.value"
          class="flex items-center gap-1.5 text-sm text-text-muted cursor-pointer"
        >
          <input
            type="checkbox"
            :value="diet.value"
            v-model="form.dietary"
            class="rounded border-border text-terracotta focus:ring-terracotta"
          />
          {{ diet.label }}
        </label>
      </div>
    </div>

    <div class="flex items-center gap-3 pt-2">
      <button
        type="submit"
        class="px-5 py-2.5 rounded-lg bg-terracotta text-white font-medium text-sm hover:bg-terracotta-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
      >
        {{ submitLabel }}
      </button>
      <button
        v-if="showCancel"
        type="button"
        class="px-5 py-2.5 rounded-lg border border-border text-text-muted text-sm hover:bg-surface-alt transition-colors"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/data/menuItems'

const props = defineProps<{
  initial?: Partial<MenuItem>
  submitLabel?: string
  showCancel?: boolean
}>()

const emit = defineEmits<{
  submit: [data: Omit<MenuItem, 'id'>]
  cancel: []
}>()

const dietaryOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'glutenFree', label: 'Gluten Free' },
  { value: 'spicy', label: 'Spicy' },
]

const form = reactive<{
  name: string
  description: string
  price: number
  category: string
  image: string
  dietary: string[]
}>({
  name: props.initial?.name || '',
  description: props.initial?.description || '',
  price: props.initial?.price || 0,
  category: props.initial?.category || '',
  image: props.initial?.image || '',
  dietary: props.initial?.dietary || [],
})

const handleSubmit = () => {
  if (!form.name || !form.description || form.price <= 0 || !form.category) return
  emit('submit', {
    name: form.name.trim(),
    description: form.description.trim(),
    price: form.price,
    category: form.category as MenuItem['category'],
    image: form.image.trim(),
    dietary: form.dietary,
  })
}
</script>
