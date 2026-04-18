import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Store } from "lucide-react";
import { menuStore } from "@/lib/menu-store";

const Onboarding = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    const restaurant = menuStore.createRestaurant({
      name: name.trim(),
      description: description.trim(),
      address: address.trim(),
    });
    navigate(`/menu/${restaurant.slug}`, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-overlay p-6">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative w-full max-w-lg">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-warm flex items-center justify-center transition-transform group-hover:scale-110">
            <span className="text-base font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Tableo</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-8 shadow-card">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-4">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs font-medium text-primary">Étape 1/2</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Présentez votre restaurant</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Quelques infos pour personnaliser votre menu. Vous pourrez tout modifier plus tard.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-foreground mb-1.5 block">
                Nom du restaurant <span className="text-destructive">*</span>
              </span>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg bg-secondary border border-border pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  placeholder="Le Petit Bistro"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-foreground mb-1.5 block">
                Description courte <span className="text-muted-foreground/70">(optionnel)</span>
              </span>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg bg-secondary border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Cuisine française traditionnelle · Lyon"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-foreground mb-1.5 block">
                Adresse <span className="text-muted-foreground/70">(optionnel)</span>
              </span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg bg-secondary border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="12 rue de la République, 69002 Lyon"
              />
            </label>

            <button
              type="submit"
              disabled={!name.trim() || submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-4 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-all hover:scale-[1.01] hover:shadow-glow-warm focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Création..." : "Créer mon menu"}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="mt-5 text-xs text-muted-foreground/60 text-center">
            💾 Les infos sont stockées localement pour le moment. La synchro cloud arrive bientôt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
