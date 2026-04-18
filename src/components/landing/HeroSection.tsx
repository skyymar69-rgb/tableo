import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImg from "@/assets/tableo-hero.jpg";

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="group cursor-default">
    <div className="text-2xl md:text-3xl font-bold text-gradient-warm transition-transform duration-300 group-hover:scale-110">{value}</div>
    <div className="text-xs text-muted-foreground mt-1 group-hover:text-foreground/70 transition-colors">{label}</div>
  </div>
);

const HeroSection = () => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 noise-overlay">
      <div className="absolute inset-0 bg-hero-glow" />

      <div className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-accent/30 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute top-2/3 right-[10%] w-2 h-2 rounded-full bg-accent/20 animate-float" style={{ animationDelay: '1s' }} />

      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/8 via-accent/5 to-transparent blur-[140px] animate-pulse-slow" />

      <div className="container relative mx-auto px-6 py-20 text-center" style={{ zIndex: 2 }}>
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full glass-warm px-4 py-1.5 mb-8 hover:border-primary/30 transition-colors cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-muted-foreground">Smart Restaurant OS · IA, commande, paiement</span>
          <span className="text-xs text-primary font-semibold">→ Beta ouverte</span>
        </div>

        <h1 className="animate-fade-up-d1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-5xl mx-auto">
          Le QR qui transforme vos tables en{" "}
          <span className="text-gradient-warm font-serif italic font-normal">moteur de revenus</span>
        </h1>

        <p className="animate-fade-up-d2 mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Menu IA, commande à table, paiement mobile, CRM et analytics — dans une plateforme unique. Démarrez gratuitement, passez Pro dès 19€/mois — 2× moins cher que NordQR.
        </p>

        <div className="animate-fade-up-d3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-warm px-8 py-4 text-base font-semibold text-primary-foreground shadow-warm transition-all hover:scale-[1.03] hover:shadow-glow-warm focus-ring"
          >
            Commencer gratuitement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-medium text-foreground hover:bg-secondary/50 transition-all focus-ring group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-warm-subtle flex items-center justify-center group-hover:bg-gradient-warm transition-all duration-300">
              <Play className="w-3.5 h-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            Voir un menu réel
          </button>
        </div>

        <div className="animate-fade-up-d4 mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <StatCard value="19€" label="Pro / mois" />
          <StatCard value="< 5 min" label="pour être en ligne" />
          <StatCard value="12+" label="langues IA" />
          <StatCard value="0.5%" label="frais de transaction" />
        </div>

        <div className="animate-fade-up-d5 mt-12 flex items-center justify-center gap-6 text-xs text-muted-foreground/60">
          <span className="flex items-center gap-1.5">🔒 RGPD</span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5">🇫🇷 Hébergé en France</span>
          <span className="w-px h-3 bg-border" />
          <span className="flex items-center gap-1.5">💳 Sans carte pour commencer</span>
        </div>

        <div className="animate-fade-up-d6 mt-12 relative mx-auto max-w-5xl">
          <div className="absolute -inset-4 rounded-2xl bg-gradient-warm-subtle blur-xl" />
          <div className="relative rounded-2xl border border-border overflow-hidden shadow-card">
            {!imgLoaded && (
              <div className="w-full aspect-video bg-secondary animate-pulse rounded-2xl" />
            )}
            <img
              src={heroImg}
              alt="Tableo dashboard analytics et menu mobile"
              width={1920}
              height={1080}
              className={`w-full h-auto transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
