export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: 'starters' | 'mains' | 'desserts' | 'drinks'
  image: string
  dietary: string[]
}

export const menuItems: MenuItem[] = [
  // --- STARTERS ---
  {
    id: 'st1',
    name: 'Burrata Caprese',
    description: 'Creamy burrata with heirloom tomatoes, fresh basil, aged balsamic, and extra virgin olive oil.',
    price: 16,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1608032077018-c9aad9565d2b?w=600&h=400&fit=crop',
    dietary: ['vegetarian', 'glutenFree'],
  },
  {
    id: 'st2',
    name: 'Tuna Tartare',
    description: 'Sushi-grade ahi tuna with avocado, sesame, ginger, and wonton crisps.',
    price: 19,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: 'st3',
    name: 'Wild Mushroom Arancini',
    description: 'Crispy risotto balls filled with wild mushrooms and truffle pecorino, served with saffron aioli.',
    price: 14,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&h=400&fit=crop',
    dietary: ['vegetarian'],
  },
  {
    id: 'st4',
    name: 'Roasted Beet Salad',
    description: 'Golden and red beets with goat cheese, candied walnuts, arugula, and citrus vinaigrette.',
    price: 15,
    category: 'starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=400&fit=crop',
    dietary: ['vegetarian', 'glutenFree'],
  },

  // --- MAINS ---
  {
    id: 'm1',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with lemon butter sauce, asparagus, and herbed fingerling potatoes.',
    price: 32,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    dietary: ['glutenFree'],
  },
  {
    id: 'm2',
    name: 'Braised Short Rib',
    description: 'Slow-braised beef short rib with creamy polenta, roasted root vegetables, and red wine jus.',
    price: 38,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: 'm3',
    name: 'Truffle Risotto',
    description: 'Arborio rice with wild mushrooms, black truffle, parmesan, and fresh thyme.',
    price: 26,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
    dietary: ['vegetarian', 'glutenFree'],
  },
  {
    id: 'm4',
    name: 'Lamb Chops',
    description: 'New Zealand lamb chops with mint chimichurri, roasted garlic mashed potatoes, and grilled vegetables.',
    price: 42,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
    dietary: ['glutenFree'],
  },
  {
    id: 'm5',
    name: 'Eggplant Parmigiana',
    description: 'Layered eggplant with San Marzano tomato sauce, fresh mozzarella, basil, and aged parmesan.',
    price: 22,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=600&h=400&fit=crop',
    dietary: ['vegetarian'],
  },
  {
    id: 'm6',
    name: 'Spicy Thai Basil Chicken',
    description: 'Wok-fried chicken with Thai basil, chili, garlic, and jasmine rice.',
    price: 24,
    category: 'mains',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop',
    dietary: ['spicy'],
  },

  // --- DESSERTS ---
  {
    id: 'd1',
    name: 'Tiramisu',
    description: 'Classic Italian tiramisu with mascarpone, espresso-soaked ladyfingers, and cocoa dusting.',
    price: 12,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
    dietary: ['vegetarian'],
  },
  {
    id: 'd2',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with molten center, vanilla bean ice cream, and berry coulis.',
    price: 14,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
    dietary: ['vegetarian'],
  },
  {
    id: 'd3',
    name: 'Panna Cotta',
    description: 'Silky vanilla panna cotta with strawberry compote and fresh mint.',
    price: 11,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    dietary: ['vegetarian', 'glutenFree'],
  },
  {
    id: 'd4',
    name: 'Lemon Sorbet Trio',
    description: 'House-made lemon, raspberry, and passion fruit sorbets served in a tuile cup.',
    price: 10,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=400&fit=crop',
    dietary: ['vegan', 'glutenFree'],
  },

  // --- DRINKS ---
  {
    id: 'dr1',
    name: 'Savora Signature Cocktail',
    description: 'Gin, elderflower liqueur, fresh cucumber, lime, and a splash of sparkling water.',
    price: 15,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: 'dr2',
    name: 'Negroni Classico',
    description: 'Equal parts gin, Campari, and sweet vermouth, stirred and served over a large ice cube.',
    price: 14,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: 'dr3',
    name: 'Espresso Martini',
    description: 'Vodka, fresh espresso, coffee liqueur, and a touch of vanilla, shaken and double-strained.',
    price: 16,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: 'dr4',
    name: 'Fresh Pressed Juice',
    description: 'Seasonal blend of orange, carrot, ginger, and turmeric — refreshing and vibrant.',
    price: 8,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=600&h=400&fit=crop',
    dietary: ['vegan', 'glutenFree'],
  },
  {
    id: 'dr5',
    name: 'Italian Sodas',
    description: 'Sparkling water with house-made syrups: blood orange, lavender, or hibiscus.',
    price: 7,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop',
    dietary: ['vegan', 'glutenFree'],
  },
]

export const menuCategories = [
  { key: 'starters', label: 'menu.categories.starters' },
  { key: 'mains', label: 'menu.categories.mains' },
  { key: 'desserts', label: 'menu.categories.desserts' },
  { key: 'drinks', label: 'menu.categories.drinks' },
] as const

export const dietaryLabels: Record<string, string> = {
  vegetarian: 'menu.dietary.vegetarian',
  vegan: 'menu.dietary.vegan',
  glutenFree: 'menu.dietary.glutenFree',
  spicy: 'menu.dietary.spicy',
}
