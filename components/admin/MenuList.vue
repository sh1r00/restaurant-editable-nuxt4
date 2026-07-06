<template>
  <div>
    <div v-if="items.length === 0" class="text-center py-12 text-text-muted">
      <p class="text-lg">No menu items yet.</p>
      <p class="text-sm mt-1">Add your first item using the form above.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-border/50 text-left">
            <th class="py-3 px-2 font-medium text-text-muted w-16">Image</th>
            <th class="py-3 px-2 font-medium text-text-muted">Name</th>
            <th class="py-3 px-2 font-medium text-text-muted hidden sm:table-cell">Category</th>
            <th class="py-3 px-2 font-medium text-text-muted">Price</th>
            <th class="py-3 px-2 font-medium text-text-muted hidden lg:table-cell">Dietary</th>
            <th class="py-3 px-2 font-medium text-text-muted text-right w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.id"
            class="border-b border-border/20 hover:bg-surface-alt/50 transition-colors"
          >
            <td class="py-2 px-2">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-10 h-10 rounded object-cover"
                loading="lazy"
              />
              <div v-else class="w-10 h-10 rounded bg-surface-alt flex items-center justify-center text-text-muted text-xs">
                N/A
              </div>
            </td>
            <td class="py-2 px-2 font-medium text-text">
              {{ item.name }}
              <p class="text-text-muted text-xs mt-0.5 line-clamp-1 hidden md:block">{{ item.description }}</p>
            </td>
            <td class="py-2 px-2 hidden sm:table-cell">
              <span class="px-2 py-0.5 text-xs rounded-full bg-surface-alt text-text-muted capitalize">
                {{ item.category }}
              </span>
            </td>
            <td class="py-2 px-2 font-medium text-terracotta">${{ item.price }}</td>
            <td class="py-2 px-2 hidden lg:table-cell">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="d in item.dietary"
                  :key="d"
                  class="px-1.5 py-0.5 text-[10px] rounded bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  {{ d }}
                </span>
              </div>
            </td>
            <td class="py-2 px-2">
              <div class="flex items-center justify-end gap-1">
                <button
                  class="p-1.5 rounded hover:bg-surface-alt transition-colors text-text-muted hover:text-terracotta"
                  :aria-label="`Edit ${item.name}`"
                  @click="$emit('edit', item)"
                >
                  ✏️
                </button>
                <button
                  class="p-1.5 rounded hover:bg-surface-alt transition-colors text-text-muted hover:text-red-500"
                  :aria-label="`Delete ${item.name}`"
                  @click="$emit('delete', item.id)"
                >
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from '~/data/menuItems'

defineProps<{
  items: MenuItem[]
}>()

defineEmits<{
  edit: [item: MenuItem]
  delete: [id: string]
}>()
</script>
