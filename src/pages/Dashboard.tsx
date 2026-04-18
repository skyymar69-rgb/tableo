import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Utensils, ExternalLink, QrCode, Trash2, Edit3, Sparkles } from "lucide-react";
import { menuStore, type RestaurantInfo } from "@/lib/menu-store";
import { importDemoMenus } from "@/lib/demo-menus";

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);

  useEffect(() => {
    setRestaurants(menuStore.listRestaurants());
  }, []);

  const refresh = () => setRestaurants(menuStore.listRestaurants());

  const handleImportDemo = () => {
    importDemoMenus();
    refresh();
  };

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-sm font-bold text-primary-foreground">T</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">Tableo</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Mes restaurants</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gère tes menus, QR codes et analytics en un seul endroit.
            </p>
          </div>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 hover:scale-[1.02] transition-all shadow-warm"
          >
            <Plus className="w-4 h-4" />
            Nouveau restaurant
          </Link>
        </div>

        {restaurants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/30 p-12 text-center max-w-xl mx-auto">
            <Utensils className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-foreground mb-2">Aucun restaurant pour l'instant</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Crée ton premier menu en 2 minutes, ou charge nos menus de démo pour tester l'interface.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-warm px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 hover:scale-[1.02] transition-all shadow-warm"
              >
                <Plus className="w-4 h-4" />
                Créer mon restaurant
              </Link>
              <button
                onClick={handleImportDemo}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary/50 transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Importer les menus de démo
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground/60">
              Démo : 2 menus de La Raffinerie (Saxe + Valmy) préremplis — tapas, bières, desserts, cocktails.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {restaurants.map((r) => (
              <div
                key={r.id}
                className="group rounded-2xl border border-border bg-gradient-card p-6 transition-all hover:border-primary/30 hover:shadow-warm hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-warm flex items-center justify-center text-2xl shrink-0">
                    {r.logo_emoji || "🍽️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-semibold text-foreground truncate">{r.name}</h2>
                    <p className="text-xs text-muted-foreground truncate">/r/{r.slug}</p>
                  </div>
                </div>

                {r.description && (
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{r.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/menu/${r.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-warm px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-all"
                  >
                    <Edit3 className="w-3 h-3" />
                    Éditer le menu
                  </Link>
                  <a
                    href={`/r/${r.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/50 transition-all"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Voir
                  </a>
                  <Link
                    to={`/menu/${r.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/50 transition-all"
                  >
                    <QrCode className="w-3 h-3" />
                    QR
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm(`Supprimer le restaurant "${r.name}" et son menu ?`)) {
                        menuStore.deleteRestaurant(r.slug);
                        refresh();
                      }
                    }}
                    className="ml-auto inline-flex items-center justify-center rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-10 text-xs text-muted-foreground/60 text-center">
          💾 Données stockées localement dans votre navigateur. La synchronisation cloud arrive bientôt.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
