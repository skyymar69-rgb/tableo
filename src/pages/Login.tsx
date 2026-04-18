import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase";

type Mode = "password" | "magic";

const Login = () => {
  const { signIn, signInWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError("Supabase n'est pas encore configuré. Ajoutez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setError(null);
    setLoading(true);

    if (mode === "password") {
      const { error: err } = await signIn(email, password);
      setLoading(false);
      if (err) {
        setError(err.message);
        return;
      }
      navigate(nextPath, { replace: true });
    } else {
      const { error: err } = await signInWithMagicLink(email);
      setLoading(false);
      if (err) {
        setError(err.message);
        return;
      }
      setMagicSent(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background noise-overlay p-6">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-warm flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
            <span className="text-base font-bold text-primary-foreground">T</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">Tableo</span>
        </Link>

        <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-8 shadow-card">
          <h1 className="text-2xl font-bold text-foreground mb-2">Content de te revoir</h1>
          <p className="text-sm text-muted-foreground mb-6">Connecte-toi à ton compte Tableo.</p>

          {magicSent ? (
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">Lien magique envoyé</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Un email vient d'être envoyé à <strong>{email}</strong>. Clique sur le lien pour te connecter.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="inline-flex rounded-lg bg-secondary p-1 w-full">
                <button
                  type="button"
                  onClick={() => setMode("password")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    mode === "password" ? "bg-gradient-warm text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Mot de passe
                </button>
                <button
                  type="button"
                  onClick={() => setMode("magic")}
                  className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    mode === "magic" ? "bg-gradient-warm text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Lien magique
                </button>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-foreground mb-1.5 block">Email</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-secondary border border-border pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="vous@restaurant.fr"
                  />
                </div>
              </label>

              {mode === "password" && (
                <label className="block">
                  <span className="text-xs font-medium text-foreground mb-1.5 block">Mot de passe</span>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      autoComplete="current-password"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg bg-secondary border border-border pl-10 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </label>
              )}

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-warm px-4 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-all hover:scale-[1.01] hover:shadow-glow-warm focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : mode === "password" ? "Se connecter" : "Envoyer le lien"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Créer un compte gratuit
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          En continuant, vous acceptez les CGU et la Politique de confidentialité de Tableo.
        </p>
      </div>
    </div>
  );
};

export default Login;
