import { ArrowRight, Mail, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/* 39. Animated gradient CTA background */
const CTASection = () => (
  <section className="py-24 md:py-32 border-t border-border/50 relative overflow-hidden">
    <div className="absolute inset-0 bg-hero-glow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[140px] animate-pulse-slow" />
    {/* Animated gradient orb */}
    <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] animate-float" />

    <div className="container mx-auto px-6 relative text-center" style={{ zIndex: 2 }}>
      <h2 className="text-3xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
        Prêt à transformer vos tables en{" "}
        <span className="text-gradient-warm font-serif italic font-normal">machines à revenus</span> ?
      </h2>
      <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
        Démarrez gratuitement en moins de 5 minutes. Aucune carte bancaire requise. Annulez quand vous voulez.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/onboarding"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-warm px-8 py-4 text-base font-semibold text-primary-foreground shadow-warm transition-all hover:scale-[1.03] hover:shadow-glow-warm focus-ring"
        >
          Commencer gratuitement
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary/50 transition-all focus-ring"
        >
          Explorer le dashboard
        </Link>
      </div>

      {/* Honest beta framing */}
      <p className="mt-8 text-sm text-muted-foreground">
        🚀 <span className="text-foreground font-medium">Beta ouverte</span> — soyez parmi les premiers restaurants à l'utiliser
      </p>
    </div>
  </section>
);

/* 40. Footer with social links + newsletter */
const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-warm flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">T</span>
              </div>
              <span className="text-sm font-bold text-foreground">Tableo</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              Le Smart Restaurant OS qui transforme chaque table en moteur de revenus.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Produit</h4>
            <ul className="space-y-2.5">
              {["Fonctionnalités", "Tarifs", "Intégrations", "API"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Ressources</h4>
            <ul className="space-y-2.5">
              {["Blog", "Documentation", "Guides", "Webinaires"].map((l) => (
                <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs text-muted-foreground mb-3">Recevez nos conseils pour booster vos revenus.</p>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-secondary border border-border pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <button className="rounded-lg bg-gradient-warm px-3 py-2 text-xs font-semibold text-primary-foreground shrink-0 hover:opacity-90 transition-opacity">
                OK
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2026 Tableo. Tous droits réservés.</p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-foreground transition-colors">CGU</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { CTASection, Footer };
