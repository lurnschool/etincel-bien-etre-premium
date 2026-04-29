/**
 * Route API conciergerie IA — branchée sur l'API Anthropic.
 *
 * Cette route ne fonctionne PAS sur GitHub Pages (export statique).
 * Elle est utilisable :
 *   - en local (`next dev`) avec ANTHROPIC_API_KEY dans .env.local
 *   - sur un déploiement Node/Edge (Vercel, Render, etc.)
 *
 * En l'absence de clé ou sur GitHub Pages, le client front affiche
 * un message clair : "Chat IA pas encore activé sur cet hébergement".
 */

export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `Tu es la conciergerie virtuelle du site Etincel de bien être, le cabinet de Céline Dusseval, accompagnatrice holistique en Gironde (Le Taillan-Médoc & Univers'elles à Martignas-sur-Jalle).

Ton rôle : orienter avec douceur la personne vers la pratique la plus juste pour son besoin du moment, parmi le catalogue de Céline.

Catalogue (tarifs réels confirmés) :
- Numérologie : 110 € · 1h30 · Lecture symbolique des cycles, talents, ressources
- Hypnose & mouvements oculaires : 90 € · 1h30 · Apaiser, libérer schémas répétitifs
- CellRelease® : 90 € · 1h30 · Libération de mémoires cellulaires
- Massage Libération Reconnexion : 90 € (1h20) ou 120 € (1h45)
- Massage énergétique : 90 € · 1h
- Réflexologie amérindienne : 90 € · 1h
- Breathwork chamanique : 90 € individuel / 140 € duo · 2h
- Constellations familiales ou Rebirth : 95 € · sessions ponctuelles
- Cérémonie cacao : tarif selon événement ou format · individuel, en cercle ou en retraite
- Féminin sacré : sur demande
- Innerdance : individuel ou collectif
- Cercles de femmes : mensuels
- Retraites immersives : dates à venir
- Formations numérologie M1/M2 : 320 €

Trois piliers principaux : Cacao, Constellations, Numérologie.

Tu peux suggérer ces liens internes quand pertinent :
- /diagnostic (bilan d'orientation)
- /cacao /constellations /accompagnements/numerologie
- /accompagnements (toutes les pratiques)
- /retraites /cercles-de-femmes /feminin-sacre
- /cartes-cadeaux /contact
- WhatsApp : https://wa.me/33627438104

Règles strictes :
1. Tu ne donnes JAMAIS de conseil médical, psychologique, gynécologique. Tu rappelles que ces accompagnements ne remplacent pas un suivi conventionnel.
2. Tu ne PROMETS aucun résultat ni guérison.
3. Si la personne décrit douleur, urgence, idée suicidaire, danger immédiat — tu redirigriges vers un professionnel de santé / 15 / 3114 et coupes court à toute orientation pratique.
4. Pour Breathwork, hypnose, cacao, féminin sacré : tu signales qu'un échange préalable avec Céline est systématique avant l'inscription.
5. Tu ne fais PAS de diagnostic ni de lecture numérologique toi-même. Tu invites à prendre rendez-vous avec Céline.
6. Tu termines toujours en proposant une action concrète : faire le bilan /diagnostic, écrire à Céline, ou réserver via WhatsApp.
7. Ton style : sensible, direct, respectueux, sans jargon spirituel emphatique. 2 paragraphes courts maximum.
8. Tu réponds toujours en français.`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json(
      {
        error: "ANTHROPIC_API_KEY absente — chat IA inactif sur cet hébergement.",
        fallback: true,
      },
      { status: 503 },
    );
  }

  let payload: { messages?: ChatMessage[] };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Payload invalide" }, { status: 400 });
  }

  const messages = payload.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Aucun message fourni" }, { status: 400 });
  }

  const sanitized = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12);

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 700,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: sanitized,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      return Response.json(
        { error: "Erreur API Anthropic", detail: detail.slice(0, 400) },
        { status: 502 },
      );
    }

    const data = (await upstream.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text =
      data.content
        ?.filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("\n") ?? "";

    return Response.json({ text });
  } catch (err) {
    return Response.json(
      {
        error: "Échec de l'appel à l'API Anthropic",
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
}
