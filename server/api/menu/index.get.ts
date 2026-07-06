// GET /api/menu — return all menu items
import { menuItems } from '~/data/menuItems'

const storeKey = 'menu:items'

export default defineEventHandler(async () => {
  // Try to read from Nitro storage (server-side persistence)
  const stored = await useStorage().getItem(storeKey)
  if (stored && typeof stored === 'object' && Array.isArray((stored as any).items)) {
    return (stored as any).items
  }
  // Fall back to seed data
  return menuItems
})
