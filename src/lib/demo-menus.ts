import type { MenuData, Category, Dish } from "./menu-store";

/**
 * Demo menus — La Raffinerie Saxe + Valmy
 *
 * SAXE: built from real NordQR scraping
 *   - Category names: extracted from go.nordqr.com/la-raffinerie-saxe/
 *   - "Les Bières" items: real extraction (13 pression with Pinte/Demi/Happy prices)
 *   - Other categories: plausible from bar context, marked <REAL?> in comments
 *     (user can paste real data via the Import JSON feature when desired)
 *
 * VALMY: plausible (not scraped yet)
 *
 * Prices in cents (EUR).
 */

const uid = () => Math.random().toString(36).slice(2, 10);

/** Make a dish. If the name has multiple sizes, format: "Name · 25cl" separately. */
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
// La Raffinerie Saxe (Lyon 3e) — 10 real categories from NordQR
// ---------------------------------------------------------------------------

export const DEMO_SAXE: MenuData = {
  restaurant: {
    id: uid(),
    slug: "la-raffinerie-saxe",
    name: "La Raffinerie Saxe",
    description: "Bar à bières · Tapas · Cocktails — Lyon 3e",
    address: "113 Avenue Maréchal de Saxe, 69003 Lyon",
    phone: "04 26 28 84 45",
    currency: "EUR",
    theme_color: "#C77B3E",
    logo_emoji: "🍺",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  categories: [
    // ========================================================================
    // DRY (bière/cocktails sans alcool) — plausible
    // ========================================================================
    cat("DRY", 0, [
      mk("IPA sans alcool", "Légère, houblonnée, aromatique — 0.0%", 550, 0),
      mk("Mojito sans alcool", "Menthe fraîche, citron vert, eau gazeuse, sucre de canne", 780, 1),
      mk("Virgin Spritz", "Sirop d'orange amère, eau gazeuse, citron", 680, 2),
      mk("Virgin Piña Colada", "Ananas, lait de coco, citron vert", 780, 3),
    ], "Sélection sans alcool"),

    // ========================================================================
    // Les Bières — REAL DATA from NordQR scraping ✓
    // ========================================================================
    cat("Les Bières", 1, [
      // ----- Bières pression (13 items, real prices Pinte/Demi/Happy Hour) -----
      // Modèle prix actuel = 1 seul prix. On stocke le prix Pinte et on met les
      // variantes dans la description jusqu'à ce que Phase 4 ajoute le support
      // multi-prix dans le modèle Dish.
      mk("La blonde — Tuborg 4,6°", "Pinte 6€ · Demi 3.50€ · Happy Hour 5€ · Rafraîchissante, notes florales et maltées", 600, 0, { diet_tags: ["popular"] }),
      mk("La blanche — 1664 Witbier 5°", "Pinte 7€ · Demi 4€ · Happy Hour 5.50€ · Fraîche et fruitée, citron et coriandre. IBU 11", 700, 1),
      mk("Ambrée — Fauve Garde A Vous 6.5°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Malts français, houblon alsacien Aramis", 830, 2),
      mk("Cidre — Magners 4,5°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Cidre irlandais, 17 variétés de pommes", 830, 3),
      mk("Azimut Blanche · Lime & Basilic 4,5°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Citron vert & basilic. IBU 18", 830, 4),
      mk("Azimut Easy NEIPA 6°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Fruits tropicaux, houblons Citra, Mosaic, El Dorado, Pop. Malts de blé et avoine", 830, 5),
      mk("Pietra Rossa fruitée 6,5°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Très douce, saveurs de cerise et fruits des bois", 830, 6),
      mk("Yakuza — Brewlab Double IPA 7,2°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Fruits exotiques, agrumes, amertume équilibrée. IBU 40", 830, 7, { diet_tags: ["popular"] }),
      mk("Guinness Stout 4,2°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Crémeuse, caramélisée, malts torréfiés. IBU 45", 830, 8),
      mk("Orange Mécanique — Sainte Cru Triple 7°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Arômes d'orange amère et miel d'acacia", 830, 9),
      mk("Fauve Double IPA 8°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Aromatique intense, houblons Krush, Mosaic, Talus", 830, 10),
      mk("Paradise Pepper — Piggy Brewing Pale Ale 5.6°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Infusée citron vert & poivre de Sichuan", 830, 11, { diet_tags: ["spicy"] }),
      mk("Temps du Bonheur — Fauve Session IPA 4°", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€ · Agrumes et fruits tropicaux", 830, 12),
      mk("Blonde + sirop", "Pinte 6.50€ · Demi 4€ · Happy Hour 5.50€", 650, 13),
      mk("Picon", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€", 830, 14),
      mk("Cervoise", "Pinte 8.30€ · Demi 4.50€ · Happy Hour 6.50€", 830, 15),
      mk("Supplément sirop ou tranche", "Kiwi, cassis, caramel, menthe, fraise, grenadine, citron, pamplemousse, orgeat, pêche, framboise, violette", 50, 16),
      mk("Supplément Picon", "", 100, 17),

      // ----- Bières bouteilles (partielles — scraping tronqué) -----
      mk("Hoppy Road — 33cl · 5°", "8.50€ · Fruits tropicaux, agrumes, mangue, ananas", 850, 18),
      mk("Get Ready 4 Love — Hoppy Road Pastry 33cl · 5°", "7.50€ · Texture onctueuse, cannelle, poire, vanille", 750, 19),
      mk("Iron — Gose Cassis Basilic 33cl · 6°", "5€ · Cassis et basilic, équilibré", 500, 20),
      mk("2 be Fruit (or not to be) — La Muette Fruited Sour 44cl · 5,5°", "8.50€ · Abricot et rhubarbe", 850, 21),
      mk("Incantation écarlate — Fauve Pastry Sour 44cl · 6,5°", "9€ · Acidulée, lactose, fruits rouges", 900, 22),
    ], "Bières pression : Pinte / Demi / Happy Hour (18h-22h) — Sirops et Picon dispo"),

    // ========================================================================
    // Les alcools au verre — plausible
    // ========================================================================
    cat("Les alcools au verre", 2, [
      mk("Whisky (4cl)", "Sélection de whiskies — demander au bar", 750, 0),
      mk("Rhum ambré (4cl)", "Rhums des Antilles", 700, 1),
      mk("Rhum blanc (4cl)", "Pour cocktails", 600, 2),
      mk("Vodka (4cl)", "Vodka premium", 650, 3),
      mk("Gin (4cl)", "Gin lyonnais artisanal", 700, 4),
      mk("Tequila (4cl)", "Tequila blanco", 700, 5),
    ]),

    // ========================================================================
    // La cave à vin — plausible
    // ========================================================================
    cat("La cave à vin", 3, [
      mk("Beaujolais rouge · 12cl", "Gamay du Beaujolais", 550, 0),
      mk("Côtes-du-Rhône rouge · 12cl", "Syrah-Grenache", 580, 1),
      mk("Bourgogne rouge · 12cl", "Pinot Noir", 650, 2),
      mk("Mâcon blanc · 12cl", "Chardonnay", 580, 3),
      mk("Sancerre blanc · 12cl", "Sauvignon blanc", 750, 4),
      mk("Rosé de Provence · 12cl", "Frais et sec", 520, 5),
      mk("Coupe de champagne · 10cl", "Brut", 890, 6),
      mk("Carafe 50cl (rouge)", "Vin du jour", 1650, 7),
    ]),

    // ========================================================================
    // Apéritifs, liqueurs et digestifs — plausible
    // ========================================================================
    cat("Apéritifs, liqueurs et digestifs", 4, [
      mk("Ricard / Pastis 51", "4cl", 450, 0),
      mk("Martini blanc / rouge", "6cl", 550, 1),
      mk("Porto", "6cl", 600, 2),
      mk("Campari", "4cl", 550, 3),
      mk("Aperol", "4cl", 550, 4),
      mk("Limoncello", "4cl", 500, 5),
      mk("Grand Marnier", "4cl", 650, 6),
      mk("Chartreuse verte", "4cl", 750, 7),
      mk("Cognac", "4cl", 850, 8),
      mk("Armagnac", "4cl", 800, 9),
    ]),

    // ========================================================================
    // Les Cocktails — plausible
    // ========================================================================
    cat("Les Cocktails", 5, [
      mk("Spritz Aperol", "Aperol, Prosecco, eau gazeuse, orange", 900, 0, { diet_tags: ["popular"] }),
      mk("Spritz Campari", "Campari, Prosecco, eau gazeuse, orange", 900, 1),
      mk("Mojito", "Rhum blanc, menthe, citron vert, sucre, eau gazeuse", 980, 2),
      mk("Mojito Fruits Rouges", "Mojito classique + fruits rouges", 1050, 3),
      mk("Margarita", "Tequila, triple sec, citron vert, sel", 1050, 4),
      mk("Daïquiri", "Rhum blanc, citron vert, sucre de canne", 980, 5),
      mk("Caïpirinha", "Cachaça, citron vert, sucre", 980, 6),
      mk("Moscow Mule", "Vodka, ginger beer, citron vert", 1050, 7),
      mk("Dark & Stormy", "Rhum brun, ginger beer, citron vert", 1050, 8),
      mk("Gin Tonic Signature", "Gin artisanal, tonic, pamplemousse", 1150, 9),
      mk("Negroni", "Gin, Campari, vermouth rouge", 1150, 10),
      mk("Old Fashioned", "Bourbon, sucre, bitter, zeste d'orange", 1250, 11),
      mk("Whiskey Sour", "Bourbon, citron, sucre, blanc d'œuf", 1150, 12),
    ], "Happy hour 18h-22h : -2€ sur tous les cocktails"),

    // ========================================================================
    // Les Shooters — plausible
    // ========================================================================
    cat("Les Shooters", 6, [
      mk("B52", "Kahlúa, Baileys, Grand Marnier", 600, 0),
      mk("Jägerbomb", "Jägermeister + Red Bull", 700, 1),
      mk("Tequila Citron-Sel", "Tequila, citron, sel", 500, 2),
      mk("Caramel", "Vodka vanille, crème caramel", 550, 3),
      mk("Pomme d'amour", "Vodka, sirop fraise", 550, 4),
      mk("Absinthe", "Version adoucie", 650, 5),
    ]),

    // ========================================================================
    // Boissons chaudes — plausible
    // ========================================================================
    cat("Boissons chaudes", 7, [
      mk("Expresso", "Café de torréfaction locale", 220, 0),
      mk("Double expresso", "", 380, 1),
      mk("Allongé", "", 260, 2),
      mk("Cappuccino", "", 420, 3),
      mk("Latte", "", 450, 4),
      mk("Chocolat chaud", "Chocolat fondu maison, chantilly", 480, 5),
      mk("Thé / Infusion", "Sélection en salle", 380, 6),
      mk("Vin chaud", "En saison (hiver)", 550, 7),
      mk("Irish Coffee", "Café + whisky + crème", 950, 8),
    ]),

    // ========================================================================
    // Soft, Boissons Froides — plausible
    // ========================================================================
    cat("Soft, Boissons Froides", 8, [
      mk("Coca-Cola", "33cl", 380, 0),
      mk("Coca Zéro", "33cl", 380, 1),
      mk("Orangina", "25cl", 380, 2),
      mk("Schweppes tonic", "25cl", 380, 3),
      mk("Perrier", "33cl", 380, 4),
      mk("San Pellegrino limonata", "33cl", 420, 5),
      mk("Jus d'orange pressé", "25cl", 480, 6),
      mk("Jus de pomme artisanal", "25cl", 420, 7),
      mk("Limonade artisanale", "33cl", 450, 8),
      mk("Sirop à l'eau", "Menthe, grenadine, fraise, citron...", 300, 9),
      mk("Eau plate", "50cl", 350, 10),
      mk("Eau gazeuse", "50cl", 380, 11),
    ]),

    // ========================================================================
    // Tapas — plausible (la vraie carte tapas est probablement différente)
    // ========================================================================
    cat("Tapas", 9, [
      mk("Burrata · pesto maison", "Burrata crémeuse, pesto basilic, huile d'olive, pain grillé", 1290, 0, { diet_tags: ["veg", "popular"] }),
      mk("Planche charcuterie", "Coppa, jambon cru, saucisson lyonnais, cornichons", 1690, 1),
      mk("Planche fromages", "Tomme, comté 18 mois, bleu, chèvre, confiture", 1590, 2, { diet_tags: ["veg"] }),
      mk("Planche mixte", "Charcuteries + fromages + olives", 2190, 3, { diet_tags: ["popular"] }),
      mk("Croquetas jambon ibérique", "6 croquettes maison, aïoli", 890, 4),
      mk("Patatas bravas", "Pommes de terre rôties, sauce brava, aïoli", 750, 5, { diet_tags: ["veg", "spicy"] }),
      mk("Gambas al ajillo", "6 gambas, ail, persil, piment", 1190, 6, { diet_tags: ["spicy"] }),
      mk("Tortilla espagnole", "Omelette pommes de terre & oignons", 790, 7, { diet_tags: ["veg"] }),
      mk("Houmous maison", "Pois chiches, tahini, paprika, pita", 790, 8, { diet_tags: ["vegan"] }),
      mk("Olives marinées", "Kalamata & Picholine", 450, 9, { diet_tags: ["vegan"] }),
      mk("Anchois marinés (boquerones)", "Huile d'olive, ail, persil", 790, 10),
      mk("Chorizo au cidre", "Flambé au cidre, pain toasté", 890, 11),
    ], "Servi de 17h30 à 23h"),
  ],
};

// ---------------------------------------------------------------------------
// La Raffinerie Valmy (Lyon 9e) — plausible menu (not scraped)
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
      mk("Brunch Complet", "Œufs brouillés, bacon, pancakes, fruits frais, pain maison, jus, café", 2290, 0, { diet_tags: ["popular"] }),
      mk("Brunch Veggie", "Œufs, avocat, houmous, granola, fruits, pain, thé/café", 2090, 1, { diet_tags: ["veg"] }),
      mk("Pancakes sirop d'érable", "3 pancakes, sirop d'érable, beurre demi-sel", 1090, 2, { diet_tags: ["veg"] }),
      mk("Avocado toast", "Pain au levain, avocat, œuf poché, piment d'Espelette", 1290, 3, { diet_tags: ["veg"] }),
      mk("Granola bowl", "Yaourt grec, granola maison, fruits frais, miel", 990, 4, { diet_tags: ["veg"] }),
    ], "Servi de 11h à 15h le week-end"),
    cat("Tapas & Planches", 1, [
      mk("Burrata · pesto maison", "Burrata crémeuse, pesto, pain grillé", 1290, 0, { diet_tags: ["veg", "popular"] }),
      mk("Planche mixte Valmy", "Charcuteries + fromages + olives + caviar d'aubergine", 2490, 1, { diet_tags: ["popular"] }),
      mk("Houmous maison", "Pois chiches, tahini, paprika, pita", 790, 2, { diet_tags: ["vegan"] }),
      mk("Patatas bravas", "Sauce brava, aïoli", 750, 3, { diet_tags: ["veg", "spicy"] }),
      mk("Calamars à la plancha", "Citron, ail, persil", 1290, 4),
      mk("Chorizo au cidre", "Flambé, pain toasté", 890, 5),
    ]),
    cat("Les plats", 2, [
      mk("Burger maison", "Charolais 180g, cheddar, oignons confits, frites", 1690, 0, { diet_tags: ["popular"] }),
      mk("Fish & chips", "Cabillaud pané, frites maison, sauce tartare", 1690, 1),
      mk("Poke bowl saumon", "Riz, saumon mariné, avocat, edamame", 1590, 2),
      mk("Poke bowl veggie", "Riz, tofu, avocat, edamame, graines", 1390, 3, { diet_tags: ["vegan"] }),
      mk("Quiche du jour", "Pâte brisée maison, garniture du marché", 1290, 4, { diet_tags: ["veg"] }),
    ]),
    cat("Desserts", 3, [
      mk("Cheesecake New York", "Speculoos, fruits rouges", 790, 0, { diet_tags: ["veg", "popular"] }),
      mk("Fondant chocolat", "Cœur coulant, glace vanille", 890, 1, { diet_tags: ["veg"] }),
      mk("Tiramisu", "Mascarpone, café, cacao", 790, 2, { diet_tags: ["veg"] }),
    ]),
    cat("Bières pression", 4, [
      mk("Blonde Valmy · Pinte", "5%", 650, 0),
      mk("Blonde Valmy · Demi", "5%", 400, 1),
      mk("IPA Citra · Pinte", "6% · Agrumes", 830, 2),
      mk("NEIPA Juicy · Pinte", "6.5% · Fruitée", 830, 3),
      mk("Blanche · Pinte", "4.5% · Coriandre", 700, 4),
      mk("Brune · Pinte", "6% · Torréfiée", 830, 5),
    ], "18 bières pression"),
    cat("Cocktails", 5, [
      mk("Spritz Aperol", "Prosecco, Aperol, orange", 900, 0, { diet_tags: ["popular"] }),
      mk("Mojito", "Rhum, menthe, citron vert", 980, 1),
      mk("Margarita", "Tequila, triple sec, citron vert", 1050, 2),
      mk("Gin Tonic Signature", "Gin lyonnais, tonic premium", 1150, 3),
      mk("Mimosa (brunch)", "Champagne + jus d'orange", 890, 4),
    ], "Happy hour 18h-22h"),
    cat("Vins & bulles", 6, [
      mk("Beaujolais rouge · 12cl", "Gamay", 550, 0),
      mk("Côtes-du-Rhône · 12cl", "Syrah", 580, 1),
      mk("Bourgogne blanc · 12cl", "Chardonnay", 680, 2),
      mk("Rosé Provence · 12cl", "", 520, 3),
      mk("Coupe de champagne", "10cl · Brut", 890, 4),
    ]),
  ],
};

// ---------------------------------------------------------------------------
// Helpers
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

/** Import a menu from a raw JSON string (for pasting scraped data later). */
export const importMenuFromJson = (jsonString: string): { slug: string } | { error: string } => {
  try {
    const data = JSON.parse(jsonString) as MenuData;
    if (!data.restaurant?.slug || !Array.isArray(data.categories)) {
      return { error: "Invalid menu format: missing restaurant.slug or categories[]" };
    }
    const current = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}");
    current[data.restaurant.slug] = data;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.localStorage.setItem(ACTIVE_KEY, data.restaurant.slug);
    return { slug: data.restaurant.slug };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Invalid JSON" };
  }
};

/** Export a menu as JSON for sharing / backup. */
export const exportMenuAsJson = (slug: string): string | null => {
  const all = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, MenuData>;
  const menu = all[slug];
  if (!menu) return null;
  return JSON.stringify(menu, null, 2);
};
