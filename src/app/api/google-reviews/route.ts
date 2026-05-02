/**
 * Route API Google Reviews — récupère les avis Google Places réels.
 *
 * Utilise l'API officielle Google Places (Place Details) pour fetcher
 * les 5 derniers avis publiés sur la fiche Google Business de Céline.
 *
 * Variables d'environnement requises (à poser sur Vercel) :
 *   - GOOGLE_PLACES_API_KEY : clé API Google Cloud (Places API activée)
 *     https://console.cloud.google.com/google/maps-apis/credentials
 *   - GOOGLE_PLACE_ID : Place ID de la fiche Google Business
 *     https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Sans ces variables → 503 + fallback : le composant LiveGoogleReviews
 * affiche les 3 témoignages réels confirmés (Patrick T., Ludovic M.,
 * Sandrine S.) sans simuler de contenu inventé.
 *
 * Cache : revalidate 24h pour économiser les requêtes API
 * (Google facture ~17$ / 1000 requêtes Place Details).
 */

export const dynamic = "force-dynamic";
export const revalidate = 86400; // 24h

type GoogleReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  profile_photo_url?: string;
};

type GooglePlaceDetailsResponse = {
  result?: {
    name?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: GoogleReview[];
    url?: string;
  };
  status: string;
  error_message?: string;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return Response.json(
      {
        error: "google_places_not_configured",
        message:
          "GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID absent. Le composant front bascule sur les témoignages statiques.",
      },
      { status: 503 },
    );
  }

  const fields = ["name", "rating", "user_ratings_total", "reviews", "url"].join(
    ",",
  );
  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", fields);
  url.searchParams.set("language", "fr");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      return Response.json(
        { error: "upstream_error", status: response.status },
        { status: 502 },
      );
    }

    const data = (await response.json()) as GooglePlaceDetailsResponse;

    if (data.status !== "OK" || !data.result) {
      return Response.json(
        {
          error: "google_api_error",
          googleStatus: data.status,
          message: data.error_message,
        },
        { status: 502 },
      );
    }

    const result = data.result;
    return Response.json(
      {
        rating: result.rating ?? null,
        totalRatings: result.user_ratings_total ?? null,
        url: result.url ?? null,
        reviews: (result.reviews ?? []).slice(0, 5).map((r) => ({
          authorName: r.author_name,
          rating: r.rating,
          relativeTime: r.relative_time_description,
          text: r.text,
          profilePhotoUrl: r.profile_photo_url,
        })),
      },
      {
        status: 200,
        headers: { "cache-control": "public, max-age=0, s-maxage=86400" },
      },
    );
  } catch (err) {
    return Response.json(
      {
        error: "fetch_failed",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
