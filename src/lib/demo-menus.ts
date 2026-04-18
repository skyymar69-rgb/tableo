import type { MenuData, Category, Dish } from "./menu-store";

/**
 * Demo menus — plausible menus reconstructed from public info about
 * La Raffinerie Lyon (bar à bières + tapas + bistrot + happy hour).
 * Used as test data for Tableo's menu editor and public page UX.
 * Prices in cents (EUR).
 */

const uid = () => Math.random().toString(36).slice(2, 10);

const mk = (
  name: string,
  description: string,
  price: number,
  position: number,
  extras?: Partial<Dish>
): Dish => ({
  id: uid(),
  name,
  description,
  price,
  currency: "EUR",
  photo_url: null,
  allergens: [],
  diet_tags: [],
  is_available: true,
  position,
  ...extras,
});

const cat = (name: string, position: number, dishes: Dish[], description?: string): Category => ({
  id: uid(),
  name,
  description: description ?? null,
  position,
  dishes: dishes.map((d, i) => ({ ...d, position: i })),
});

// ---------------------------------------------------------------------------
// La Raffinerie Saxe (3e arrondissement — version "bistrot + tapas + bières")
// ---------------------------------------------------------------------------

export const DEMO_SAXE: MenuData = {
  restaurant: {
    id: uid(),
    slug: "la-raffinerie-saxe",
    name: "La Raffinerie Saxe",
    description: "Bar à bières · Tapas · Bistrot — Lyon 3e",
    address: "113 Avenue Maréchal de Saxe, 69003 Lyon",
    phone: "04 26 28 84 45",
    currency: "EUR",
    theme_color: "#C77B3E",
    logo_emoji: "🍺",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  categories: [
    cat("Tapas & Planches", 0, [
      mk("Burrata · pesto maison", "Burrata crémeuse, pesto basilic fait maison, huile d'olive, pain grillé", 1290, 0, { diet_tags: ["veg", "popular"] }),
      mk("Planche charcuterie", "Sélection de charcuteries fines · coppa, jambon cru, saucisson lyonnais", 1790, 1),
      mk("Planche fromagère", "Tomme, comté 18 mois, bleu d'Auvergne, chèvre frais, confiture", 1690, 2, { diet_tags: ["veg"] }),
      mk("Planche mixte", "Charcuteries + fromages · idéale à partager", 2290, 3, { diet_tags: ["popular"] }),
      mk("Croquetas jambon", "6 croquettes maison au jambon ibérique, aioli maison", 890, 4),
      mk("Patatas bravas", "Pommes de terre rôties, sauce brava épicée, aioli", 750, 5, { diet_tags: ["veg", "spicy"] }),
      mk("Gambas al ajillo", "6 gambas poêlées, ail, persil, piment d'Espelette", 1190, 6, { diet_tags: ["spicy"] }),
      mk("Tortilla espagnole", "Omelette épaisse pommes de terre & oignons confits", 790, 7, { diet_tags: ["veg"] }),
      mk("Olives marinées", "Mélange olives Kalamata & Picholine, huile d'olive & herbes", 450, 8, { diet_tags: ["vegan"] }),
    ]),
    cat("Le midi", 1, [
      mk("Croque-monsieur maison", "Pain de campagne, jambon blanc, comté, béchamel · salade", 1390, 0, { diet_tags: ["popular"] }),
      mk("Croque-madame", "Notre croque-monsieur + œuf au plat", 1490, 1),
      mk("Bowl du jour", "Suggestion du chef · base céréales, légumes de saison, protéine", 1390, 2, { diet_tags: ["new"] }),
      mk("Salade César", "Poulet fermier rôti, parmesan, croûtons, sauce César maison", 1490, 3),
      mk("Burger de la maison", "Bœuf charolais 180g, cheddar fermier, oignons confits, frites maison", 1690, 4),
      mk("Veggie burger", "Steak de légumes maison, fromage fondu, roquette, frites", 1490, 5, { diet_tags: ["veg"] }),
    ]),
    cat("Desserts", 2, [
      mk("Tiramisu maison", "Mascarpone, café, biscuits imbibés, cacao amer", 790, 0, { diet_tags: ["veg"] }),
      mk("Fondant au chocolat", "Chocolat noir 70%, cœur coulant, boule de glace vanille", 890, 1, { diet_tags: ["veg", "popular"] }),
      mk("Crème brûlée", "Vanille de Madagascar, croûte caramélisée", 790, 2, { diet_tags: ["veg"] }),
      mk("Café gourmand", "Expresso + 3 mignardises du jour", 790, 3, { diet_tags: ["veg"] }),
    ]),
    cat("Bières pression", 3, [
      mk("Blonde de la Brasserie", "25cl · 5%", 450, 0),
      mk("Blonde de la Brasserie", "50cl · 5%", 750, 1),
      mk("IPA Houblon d'Or", "25cl · 6.2% · Notes agrumes et résineuses", 520, 2),
      mk("IPA Houblon d'Or", "50cl · 6.2%", 850, 3),
      mk("Ambrée Caramel", "25cl · 5.5% · Malté, notes de caramel", 480, 4),
      mk("Brune Stout", "25cl · 6% · Torréfiée, café", 520, 5),
      mk("Blanche aux Agrumes", "25cl · 4.5% · Légère, rafraîchissante", 450, 6),
    ], "18 bières à la pression · demandez la sélection complète au bar"),
    cat("Vins au verre", 4, [
      mk("Beaujolais rouge", "Gamay · Domaine local · 12cl", 550, 0),
      mk("Côtes-du-Rhône", "Syrah-Grenache · 12cl", 580, 1),
      mk("Bourgogne blanc", "Chardonnay · Mâconnais · 12cl", 680, 2),
      mk("Sancerre", "Sauvignon blanc · 12cl", 750, 3),
      mk("Rosé de Provence", "12cl · frais & sec", 520, 4),
    ]),
    cat("Cocktails", 5, [
      mk("Spritz Aperol", "Prosecco, Aperol, eau gazeuse, orange", 850, 0, { diet_tags: ["popular"] }),
      mk("Mojito", "Rhum blanc, menthe fraîche, citron vert, sucre, eau gazeuse", 920, 1),
      mk("Old Fashioned", "Bourbon, sucre, bitter, zeste d'orange", 1150, 2),
      mk("Moscow Mule", "Vodka, ginger beer, citron vert", 980, 3),
      mk("Gin Tonic Signature", "Gin artisanal lyonnais, tonic premium, pamplemousse rose", 1050, 4),
    ], "Happy hour 18h–22h : -2€ sur les cocktails"),
    cat("Sans alcool", 6, [
      mk("Limonade artisanale", "Maison · citron pressé, eau gazeuse", 450, 0, { diet_tags: ["vegan"] }),
      mk("Jus de pomme local", "Pommes d'Ardèche, non filtré", 380, 1, { diet_tags: ["vegan"] }),
      mk("Café expresso", "Torréfaction locale", 220, 2, { diet_tags: ["vegan"] }),
      mk("Thé / Infusion", "Sélection en salle", 380, 3, { diet_tags: ["vegan"] }),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// La Raffinerie Valmy (9e arrondissement — version orientée brunch et soir)
// ---------------------------------------------------------------------------

export const DEMO_VALMY: MenuData = {
  restaurant: {
    id: uid(),
    slug: "la-raffinerie-valmy",
    name: "La Raffinerie Valmy",
    description: "Bar à bières · Brunch · Tapas — Lyon 9e",
    address: "Place Valmy, 69009 Lyon",
    phone: "04 78 00 00 00",
    currency: "EUR",
    theme_color: "#C77B3E",
    logo_emoji: "🍻",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  categories: [
    cat("Brunch (samedi & dimanche)", 0, [
      mk("Brunch Complet", "Œufs brouillés, bacon grillé, pancakes, fruits frais, pain maison, jus d'orange, café", 2290, 0, { diet_tags: ["popular"] }),
      mk("Brunch Veggie", "Œufs brouillés, avocat, houmous, granola, fruits, pain maison, thé/café", 2090, 1, { diet_tags: ["veg"] }),
      mk("Pancakes sirop d'érable", "3 pancakes moelleux, sirop d'érable, beurre demi-sel", 1090, 2, { diet_tags: ["veg"] }),
      mk("Avocado toast", "Pain au levain, avocat écrasé, œuf poché, piment d'Espelette", 1290, 3, { diet_tags: ["veg"] }),
      mk("Granola bowl", "Yaourt grec, granola maison, fruits frais, miel", 990, 4, { diet_tags: ["veg"] }),
    ], "Servi de 11h à 15h le week-end"),
    cat("Tapas & Planches", 1, [
      mk("Burrata · pesto maison", "Burrata crémeuse, pesto basilic, huile d'olive, pain grillé", 1290, 0, { diet_tags: ["veg", "popular"] }),
      mk("Planche mixte Valmy", "Charcuteries + fromages + olives + caviar d'aubergine", 2490, 1, { diet_tags: ["popular"] }),
      mk("Houmous maison", "Pois chiches, tahini, huile d'olive, paprika fumé, pain pita", 790, 2, { diet_tags: ["vegan"] }),
      mk("Anchois marinés", "Boquerones, huile d'olive, ail, persil, pain grillé", 790, 3),
      mk("Patatas bravas", "Pommes de terre rôties, sauce brava, aioli", 750, 4, { diet_tags: ["veg", "spicy"] }),
      mk("Calamars à la plancha", "Calamars frais, citron, ail, persil", 1290, 5),
      mk("Chorizo au cidre", "Chorizo ibérique flambé au cidre, pain toasté", 890, 6),
    ]),
    cat("Les plats", 2, [
      mk("Burger maison", "Bœuf charolais 180g, cheddar, oignons confits, tomate, frites", 1690, 0, { diet_tags: ["popular"] }),
      mk("Fish & chips", "Cabillaud pané, frites maison, sauce tartare, citron", 1690, 1),
      mk("Poke bowl saumon", "Riz vinaigré, saumon mariné, avocat, edamame, graines", 1590, 2),
      mk("Poke bowl veggie", "Riz, tofu mariné, avocat, edamame, carottes, graines", 1390, 3, { diet_tags: ["vegan"] }),
      mk("Quiche du jour", "Pâte brisée maison, garniture du marché · salade verte", 1290, 4, { diet_tags: ["veg"] }),
      mk("Salade César poulet", "Poulet fermier, parmesan, croûtons, sauce César", 1490, 5),
    ]),
    cat("Desserts", 3, [
      mk("Cheesecake New York", "Speculoos, fromage frais, coulis fruits rouges", 790, 0, { diet_tags: ["veg", "popular"] }),
      mk("Fondant chocolat", "Chocolat 70%, cœur coulant, glace vanille", 890, 1, { diet_tags: ["veg"] }),
      mk("Tiramisu", "Mascarpone, café, cacao amer", 790, 2, { diet_tags: ["veg"] }),
      mk("Salade de fruits frais", "Fruits de saison, menthe, sirop léger", 690, 3, { diet_tags: ["vegan"] }),
    ]),
    cat("Bières pression", 4, [
      mk("Blonde Valmy", "25cl · 5% · Bière signature du spot", 450, 0),
      mk("Blonde Valmy", "50cl · 5%", 750, 1),
      mk("IPA Citra", "25cl · 6% · Houblon Citra, agrumes", 520, 2),
      mk("NEIPA Juicy", "25cl · 6.5% · Fruitée, troublée", 580, 3),
      mk("Blanche", "25cl · 4.5% · Légère, coriandre", 450, 4),
      mk("Brune", "25cl · 6% · Torréfiée, chocolat", 520, 5),
    ], "18 bières pression · carte complète au bar"),
    cat("Cocktails", 5, [
      mk("Spritz Aperol", "Prosecco, Aperol, orange", 850, 0, { diet_tags: ["popular"] }),
      mk("Spritz Campari", "Prosecco, Campari, orange", 850, 1),
      mk("Mojito", "Rhum blanc, menthe, citron vert", 920, 2),
      mk("Margarita", "Tequila, triple sec, citron vert, sel", 980, 3),
      mk("Gin Tonic Signature", "Gin lyonnais, tonic premium", 1050, 4),
      mk("Mimosa (brunch)", "Champagne + jus d'orange frais", 780, 5),
    ], "Happy hour 18h–22h"),
    cat("Vins & bulles", 6, [
      mk("Beaujolais rouge (12cl)", "Gamay", 550, 0),
      mk("Côtes-du-Rhône (12cl)", "Syrah", 580, 1),
      mk("Bourgogne blanc (12cl)", "Chardonnay", 680, 2),
      mk("Rosé Provence (12cl)", "", 520, 3),
      mk("Coupe de champagne", "Brut · 10cl", 890, 4),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Helpers to import
// ---------------------------------------------------------------------------

const STORAGE_KEY = "tableo:menus:v1";
const ACTIVE_KEY = "tableo:active-restaurant:v1";

export const importDemoMenus = (): { saxe: string; valmy: string } => {
  const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
  current[DEMO_SAXE.restaurant.slug] = DEMO_SAXE;
  current[DEMO_VALMY.restaurant.slug] = DEMO_VALMY;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  window.localStorage.setItem(ACTIVE_KEY, DEMO_SAXE.restaurant.slug);
  return { saxe: DEMO_SAXE.restaurant.slug, valmy: DEMO_VALMY.restaurant.slug };
};
