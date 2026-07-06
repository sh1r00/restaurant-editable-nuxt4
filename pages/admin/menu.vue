<template>
  <AdminLayout>
    <div>
      <div class="flex items-center justify-between mb-6">
        <h1 class="font-heading text-2xl font-bold text-text">Menu Management</h1>
        <button
          v-if="!showEditor"
          class="px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark transition-colors"
          @click="openAddForm"
        >
          + Add Item
        </button>
      </div>

      <!-- Editor panel -->
      <div v-if="showEditor" class="bg-surface rounded-xl border border-border/50 p-6 mb-6">
        <h2 class="font-heading text-lg font-semibold text-text mb-4">
          {{ editingItem ? 'Edit Item' : 'Add New Item' }}
        </h2>
        <MenuEditor
          :initial="editingItem || undefined"
          :submit-label="editingItem ? 'Update Item' : 'Add Item'"
          :show-cancel="true"
          @submit="handleSubmit"
          @cancel="closeEditor"
        />
      </div>

      <!-- Items list -->
      <div class="bg-surface rounded-xl border border-border/50 p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-heading text-lg font-semibold text-text">
            All Items ({{ menu.items.length }})
          </h2>
          <div class="flex items-center gap-2">
            <select
              v-model="filterCategory"
              class="px-3 py-1.5 rounded-lg border border-border bg-surface-alt text-text text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
            >
              <option value="">All Categories</option>
              <option value="starters">Starters</option>
              <option value="mains">Mains</option>
              <option value="desserts">Desserts</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>
        </div>

        <MenuList
          :items="filteredItems"
          @edit="openEditForm"
          @delete="handleDelete"
        />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { useMenuStore } from '~/stores/menu'
import { useAuthStore } from '~/stores/auth'
import type { MenuItem } from '~/data/menuItems'

definePageMeta({
  layout: false,
})

const auth = useAuthStore()
const menu = useMenuStore()

// Auth guard
if (!auth.isAuthenticated) {
  await navigateTo('/admin/login')
}

const showEditor = ref(false)
const editingItem = ref<MenuItem | null>(null)
const filterCategory = ref('')
const deleteConfirmId = ref<string | null>(null)

const filteredItems = computed(() => {
  if (!filterCategory.value) return menu.items
  return menu.items.filter(i => i.category === filterCategory.value)
})

const openAddForm = () => {
  editingItem.value = null
  showEditor.value = true
}

const openEditForm = (item: MenuItem) => {
  editingItem.value = { ...item }
  showEditor.value = true
}

const closeEditor = () => {
  showEditor.value = false
  editingItem.value = null
}

const handleSubmit = (data: Omit<MenuItem, 'id'>) => {
  if (editingItem.value) {
    menu.updateItem(editingItem.value.id, data)
  } else {
    menu.addItem(data)
  }
  closeEditor()
}

const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this item?')) {
    menu.deleteItem(id)
  }
}
</script>
