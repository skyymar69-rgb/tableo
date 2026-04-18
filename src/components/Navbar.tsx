import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const { user, signOut } = useAuth();

  // 9. Scroll-based blur intensification
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Revenue Engine", href: "#revenue" },
    { label: "Tarifs", href: "#pricing" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "glass border-b border-border/40 shadow-card"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* 11. Logo hover animation */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-warm flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <span className="text-sm font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-gradient-warm">Tableo</span>
        </Link>

        {/* 10. Active link with dot indicator */}
        {isLanding && (
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group py-1"
              >
                {l.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-lg px-3 py-1.5">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-all focus-ring"
                aria-label="Déconnexion"
              >
                <LogOut className="w-3.5 h-3.5" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-lg px-3 py-1.5">
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-warm px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:scale-[1.02] focus-ring"
              >
                Commencer gratuitement
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground focus-ring rounded-lg p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 12. Smooth mobile menu animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
        open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="border-t border-border/40 glass px-6 py-4 space-y-3">
          {isLanding && links.map((l) => (
            <a key={l.href} href={l.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <button
                onClick={() => { setOpen(false); signOut(); }}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpen(false)}>
                Se connecter
              </Link>
              <Link to="/signup" className="block rounded-lg bg-gradient-warm px-4 py-2.5 text-sm font-semibold text-primary-foreground text-center" onClick={() => setOpen(false)}>
                Commencer gratuitement
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
