import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Edit3,
  Check,
  X,
  ExternalLink,
} from "lucide-react";
import {
  menuStore,
  formatPrice,
  parsePrice,
  type MenuData,
  type Category,
  type Dish,
} from "@/lib/menu-store";
import { QrCodeBlock } from "@/components/QrCodeBlock";

const MenuEditor = () => {
  const { slug: paramSlug } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuData | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const slug = paramSlug ?? menuStore.getActiveSlug();
    if (!slug) {
      navigate("/onboarding", { replace: true });
      return;
    }
    const data = menuStore.getMenu(slug);
    if (!data) {
      navigate("/onboarding", { replace: true });
      return;
    }
    setActiveSlug(slug);
    setMenu(data);
    menuStore.setActiveSlug(slug);
  }, [paramSlug, navigate]);

  const refresh = () => {
    if (!activeSlug) return;
    setMenu(menuStore.getMenu(activeSlug));
  };

  if (!menu || !activeSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  const publicUrl = `${window.location.origin}/r/${activeSlug}`;

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="w-px h-5 bg-border" />
            <div>
              <h1 className="text-sm font-semibold text-foreground">{menu.restaurant.name}</h1>
              <p className="text-xs text-muted-foreground">Éditeur de menu</p>
            </div>
          </div>
          <a
            href={publicUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-warm px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-all"
          >
            Voir le menu public
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {menu.categories.map((category, idx) => (
            <CategoryCard
              key={category.id}
              category={category}
              slug={activeSlug}
              isFirst={idx === 0}
              isLast={idx === menu.categories.length - 1}
              onChange={refresh}
            />
          ))}

          <AddCategoryBar slug={activeSlug} onAdded={refresh} />
        </div>

        <div className="space-y-4">
          <QrCodeBlock value={publicUrl} label={publicUrl} fileName={`tableo-${activeSlug}`} />
          <div className="rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-2">💡 Astuce</p>
            <p className="leading-relaxed">
              Imprime ce QR et pose-le sur tes tables. Chaque modification du menu est instantanée — pas besoin
              de réimprimer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Category Card
// ---------------------------------------------------------------------------

const CategoryCard = ({
  category,
  slug,
  isFirst,
  isLast,
  onChange,
}: {
  category: Category;
  slug: string;
  isFirst: boolean;
  isLast: boolean;
  onChange: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const saveName = () => {
    if (name.trim()) menuStore.updateCategory(slug, category.id, { name: name.trim() });
    setEditing(false);
    onChange();
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-3 p-4 bg-secondary/30 border-b border-border">
        {editing ? (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveName();
                if (e.key === "Escape") {
                  setName(category.name);
                  setEditing(false);
                }
              }}
              autoFocus
              className="flex-1 rounded-lg bg-background border border-border px-3 py-1.5 text-base font-semibold text-foreground focus:outline-none focus:border-primary/50"
            />
            <button onClick={saveName} className="rounded-lg p-1.5 text-primary hover:bg-primary/10" aria-label="Enregistrer">
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setName(category.name);
                setEditing(false);
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"
              aria-label="Annuler"
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <h2 className="flex-1 text-base font-semibold text-foreground">{category.name}</h2>
            <span className="text-xs text-muted-foreground">
              {category.dishes.length} plat{category.dishes.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => setEditing(true)}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary"
              aria-label="Renommer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={isFirst}
              onClick={() => {
                menuStore.moveCategory(slug, category.id, "up");
                onChange();
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Monter"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={isLast}
              onClick={() => {
                menuStore.moveCategory(slug, category.id, "down");
                onChange();
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Descendre"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (confirm(`Supprimer la catégorie "${category.name}" et tous ses plats ?`)) {
                  menuStore.deleteCategory(slug, category.id);
                  onChange();
                }
              }}
              className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Supprimer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>

      <div className="divide-y divide-border">
        {category.dishes.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Aucun plat. Ajoutez-en un ci-dessous.
          </p>
        )}
        {category.dishes.map((dish, idx) => (
          <DishRow
            key={dish.id}
            dish={dish}
            slug={slug}
            isFirst={idx === 0}
            isLast={idx === category.dishes.length - 1}
            onChange={onChange}
          />
        ))}
        <AddDishBar slug={slug} categoryId={category.id} onAdded={onChange} />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Dish Row
// ---------------------------------------------------------------------------

const DishRow = ({
  dish,
  slug,
  isFirst,
  isLast,
  onChange,
}: {
  dish: Dish;
  slug: string;
  isFirst: boolean;
  isLast: boolean;
  onChange: () => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(dish.name);
  const [description, setDescription] = useState(dish.description);
  const [priceStr, setPriceStr] = useState(formatPrice(dish.price, dish.currency));

  const save = () => {
    const price = parsePrice(priceStr);
    if (!name.trim() || price === null) return;
    menuStore.updateDish(slug, dish.id, { name: name.trim(), description: description.trim(), price });
    setEditing(false);
    onChange();
  };

  if (editing) {
    return (
      <div className="p-4 bg-secondary/20 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du plat"
          autoFocus
          className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optionnelle)"
          rows={2}
          className="w-full rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
        />
        <div className="flex gap-2">
          <input
            value={priceStr}
            onChange={(e) => setPriceStr(e.target.value)}
            placeholder="12,50 €"
            className="flex-1 rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
          />
          <button
            onClick={save}
            className="rounded-lg bg-gradient-warm px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Enregistrer
          </button>
          <button
            onClick={() => {
              setName(dish.name);
              setDescription(dish.description);
              setPriceStr(formatPrice(dish.price, dish.currency));
              setEditing(false);
            }}
            className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary/50"
          >
            Annuler
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 p-4 group hover:bg-secondary/20 transition-colors ${!dish.is_available ? "opacity-50" : ""}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground truncate">{dish.name}</h3>
          {!dish.is_available && (
            <span className="text-[10px] bg-muted/40 text-muted-foreground rounded px-1.5 py-0.5 font-medium uppercase tracking-wider">
              Épuisé
            </span>
          )}
        </div>
        {dish.description && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{dish.description}</p>
        )}
      </div>
      <span className="text-sm font-bold text-gradient-warm tabular-nums shrink-0">
        {formatPrice(dish.price, dish.currency)}
      </span>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => {
            menuStore.updateDish(slug, dish.id, { is_available: !dish.is_available });
            onChange();
          }}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary"
          aria-label={dish.is_available ? "Marquer épuisé" : "Rétablir"}
          title={dish.is_available ? "Masquer (épuisé)" : "Rétablir"}
        >
          {dish.is_available ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary"
          aria-label="Modifier"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
        <button
          disabled={isFirst}
          onClick={() => {
            menuStore.moveDish(slug, dish.id, "up");
            onChange();
          }}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30"
          aria-label="Monter"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          disabled={isLast}
          onClick={() => {
            menuStore.moveDish(slug, dish.id, "down");
            onChange();
          }}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30"
          aria-label="Descendre"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            if (confirm(`Supprimer "${dish.name}" ?`)) {
              menuStore.deleteDish(slug, dish.id);
              onChange();
            }
          }}
          className="rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          aria-label="Supprimer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Add bars
// ---------------------------------------------------------------------------

const AddCategoryBar = ({ slug, onAdded }: { slug: string; onAdded: () => void }) => {
  const [name, setName] = useState("");
  const submit = () => {
    if (!name.trim()) return;
    menuStore.addCategory(slug, name.trim());
    setName("");
    onAdded();
  };
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/30 p-4 flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Nouvelle catégorie (ex: Boissons, Vins...)"
        className="flex-1 rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
      />
      <button
        onClick={submit}
        disabled={!name.trim()}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-warm px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus className="w-3.5 h-3.5" />
        Ajouter
      </button>
    </div>
  );
};

const AddDishBar = ({
  slug,
  categoryId,
  onAdded,
}: {
  slug: string;
  categoryId: string;
  onAdded: () => void;
}) => {
  const [name, setName] = useState("");
  const [priceStr, setPriceStr] = useState("");

  const submit = () => {
    const price = parsePrice(priceStr);
    if (!name.trim() || price === null) return;
    menuStore.addDish(slug, categoryId, { name: name.trim(), price });
    setName("");
    setPriceStr("");
    onAdded();
  };

  return (
    <div className="p-3 bg-secondary/10 flex gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Nouveau plat"
        className="flex-1 rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
      />
      <input
        value={priceStr}
        onChange={(e) => setPriceStr(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Prix"
        className="w-24 rounded-lg bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
      />
      <button
        onClick={submit}
        disabled={!name.trim() || parsePrice(priceStr) === null}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Plus className="w-3.5 h-3.5" />
        Ajouter
      </button>
    </div>
  );
};

export default MenuEditor;
