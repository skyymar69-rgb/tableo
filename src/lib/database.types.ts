/**
 * Database types — hand-written for now, matching supabase/migrations.
 * Later: regenerate with `supabase gen types typescript`.
 */

export type Profile = {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
};

export type RestaurantPlan = "starter" | "pro" | "business";
export type MemberRole = "owner" | "admin" | "manager" | "staff";

export type Restaurant = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  country_code: string;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  cover_url: string | null;
  currency: string;
  timezone: string;
  default_locale: string;
  enabled_locales: string[];
  theme: Record<string, unknown>;
  is_published: boolean;
  plan: RestaurantPlan;
  owner_id: string;
  created_at: string;
  updated_at: string;
};

export type RestaurantMember = {
  id: string;
  restaurant_id: string;
  user_id: string;
  role: MemberRole;
  invited_by: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string; email: string };
        Update: Partial<Profile>;
      };
      restaurants: {
        Row: Restaurant;
        Insert: Partial<Restaurant> & {
          slug: string;
          name: string;
          owner_id: string;
        };
        Update: Partial<Restaurant>;
      };
      restaurant_members: {
        Row: RestaurantMember;
        Insert: Partial<RestaurantMember> & {
          restaurant_id: string;
          user_id: string;
        };
        Update: Partial<RestaurantMember>;
      };
    };
  };
};
