/**
 * Client API Blyss — porté de blyss-mobile/lib/api.ts.
 * Utilisable côté serveur (endpoints publics, pas de CORS) et côté client
 * (auth Bearer + refresh 401). Aucun endpoint backend nouveau.
 */
import { BLYSS_API_URL } from './config';
import { blyssSession } from './session';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface PublicPro {
  id: number;
  first_name: string | null;
  last_name: string | null;
  activity_name: string | null;
  city: string | null;
  instagram_account: string | null;
  profile_photo: string | null;
  banner_photo: string | null;
  bio: string | null;
  acceptance_conditions: ConditionItem[] | string | null;
  pro_status: string;
  accept_online_payment: boolean;
  stripe_onboarding_complete: boolean;
  deposit_percentage: number;
  cancellation_notice_hours: number;
  address_visible?: boolean;
  address_line?: string | null;
  postal_code?: string | null;
  service_radius_km?: number | string | null;
  service_area_label?: string | null;
}

export interface ConditionItem {
  text: string;
  accepted: boolean;
}

export interface Prestation {
  id: number;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  active?: boolean;
}

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail: string;
  created_at: string;
}

export interface Review {
  id: number;
  pro_id: number;
  client_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface AvailabilityResponse {
  timezone: string;
  requested_duration_minutes: number;
  total_blocked_minutes: number;
  days: Array<{ date: string; slots: Array<{ start: string; end: string }> }>;
}

export interface SessionUser {
  id: number;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  role: 'client' | 'pro' | 'admin';
}

export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  birth_date: string;
  role: 'client';
  accepted_terms?: boolean;
}

export type NailStyle = string;

export interface OnboardingRecommendation {
  pro_id: number;
  name: string;
  city: string | null;
  profile_photo: string | null;
  banner_photo: string | null;
  rating: number;
  reviews_count: number;
  has_availability: boolean;
  matches_style: boolean;
  in_region: boolean;
  distance_km: number | null;
  open_slots: { today: number; this_week: number; this_weekend: number };
}

// ── Cœur : appel + refresh 401 ──────────────────────────────────────────────

let refreshInFlight: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  const refreshToken = blyssSession.getRefreshToken();
  if (!refreshToken) return false;
  refreshInFlight ??= (async () => {
    try {
      const res = await fetch(`${BLYSS_API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ refreshToken }),
      });
      const json = (await res.json().catch(() => null)) as {
        data?: { accessToken?: string; refreshToken?: string };
      } | null;
      const accessToken = json?.data?.accessToken;
      if (res.ok && accessToken) {
        blyssSession.setTokens(accessToken, json?.data?.refreshToken ?? refreshToken);
        return true;
      }
      blyssSession.clear();
      return false;
    } catch {
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

interface CallOpts {
  method?: string;
  body?: unknown;
  auth?: boolean;
  /** cache Next pour les GET serveur */
  revalidate?: number;
  _retried?: boolean;
}

export async function blyssCall<T = unknown>(
  endpoint: string,
  opts: CallOpts = {},
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, auth = true, revalidate, _retried = false } = opts;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = auth ? blyssSession.getAccessToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${BLYSS_API_URL}${endpoint}`, {
      method,
      headers,
      credentials: 'include',
      body: body === undefined ? undefined : JSON.stringify(body),
      ...(revalidate !== undefined ? { next: { revalidate } } : {}),
    });
  } catch {
    return { success: false, error: 'Erreur de connexion au serveur' };
  }

  if (res.status === 401 && auth && !_retried && blyssSession.getRefreshToken()) {
    if (await tryRefresh()) return blyssCall<T>(endpoint, { ...opts, _retried: true });
  }

  const json = (await res.json().catch(() => null)) as
    | (Record<string, unknown> & { success?: boolean; data?: T; message?: string; error?: string })
    | null;

  if (!res.ok || (json && json.success === false)) {
    return {
      success: false,
      error: (json?.message as string) ?? (json?.error as string) ?? `Erreur ${res.status}`,
    };
  }

  const hasDataKey = json != null && typeof json === 'object' && 'data' in json;
  return {
    success: true,
    data: hasDataKey ? (json!.data as T) : ((json as T) ?? undefined),
  };
}

// ── Endpoints publics (utilisables côté serveur) ────────────────────────────

export const blyssPublic = {
  getPro: (id: number | string, revalidate = 120) =>
    blyssCall<PublicPro>(`/api/users/pros/${id}`, { auth: false, revalidate }),

  getServices: (id: number | string, revalidate = 120) =>
    blyssCall<Prestation[]>(`/api/prestations/pro/${id}`, { auth: false, revalidate }),

  getGallery: (id: number | string, revalidate = 120) =>
    blyssCall<GalleryImage[]>(`/api/gallery/pro/${id}`, { auth: false, revalidate }),

  getReviews: (id: number | string, revalidate = 120) =>
    blyssCall<Review[]>(`/api/reviews/pro/${id}`, { auth: false, revalidate }),

  getAvailability: (params: {
    proId: number | string;
    serviceIds: number[];
    from: string;
    to: string;
  }) => {
    const q = new URLSearchParams({
      service_ids: params.serviceIds.join(','),
      from: params.from,
      to: params.to,
    });
    return blyssCall<AvailabilityResponse>(
      `/api/availability/${params.proId}?${q.toString()}`,
      { auth: false },
    );
  },
};

// ── Auth ────────────────────────────────────────────────────────────────────

export const blyssAuth = {
  login: (email: string, password: string) =>
    blyssCall<{ user: SessionUser; accessToken: string; refreshToken: string }>(
      '/api/auth/login',
      { method: 'POST', auth: false, body: { email, password } },
    ),

  signup: (data: SignupData) =>
    blyssCall<{ accessToken?: string; refreshToken?: string }>('/api/auth/signup', {
      method: 'POST',
      auth: false,
      body: data,
    }),

  me: () => blyssCall<SessionUser>('/api/auth/profile'),
};

// ── Réservation + paiement ──────────────────────────────────────────────────

export const blyssBooking = {
  createReservation: (data: {
    pro_id: number;
    prestation_id: number;
    start_datetime: string;
    end_datetime: string;
    price: number;
    payment_method: 'online' | 'on_site';
    early_execution_requested: boolean;
  }) =>
    blyssCall<{ id: number; deposit_percentage: number; deposit_amount: number | null; price: number }>(
      '/api/reservations',
      { method: 'POST', body: data },
    ),

  createPaymentIntent: (data: { reservation_id: number; type: 'deposit' | 'balance' | 'full' }) =>
    blyssCall<{ client_secret: string; payment_intent_id: string; amount: number }>(
      '/api/payments/create-intent',
      { method: 'POST', body: data },
    ),
};

// ── Onboarding client (#34) ─────────────────────────────────────────────────

export const blyssOnboarding = {
  setPreferences: (styles: NailStyle[], city?: string) =>
    blyssCall<{ styles: NailStyle[] }>('/api/client/onboarding/preferences', {
      method: 'POST',
      body: { styles, style_nails: styles[0], ...(city ? { city } : {}) },
    }),

  setAttribution: (source: string) =>
    blyssCall<void>('/api/client/onboarding/attribution', { method: 'POST', body: { source } }),

  getRecommendations: (city?: string) => {
    const q = new URLSearchParams();
    if (city) q.set('city', city);
    const qs = q.toString();
    return blyssCall<{
      style_nails: NailStyle | null;
      styles: NailStyle[];
      recommendations: OnboardingRecommendation[];
    }>(`/api/client/onboarding/recommendations${qs ? `?${qs}` : ''}`);
  },

  tapCta: () => blyssCall<void>('/api/client/onboarding/cta', { method: 'POST' }),
  complete: () => blyssCall<void>('/api/client/onboarding/complete', { method: 'POST' }),
  skip: () => blyssCall<void>('/api/client/onboarding/skip', { method: 'POST' }),
};

export const blyssFavorites = {
  add: (proId: number) =>
    blyssCall<void>('/api/favorites', { method: 'POST', body: { pro_id: proId } }),
  remove: (proId: number) =>
    blyssCall<void>(`/api/favorites/${proId}`, { method: 'DELETE' }),
};
