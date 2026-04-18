import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Wifi, Battery, Signal, ChevronLeft } from "lucide-react";
import { menuStore, formatPrice, type MenuData } from "@/lib/menu-store";

const PublicMenu = () => {
  const { slug } = useParams<{ slug: string }>();
  const [menu, setMenu] = useState<MenuData | null | "not_found">(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setMenu("not_found");
      return;
    }
    const data = menuStore.getMenu(slug);
    if (!data) {
      setMenu("not_found");
      return;
    }
    setMenu(data);
    if (data.categories.length > 0) setActiveCategory(data.categories[0].id);
  }, [slug]);

  if (menu === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  if (menu === "not_found") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background noise-overlay p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4 text-3xl">🍽️</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Menu introuvable</h1>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Ce menu n'existe pas ou a été supprimé. Vérifie le QR code que tu as scanné.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour à Tableo
        </Link>
      </div>
    );
  }

  const { restaurant, categories } = menu;
  const visibleCategories = categories.filter((c) => c.dishes.length > 0);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      {/* Top status bar (mobile feel) */}
      <div className="hidden sm:flex items-center justify-between px-6 py-2 text-xs text-muted-foreground max-w-md mx-auto">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-3" />
        </div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center text-2xl shadow-warm">
              {restaurant.logo_emoji || "🍽️"}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-foreground truncate">{restaurant.name}</h1>
              {restaurant.description && (
                <p className="text-xs text-muted-foreground truncate">{restaurant.description}</p>
              )}
            </div>
          </div>
          {(restaurant.address || restaurant.phone) && (
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {restaurant.address && <span>📍 {restaurant.address}</span>}
              {restaurant.phone && <span>📞 {restaurant.phone}</span>}
            </div>
          )}
        </header>

        {/* Category pills */}
        {visibleCategories.length > 0 && (
          <div
            className="sticky top-0 bg-background/90 backdrop-blur border-b border-border/50 px-5 py-3 overflow-x-auto flex gap-2 z-10"
            role="tablist"
          >
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const el = document.getElementById(`cat-${cat.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-gradient-warm text-primary-foreground shadow-warm"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <main className="px-5 py-6 space-y-8">
          {visibleCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground">
                Ce menu est en cours de préparation. Revenez bientôt.
              </p>
            </div>
          ) : (
            visibleCategories.map((cat) => (
              <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-16">
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                  {cat.name}
                </h2>
                <div className="space-y-3">
                  {cat.dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className={`rounded-xl bg-card border border-border p-4 transition-all ${
                        !dish.is_available ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {dish.name}
                            </h3>
                            {!dish.is_available && (
                              <span className="text-[10px] bg-muted/40 text-muted-foreground rounded px-1.5 py-0.5 font-medium uppercase tracking-wider shrink-0">
                                Épuisé
                              </span>
                            )}
                          </div>
                          {dish.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {dish.description}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-bold text-gradient-warm tabular-nums shrink-0">
                          {formatPrice(dish.price, dish.currency)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        {/* Footer branding */}
        <footer className="px-5 pb-8 pt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Menu propulsé par <span className="font-semibold text-muted-foreground">Tableo</span>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default PublicMenu;
