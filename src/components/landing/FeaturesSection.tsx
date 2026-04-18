import {
  QrCode, Wand2, ShoppingBag, Languages, Star, BarChart3, Building2, Utensils,
} from "lucide-react";

type Tier = "starter" | "pro" | "business";
const tierLabels: Record<Tier, { label: string; classes: string }> = {
  starter: { label: "Starter", classes: "text-primary bg-primary/10" },
  pro: { label: "Pro", classes: "text-accent bg-accent/10" },
  business: { label: "Business", classes: "text-foreground bg-foreground/10" },
};

const features: { icon: typeof QrCode; title: string; desc: string; color: string; tier: Tier }[] = [
  {
    icon: QrCode,
    title: "QR dynamique",
    desc: "Un QR par table, mise à jour instantanée du menu, scans illimités. Pages PWA ultra-rapides, mode offline.",
    color: "from-primary/20 to-primary/5",
    tier: "starter",
  },
  {
    icon: Utensils,
    title: "Éditeur de menu",
    desc: "Drag & drop, photos HD, variantes de prix, allergènes standards, régimes (végé, vegan, sans gluten).",
    color: "from-primary/15 to-primary/5",
    tier: "starter",
  },
  {
    icon: Wand2,
    title: "Magic Scan IA",
    desc: "Uploadez votre menu papier ou PDF, l'IA le transforme en menu digital éditable en 30 secondes.",
    color: "from-accent/20 to-accent/5",
    tier: "pro",
  },
  {
    icon: Languages,
    title: "Traduction IA",
    desc: "12+ langues auto-traduites avec synchronisation instantanée. Qualité supérieure à Google Translate.",
    color: "from-accent/20 to-primary/5",
    tier: "pro",
  },
  {
    icon: ShoppingBag,
    title: "Commande & Paiement",
    desc: "Le client commande et paie depuis son téléphone. Stripe, Apple Pay, Google Pay, partage d'addition, pourboires.",
    color: "from-primary/20 to-accent/5",
    tier: "pro",
  },
  {
    icon: Star,
    title: "CRM & Reviews",
    desc: "Base clients automatique, scoring de fréquentation, Google Reviews intégrés, auto-réponse IA aux avis.",
    color: "from-primary/20 to-primary/5",
    tier: "pro",
  },
  {
    icon: BarChart3,
    title: "Analytics avancés",
    desc: "Revenu par table, conversions par QR, plats les plus rentables, heatmap du menu, suggestions IA de prix.",
    color: "from-accent/15 to-accent/5",
    tier: "pro",
  },
  {
    icon: Building2,
    title: "Multi-établissements",
    desc: "Dashboard centralisé pour franchises et groupes. Rôles personnalisables, API publique, serveur MCP, white-label.",
    color: "from-accent/20 to-primary/5",
    tier: "business",
  },
];

const FeaturesSection = () => (
  <section id="features" className="py-24 md:py-32 relative">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />
    <div className="container mx-auto px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Fonctionnalités</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Tout ce dont votre restaurant a besoin.{" "}
          <span className="text-muted-foreground">Rien de superflu.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Menu, commande, paiement, CRM, analytics — une seule plateforme au lieu de 5 outils séparés.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => {
          const tier = tierLabels[f.tier];
          return (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-gradient-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-warm hover:-translate-y-1.5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className={`absolute top-4 right-4 text-[10px] font-bold rounded px-1.5 py-0.5 uppercase tracking-wider ${tier.classes}`}>
                {tier.label}
              </span>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 group-hover:bg-gradient-warm transition-all duration-300 group-hover:shadow-warm`}>
                <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary/40" /> Starter (gratuit)
          <span className="w-px h-3 bg-border mx-2" />
          <span className="w-2 h-2 rounded-full bg-accent/40" /> Pro (19€/mois)
          <span className="w-px h-3 bg-border mx-2" />
          <span className="w-2 h-2 rounded-full bg-foreground/40" /> Business (49€/mois)
        </span>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
