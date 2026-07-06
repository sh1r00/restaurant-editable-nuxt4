// POST /api/menu — add a menu item
import { menuItems } from '~/data/menuItems'
import type { MenuItem } from '~/data/menuItems'

const storeKey = 'menu:items'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.description || body.price == null || !body.category) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields: name, description, price, category' })
  }

  const newItem: MenuItem = {
    id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: body.name,
    description: body.description,
    price: Number(body.price),
    category: body.category,
    image: body.image || '',
    dietary: Array.isArray(body.dietary) ? body.dietary : [],
  }

  // Get existing items
  const stored = await useStorage().getItem(storeKey)
  const existing: MenuItem[] = (stored && typeof stored === 'object' && Array.isArray((stored as any).items))
    ? (stored as any).items
    : [...menuItems]

  existing.push(newItem)

  await useStorage().setItem(storeKey, {
    items: existing,
    lastUpdated: new Date().toISOString(),
  })

  return { success: true, item: newItem }
})
