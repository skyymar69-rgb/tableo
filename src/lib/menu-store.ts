/**
 * Menu Store — localStorage-backed for Phase 3.
 * Phase 2 later: swap implementations to use Supabase.
 * API shape is designed to be drop-in compatible.
 */

export type Allergen =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "milk"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites"
  | "lupin"
  | "molluscs";

export const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: "Gluten",
  crustaceans: "Crustacés",
  eggs: "Œufs",
  fish: "Poisson",
  peanuts: "Arachides",
  soy: "Soja",
  milk: "Lait",
  nuts: "Fruits à coque",
  celery: "Céleri",
  mustard: "Moutarde",
  sesame: "Sésame",
  sulphites: "Sulfites",
  lupin: "Lupin",
  molluscs: "Mollusques",
};

export type DietTag = "veg" | "vegan" | "gluten_free" | "spicy" | "popular" | "new";

export const DIET_LABELS: Record<DietTag, string> = {
  veg: "Végétarien",
  vegan: "Vegan",
  gluten_free: "Sans gluten",
  spicy: "Épicé",
  popular: "Populaire",
  new: "Nouveau",
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number; // in smallest currency unit (cents) — e.g. 1250 = 12.50€
  currency: string;
  photo_url: string | null;
  allergens: Allergen[];
  diet_tags: DietTag[];
  is_available: boolean;
  position: number;
};

export type Category = {
  id: string;
  name: string;
  description: string | null;
  position: number;
  dishes: Dish[];
};

export type RestaurantInfo = {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  currency: string;
  theme_color: string;
  logo_emoji: string; // placeholder until we have uploads
  created_at: string;
  updated_at: string;
};

export type MenuData = {
  restaurant: RestaurantInfo;
  categories: Category[];
};

// ---------------------------------------------------------------------------
// localStorage keys & helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = "tableo:menus:v1";
const ACTIVE_KEY = "tableo:active-restaurant:v1";

type MenusRecord = Record<string, MenuData>; // keyed by slug

const loadAll = (): MenusRecord => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MenusRecord) : {};
  } catch {
    return {};
  }
};

const saveAll = (record: MenusRecord) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
};

const uid = () => Math.random().toString(36).slice(2, 10);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "resto";

// ---------------------------------------------------------------------------
// Public API — mirrors what a Supabase client would expose
// ---------------------------------------------------------------------------

export const menuStore = {
  listRestaurants(): RestaurantInfo[] {
    return Object.values(loadAll()).map((m) => m.restaurant);
  },

  getActiveSlug(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACTIVE_KEY);
  },

  setActiveSlug(slug: string): void {
    window.localStorage.setItem(ACTIVE_KEY, slug);
  },

  getMenu(slug: string): MenuData | null {
    return loadAll()[slug] ?? null;
  },

  createRestaurant(data: {
    name: string;
    description?: string;
    address?: string;
    phone?: string;
  }): RestaurantInfo {
    const all = loadAll();
    let base = slugify(data.name);
    let slug = base;
    let n = 2;
    while (all[slug]) {
      slug = `${base}-${n++}`;
    }
    const now = new Date().toISOString();
    const restaurant: RestaurantInfo = {
      id: uid(),
      slug,
      name: data.name,
      description: data.description ?? "",
      address: data.address ?? "",
      phone: data.phone ?? "",
      currency: "EUR",
      theme_color: "#FF6B35",
      logo_emoji: "🍽️",
      created_at: now,
      updated_at: now,
    };
    all[slug] = {
      restaurant,
      categories: [
        {
          id: uid(),
          name: "Entrées",
          description: null,
          position: 0,
          dishes: [],
        },
        {
          id: uid(),
          name: "Plats",
          description: null,
          position: 1,
          dishes: [],
        },
        {
          id: uid(),
          name: "Desserts",
          description: null,
          position: 2,
          dishes: [],
        },
      ],
    };
    saveAll(all);
    this.setActiveSlug(slug);
    return restaurant;
  },

  updateRestaurant(slug: string, patch: Partial<RestaurantInfo>): RestaurantInfo | null {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return null;
    entry.restaurant = { ...entry.restaurant, ...patch, updated_at: new Date().toISOString() };
    saveAll(all);
    return entry.restaurant;
  },

  deleteRestaurant(slug: string): boolean {
    const all = loadAll();
    if (!all[slug]) return false;
    delete all[slug];
    saveAll(all);
    if (this.getActiveSlug() === slug) {
      const remaining = Object.keys(all)[0];
      if (remaining) this.setActiveSlug(remaining);
      else window.localStorage.removeItem(ACTIVE_KEY);
    }
    return true;
  },

  // ----- Categories -----
  addCategory(slug: string, name: string): Category | null {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return null;
    const category: Category = {
      id: uid(),
      name,
      description: null,
      position: entry.categories.length,
      dishes: [],
    };
    entry.categories.push(category);
    entry.restaurant.updated_at = new Date().toISOString();
    saveAll(all);
    return category;
  },

  updateCategory(slug: string, categoryId: string, patch: Partial<Category>): Category | null {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return null;
    const cat = entry.categories.find((c) => c.id === categoryId);
    if (!cat) return null;
    Object.assign(cat, patch);
    entry.restaurant.updated_at = new Date().toISOString();
    saveAll(all);
    return cat;
  },

  deleteCategory(slug: string, categoryId: string): boolean {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return false;
    const before = entry.categories.length;
    entry.categories = entry.categories.filter((c) => c.id !== categoryId);
    entry.categories.forEach((c, i) => (c.position = i));
    entry.restaurant.updated_at = new Date().toISOString();
    saveAll(all);
    return entry.categories.length < before;
  },

  moveCategory(slug: string, categoryId: string, direction: "up" | "down"): void {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return;
    const idx = entry.categories.findIndex((c) => c.id === categoryId);
    const swapWith = direction === "up" ? idx - 1 : idx + 1;
    if (idx < 0 || swapWith < 0 || swapWith >= entry.categories.length) return;
    [entry.categories[idx], entry.categories[swapWith]] = [
      entry.categories[swapWith],
      entry.categories[idx],
    ];
    entry.categories.forEach((c, i) => (c.position = i));
    entry.restaurant.updated_at = new Date().toISOString();
    saveAll(all);
  },

  // ----- Dishes -----
  addDish(
    slug: string,
    categoryId: string,
    data: { name: string; description?: string; price: number }
  ): Dish | null {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return null;
    const cat = entry.categories.find((c) => c.id === categoryId);
    if (!cat) return null;
    const dish: Dish = {
      id: uid(),
      name: data.name,
      description: data.description ?? "",
      price: data.price,
      currency: entry.restaurant.currency,
      photo_url: null,
      allergens: [],
      diet_tags: [],
      is_available: true,
      position: cat.dishes.length,
    };
    cat.dishes.push(dish);
    entry.restaurant.updated_at = new Date().toISOString();
    saveAll(all);
    return dish;
  },

  updateDish(slug: string, dishId: string, patch: Partial<Dish>): Dish | null {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return null;
    for (const cat of entry.categories) {
      const dish = cat.dishes.find((d) => d.id === dishId);
      if (dish) {
        Object.assign(dish, patch);
        entry.restaurant.updated_at = new Date().toISOString();
        saveAll(all);
        return dish;
      }
    }
    return null;
  },

  deleteDish(slug: string, dishId: string): boolean {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return false;
    for (const cat of entry.categories) {
      const idx = cat.dishes.findIndex((d) => d.id === dishId);
      if (idx >= 0) {
        cat.dishes.splice(idx, 1);
        cat.dishes.forEach((d, i) => (d.position = i));
        entry.restaurant.updated_at = new Date().toISOString();
        saveAll(all);
        return true;
      }
    }
    return false;
  },

  moveDish(slug: string, dishId: string, direction: "up" | "down"): void {
    const all = loadAll();
    const entry = all[slug];
    if (!entry) return;
    for (const cat of entry.categories) {
      const idx = cat.dishes.findIndex((d) => d.id === dishId);
      if (idx < 0) continue;
      const swapWith = direction === "up" ? idx - 1 : idx + 1;
      if (swapWith < 0 || swapWith >= cat.dishes.length) return;
      [cat.dishes[idx], cat.dishes[swapWith]] = [cat.dishes[swapWith], cat.dishes[idx]];
      cat.dishes.forEach((d, i) => (d.position = i));
      entry.restaurant.updated_at = new Date().toISOString();
      saveAll(all);
      return;
    }
  },
};

export const formatPrice = (cents: number, currency = "EUR"): string =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(cents / 100);

export const parsePrice = (input: string): number | null => {
  const cleaned = input.replace(/[^\d,.]/g, "").replace(",", ".");
  const n = parseFloat(cleaned);
  if (isNaN(n)) return null;
  return Math.round(n * 100);
};
