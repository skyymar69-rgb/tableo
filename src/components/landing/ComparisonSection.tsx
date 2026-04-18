import { Check, X, Crown } from "lucide-react";

type Cell = { kind: "yes" } | { kind: "no" } | { kind: "text"; label: string };

const CellView = ({ c }: { c: Cell }) => {
  if (c.kind === "yes") return <Check className="w-4 h-4 text-primary" />;
  if (c.kind === "no") return <X className="w-4 h-4 text-muted-foreground/30" />;
  return <span className="text-[11px] font-medium text-foreground/80 whitespace-nowrap">{c.label}</span>;
};

const rows: { feature: string; tableo: Cell; nordqr: Cell }[] = [
  { feature: "Prix Pro / mois", tableo: { kind: "text", label: "19€" }, nordqr: { kind: "text", label: "~29€" } },
  { feature: "Plan gratuit — plats", tableo: { kind: "text", label: "100" }, nordqr: { kind: "text", label: "20" } },
  { feature: "Plan gratuit — scans/mois", tableo: { kind: "text", label: "Illimités" }, nordqr: { kind: "text", label: "500" } },
  { feature: "Plan gratuit — langues", tableo: { kind: "text", label: "2" }, nordqr: { kind: "text", label: "1" } },
  { feature: "Plan gratuit — utilisateurs", tableo: { kind: "text", label: "3" }, nordqr: { kind: "text", label: "1" } },
  { feature: "Magic Scan (OCR menu IA)", tableo: { kind: "yes" }, nordqr: { kind: "yes" } },
  { feature: "Google Reviews", tableo: { kind: "yes" }, nordqr: { kind: "yes" } },
  { feature: "Analytics", tableo: { kind: "yes" }, nordqr: { kind: "yes" } },
  { feature: "Commande à table", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Paiement intégré (Stripe, Apple Pay)", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Frais de transaction", tableo: { kind: "text", label: "0.5%" }, nordqr: { kind: "text", label: "—" } },
  { feature: "Partage d'addition & pourboires", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Génération IA de photos de plats", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Auto-réponse IA aux avis", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "CRM client & segmentation", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Email/SMS marketing automation", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Intégration POS (Square, Lightspeed)", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Site web auto-généré + SEO", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "API publique + serveur MCP", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
  { feature: "Marketplace plugins", tableo: { kind: "yes" }, nordqr: { kind: "no" } },
];

const ComparisonSection = () => (
  <section className="py-24 md:py-32 border-t border-border/50">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-sm font-semibold text-accent mb-3 tracking-wide uppercase">Comparaison</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Tableo vs NordQR
        </h2>
        <p className="mt-4 text-muted-foreground">Plus généreux en gratuit. Moins cher en Pro. Beaucoup plus de fonctionnalités.</p>
      </div>

      <div className="max-w-3xl mx-auto rounded-2xl border border-border overflow-hidden">
        <div className="grid grid-cols-[1fr_110px_110px] bg-secondary/50 px-6 py-4 text-sm font-semibold">
          <span className="text-foreground">Fonctionnalité</span>
          <span className="text-center text-gradient-warm flex items-center justify-center gap-1">
            <Crown className="w-3.5 h-3.5 text-primary" />
            Tableo
          </span>
          <span className="text-center text-muted-foreground">NordQR</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.feature} className={`grid grid-cols-[1fr_110px_110px] px-6 py-3.5 text-sm items-center row-hover ${i % 2 === 0 ? "bg-card" : "bg-secondary/20"}`}>
            <span className="text-muted-foreground">{r.feature}</span>
            <span className="flex justify-center"><CellView c={r.tableo} /></span>
            <span className="flex justify-center"><CellView c={r.nordqr} /></span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6 max-w-xl mx-auto">
        Comparaison basée sur les plans publics NordQR (Basic / Lite / Pro / Max) au tarif mensuel.
      </p>
    </div>
  </section>
);

export default ComparisonSection;
