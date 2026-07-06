// PUT /api/menu/:id — update a menu item
import { menuItems } from '~/data/menuItems'
import type { MenuItem } from '~/data/menuItems'

const storeKey = 'menu:items'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing item id' })
  }

  // Get existing items
  const stored = await useStorage().getItem(storeKey)
  const existing: MenuItem[] = (stored && typeof stored === 'object' && Array.isArray((stored as any).items))
    ? (stored as any).items
    : [...menuItems]

  const index = existing.findIndex((item) => item.id === id)
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Item not found' })
  }

  const updated: MenuItem = {
    ...existing[index],
    ...(body.name !== undefined && { name: body.name }),
    ...(body.description !== undefined && { description: body.description }),
    ...(body.price !== undefined && { price: Number(body.price) }),
    ...(body.category !== undefined && { category: body.category }),
    ...(body.image !== undefined && { image: body.image }),
    ...(body.dietary !== undefined && { dietary: Array.isArray(body.dietary) ? body.dietary : [] }),
  }

  existing[index] = updated

  await useStorage().setItem(storeKey, {
    items: existing,
    lastUpdated: new Date().toISOString(),
  })

  return { success: true, item: updated }
})
