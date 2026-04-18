import { Check, Sparkles, Shield } from "lucide-react";
import { useState } from "react";

type Plan = {
  name: string;
  monthly: string;
  yearly: string;
  period: string;
  desc: string;
  features: string[];
  cta: string;
  featured: boolean;
  highlight?: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: "0€",
    yearly: "0€",
    period: "à vie",
    desc: "Pour démarrer sans risque",
    features: [
      "1 établissement",
      "100 plats",
      "Scans illimités",
      "2 langues (dont traduction IA)",
      "3 utilisateurs",
      "QR dynamique + édition instantanée",
      "Allergènes & variantes de prix",
      "Support communauté",
    ],
    cta: "Commencer gratuitement",
    featured: false,
    highlight: "Déjà mieux que NordQR payant",
  },
  {
    name: "Pro",
    monthly: "19€",
    yearly: "15€",
    period: "/mois",
    desc: "Pour les restaurants qui veulent grandir",
    features: [
      "Jusqu'à 3 établissements",
      "Plats illimités",
      "12+ langues IA",
      "Utilisateurs illimités",
      "Magic Scan (OCR menu IA)",
      "Commande à table + paiement",
      "Partage d'addition + pourboires",
      "CRM client + segmentation",
      "Google Reviews + auto-réponse IA",
      "Analytics avancés",
      "0.5% de frais de transaction",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 14 jours",
    featured: true,
    highlight: "2× moins cher que NordQR Pro (~29€)",
  },
  {
    name: "Business",
    monthly: "49€",
    yearly: "39€",
    period: "/mois",
    desc: "Pour franchises et groupes",
    features: [
      "Établissements illimités",
      "Dashboard centralisé multi-resto",
      "Rôles personnalisables",
      "API publique + serveur MCP",
      "White-label (sans branding Tableo)",
      "Domaine personnalisé par resto",
      "Intégrations POS (Square, Lightspeed)",
      "Email/SMS marketing automation",
      "SLA 99.9% + account manager",
      "0.3% de frais de transaction",
    ],
    cta: "Essai gratuit 14 jours",
    featured: false,
  },
];

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-border/50 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[140px]" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Tarifs</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Des tarifs <span className="text-gradient-warm">transparents</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Commencez gratuitement. Passez Pro quand vous êtes prêt. Annulez quand vous voulez.</p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-secondary p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                !annual ? "bg-gradient-warm text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                annual ? "bg-gradient-warm text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annuel
              <span className="text-[10px] bg-primary/20 text-primary rounded px-1.5 py-0.5 font-bold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                p.featured
                  ? "border-primary/40 bg-gradient-card shadow-warm hover:shadow-glow-warm"
                  : "border-border bg-card hover:border-border/80 hover:shadow-card"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-warm px-3 py-1">
                  <Sparkles className="w-3 h-3 text-primary-foreground" />
                  <span className="text-xs font-semibold text-primary-foreground">Plus populaire</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              </div>
              <div className="mb-3">
                <span className="text-4xl font-bold text-foreground">{annual ? p.yearly : p.monthly}</span>
                <span className="text-muted-foreground text-sm ml-1">{p.period}</span>
              </div>
              {p.highlight && (
                <p className="mb-6 text-xs text-primary font-medium">✓ {p.highlight}</p>
              )}
              {!p.highlight && <div className="mb-6" />}
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full text-center rounded-xl py-3 text-sm font-semibold transition-all focus-ring ${
                  p.featured
                    ? "bg-gradient-warm text-primary-foreground hover:opacity-90 shadow-warm hover:scale-[1.02]"
                    : "border border-border text-foreground hover:bg-secondary/50"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4 text-primary/60" />
          <span>Annulation gratuite à tout moment · Sans engagement · Paiement sécurisé Stripe</span>
        </div>

        <p className="mt-3 text-center text-xs text-muted-foreground/70 max-w-xl mx-auto">
          Frais de transaction = commission sur les paiements à table effectués via Tableo. Aucun frais si vous n'utilisez pas la commande à table.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
