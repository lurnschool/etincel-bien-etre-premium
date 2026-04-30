/**
 * Bilan d'orientation Etincel — refonte vers 3 axes structurants.
 *
 * À partir des 8 réponses du diagnostic, on identifie l'axe principal
 * (Mémoires & constellations · Féminin & cacao · Corps & intégration)
 * qui résonne avec le moment de vie de la personne, plus un axe
 * secondaire éventuel.
 *
 * Le résultat ne propose plus une « pratique » isolée mais :
 *  - un AXE principal recommandé
 *  - un éventuel axe secondaire
 *  - les outils que Céline pourrait mobiliser au service de cet axe
 *  - un parcours 3 mois suggéré (Reflet/Boussole/Métamorphose)
 *  - un mot personnalisé de Céline
 */

import { accompagnementsIndividuels, type Practice } from "./data";
import { parcours, type Parcours } from "./parcours";

export type BilanAnswers = Record<string, string[]>;

export type AxeId = "memoires" | "feminin" | "corps";

export type BilanAxe = {
  id: AxeId;
  name: string;
  catchphrase: string;
  href: string;
  shortDescription: string;
  longDescription: string;
};

export type BilanParcoursStep = {
  month: number;
  label: string;
  intention: string;
  practices: { name: string; href?: string; price?: string }[];
};

export type BilanContent = {
  axePrincipal: BilanAxe;
  axeSecondaire: BilanAxe | null;
  reasonAxePrincipal: string;
  whatsAtPlay: string[];
  toolsMobilized: { name: string; reason: string; href?: string }[];
  parcours3Months: BilanParcoursStep[];
  recommendedParcours: { parcours: Parcours; reason: string };
  couldFeel: string[];
  celineMessage: string;
  suggestRetreat: boolean;
  suggestCollective: boolean;
  cercleSuggestion: string;
};

const axes: Record<AxeId, BilanAxe> = {
  memoires: {
    id: "memoires",
    name: "Mémoires & constellations",
    catchphrase: "Libérer les mémoires qui ne vous appartiennent plus.",
    href: "/memoires-constellations",
    shortDescription:
      "Mettre en lumière les loyautés, les répétitions et les dynamiques familiales invisibles qui traversent votre histoire.",
    longDescription:
      "Quelque chose, derrière vous, demande à être vu. Une dynamique familiale qui se rejoue, une loyauté ancienne, une mémoire transmise sans mots. Les constellations familiales et le travail transgénérationnel ne soignent pas par la parole : ils mettent en lumière. Et ce qui est vu, souvent, se dénoue tout seul. C'est l'axe le plus puissant pour les périodes où vous sentez qu'un schéma vous échappe malgré tous vos efforts conscients.",
  },
  feminin: {
    id: "feminin",
    name: "Féminin & cacao",
    catchphrase: "Revenir au corps, au cœur et au féminin.",
    href: "/feminin-cacao",
    shortDescription:
      "Cérémonies cacao, cercles de femmes, accompagnement symbolique du féminin sacré, des cycles et de l'intuition.",
    longDescription:
      "Vous sentez quelque chose de très ancien et très neuf qui vous appelle. Le féminin n'est pas un concept à comprendre : c'est une présence à retrouver dans votre corps, votre rythme, votre intuition. Cérémonies cacao, cercles de femmes, accompagnement symbolique de l'utérus et des cycles — Céline tient un cadre où votre singularité féminine peut respirer. Le massage, l'hypnose, le soin énergétique peuvent y être mobilisés quand le retour au corps appelle.",
  },
  corps: {
    id: "corps",
    name: "Corps & intégration",
    catchphrase: "Intégrer par le corps ce que les mots ne suffisent pas à transformer.",
    href: "/corps-integration",
    shortDescription:
      "Innerdance, breathwork chamanique, retraites immersives — le souffle, le mouvement et l'expérience intérieure pour ancrer la transformation.",
    longDescription:
      "Comprendre ne suffit pas toujours. Certaines transformations demandent à être traversées par le souffle, le mouvement, le corps et l'expérience intérieure. C'est l'axe à privilégier après une constellation, après un travail sur le féminin, ou quand une transition de vie demande plus qu'une analyse. Innerdance, breathwork chamanique, retraites immersives — votre corps devient le lieu où le changement s'inscrit vraiment.",
  },
};

/**
 * Mapping question/réponse → poids vers chaque axe.
 * Chaque tag pondère un ou plusieurs axes (1-3 points).
 */
const SCORE_MAP: Record<string, Record<string, Partial<Record<AxeId, number>>>> = {
  ressenti: {
    fatigue: { feminin: 2, corps: 1 },
    blocage: { memoires: 2, corps: 1 },
    clarte: { memoires: 1, feminin: 1, corps: 1 },
    transition: { memoires: 1, corps: 2 },
    corps: { corps: 3 },
    feminin: { feminin: 3 },
    coeur: { feminin: 3 },
    transmission: { memoires: 3 },
  },
  contexte: {
    transition: { memoires: 1, corps: 2 },
    epuisement: { feminin: 2, corps: 1 },
    quete: { memoires: 2, feminin: 1 },
    stable: { memoires: 1, corps: 1 },
    explorer: { feminin: 1, corps: 1 },
  },
  attire: {
    respiration: { corps: 3 },
    massage: { feminin: 2, corps: 1 },
    numerologie: { memoires: 2 },
    hypnose: { memoires: 2, corps: 1 },
    innerdance: { corps: 3 },
    cercle: { feminin: 3 },
    cacao: { feminin: 3 },
    retraite: { corps: 2, feminin: 1 },
    constellations: { memoires: 3 },
  },
  objectif: {
    apaiser: { feminin: 1, corps: 1 },
    comprendre: { memoires: 2 },
    transformer: { memoires: 1, corps: 2 },
    habiter: { corps: 2, feminin: 1 },
    accompagner: { memoires: 1, feminin: 1 },
    ressourcer: { corps: 1, feminin: 1 },
  },
  frequence: {
    immersion: { corps: 2, feminin: 1 },
    intensif: { corps: 1, memoires: 1 },
    mensuel: { feminin: 1, memoires: 1 },
  },
  format: {
    collectif: { feminin: 2, corps: 1 },
    individuel: { memoires: 1, feminin: 1 },
  },
};

function scoreAxes(answers: BilanAnswers): Record<AxeId, number> {
  const scores: Record<AxeId, number> = { memoires: 0, feminin: 0, corps: 0 };
  Object.entries(answers).forEach(([qId, values]) => {
    const map = SCORE_MAP[qId];
    if (!map) return;
    values.forEach((v) => {
      const weights = map[v];
      if (!weights) return;
      (Object.keys(weights) as AxeId[]).forEach((axe) => {
        scores[axe] += weights[axe] ?? 0;
      });
    });
  });
  return scores;
}

function whatsAtPlayParagraphs(answers: BilanAnswers, axePrincipal: BilanAxe): string[] {
  const out: string[] = [];
  const ressenti = answers.ressenti ?? [];
  const contexte = answers.contexte?.[0];

  // Paragraphe 1 — ressenti dominant
  if (ressenti.includes("transmission")) {
    out.push(
      "Vous percevez qu'une histoire familiale pèse encore — peut-être une transmission silencieuse, une loyauté invisible, ou simplement la sensation que quelque chose se rejoue par-dessus votre tête. Cette intuition est précieuse : c'est exactement le territoire où le travail symbolique et systémique opère.",
    );
  } else if (ressenti.includes("blocage")) {
    out.push(
      "Vous sentez qu'un schéma se rejoue malgré vous — une situation qui revient, une réaction qui vous échappe, une part de vous qui freine alors que tout le reste avance. Ce n'est pas un manque de volonté ; c'est une mémoire du système qui demande à être vue.",
    );
  } else if (ressenti.includes("feminin")) {
    out.push(
      "Quelque chose d'ancien et de neuf vous appelle autour du féminin. Pas une idée à intellectualiser : une présence à retrouver dans votre corps, vos cycles, votre intuition. C'est souvent dans des espaces tenus comme un cercle ou une cérémonie cacao que ce mouvement peut vraiment se déployer.",
    );
  } else if (ressenti.includes("corps")) {
    out.push(
      "Vous nommez le besoin de revenir à votre corps. Ce n'est pas anodin : beaucoup de personnes le savent intellectuellement, peu osent le poser comme priorité. Le corps est votre première intelligence — c'est par lui que les transformations s'inscrivent durablement.",
    );
  } else if (ressenti.includes("coeur")) {
    out.push(
      "Quelque chose autour du cœur appelle. Pas le sentimental — une ouverture plus profonde, un besoin de présence à vous-même que les mots ne disent pas tout à fait. C'est précisément ce que les rituels cacao et les cercles tenus offrent : un espace pour que ce mouvement émerge.",
    );
  } else if (ressenti.includes("transition")) {
    out.push(
      "Vous traversez un passage — séparation, parentalité, perte, virage professionnel, ou simplement la fin d'une étape qui vous habitait depuis longtemps. Les transitions ne se font pas seules dans la durée : elles demandent un cadre tenu, un témoin, une matière où déposer.",
    );
  } else {
    out.push(
      "Vous avez décidé de vous écouter, là, maintenant. Ce premier pas vaut beaucoup — la plupart des personnes mettent des années avant d'oser s'arrêter pour faire ce bilan.",
    );
  }

  // Paragraphe 2 — contexte
  if (contexte === "transition") {
    out.push(
      "Le contexte que vous décrivez — une transition forte — demande un accompagnement structuré. Pas une séance de découverte au hasard. Un vrai cadre où Céline tient le fil pendant que vous traversez.",
    );
  } else if (contexte === "epuisement") {
    out.push(
      "L'épuisement progressif que vous décrivez n'est pas qu'une fatigue : c'est un signal. Le corps demande à être pris au sérieux avant que ça aille plus loin. Le travail commence là — relâcher, libérer, retrouver des appuis avant toute analyse.",
    );
  } else if (contexte === "quete") {
    out.push(
      "Cette quête de sens que vous portez n'est pas un luxe. C'est ce que toutes les périodes de pivot demandent — comprendre avant d'agir, lire la carte avant de redessiner la route.",
    );
  } else if (contexte === "stable") {
    out.push(
      "Vous arrivez avec une base stable — c'est précieux. Le travail peut alors aller plus profond, plus vite, sans que vous ayez à gérer une crise en parallèle. C'est souvent le meilleur moment pour s'engager.",
    );
  } else if (contexte === "explorer") {
    out.push(
      "Votre curiosité est elle-même une porte. Pas besoin d'avoir un \"problème\" pour explorer — beaucoup de personnes que Céline accompagne arrivent simplement parce qu'elles ont envie de voir.",
    );
  }

  // Paragraphe 3 — l'axe identifié
  out.push(axePrincipal.longDescription);

  return out;
}

function toolsMobilizedFor(axe: AxeId, answers: BilanAnswers): { name: string; reason: string; href?: string }[] {
  const ressenti = answers.ressenti ?? [];
  const attire = answers.attire ?? [];

  if (axe === "memoires") {
    const tools = [
      {
        name: "Constellation familiale",
        reason: "Le cœur du travail — mettre en lumière les liens systémiques.",
        href: "/constellations",
      },
      {
        name: "Hypnose transgénérationnelle",
        reason: "Si une mémoire ancienne demande à être traversée en douceur.",
        href: "/accompagnements/hypnose",
      },
      {
        name: "CellRelease®",
        reason: "Pour libérer les mémoires inscrites dans le corps.",
        href: "/accompagnements/cellrelease",
      },
    ];
    if (attire.includes("numerologie")) {
      tools.push({
        name: "Numérologie",
        reason: "Pour lire la lignée et les cycles inscrits dans votre date.",
        href: "/accompagnements/numerologie",
      });
    }
    return tools;
  }

  if (axe === "feminin") {
    const tools = [
      {
        name: "Cérémonie cacao",
        reason: "Espace symbolique de présence et d'ouverture du cœur.",
        href: "/cacao",
      },
      {
        name: "Cercle de femmes",
        reason: "Sororité tenue, parole confidentielle, ancrage mensuel.",
        href: "/cercles-de-femmes",
      },
      {
        name: "Accompagnement féminin sacré",
        reason: "Reconnexion symbolique au corps, aux cycles et à l'utérus.",
        href: "/feminin-sacre",
      },
    ];
    if (ressenti.includes("corps") || ressenti.includes("fatigue")) {
      tools.push({
        name: "Massage Libération Reconnexion",
        reason: "Quand le retour au corps demande un toucher tenu et profond.",
        href: "/accompagnements/massage-liberation-reconnexion",
      });
    }
    return tools;
  }

  // corps
  const tools = [
    {
      name: "Innerdance",
      reason: "Immersion sonore et somatique pour laisser émerger.",
      href: "/innerdance",
    },
    {
      name: "Breathwork chamanique",
      reason: "Le souffle comme passage — intense et profondément libérateur.",
      href: "/accompagnements/breathwork",
    },
    {
      name: "Retraites immersives",
      reason: "Le format où le travail corporel trouve son plein déploiement.",
      href: "/retraites",
    },
  ];
  if (attire.includes("massage")) {
    tools.push({
      name: "Massage énergétique",
      reason: "Pour préparer le terrain corporel avant le travail intense.",
      href: "/accompagnements/massage-energetique",
    });
  }
  return tools;
}

function parcours3MonthsFor(axe: AxeId, frequence?: string): BilanParcoursStep[] {
  const wantsImmersion = frequence === "immersion";

  if (axe === "memoires") {
    return [
      {
        month: 1,
        label: "Voir",
        intention: "Une première constellation pour mettre la lumière sur ce qui se rejoue.",
        practices: [
          { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
        ],
      },
      {
        month: 2,
        label: "Décanter",
        intention: "Laisser les mouvements se poser, soutenu par un soin corporel ou hypnotique.",
        practices: [
          { name: "CellRelease®", price: "90 €", href: "/reserver/cellrelease" },
          { name: "Hypnose & mouvements oculaires", price: "90 €", href: "/reserver/hypnose" },
        ],
      },
      {
        month: 3,
        label: "Ancrer",
        intention: wantsImmersion
          ? "Retraite week-end pour ancrer le travail systémique dans le corps."
          : "Constellation Rebirth pour clore le cycle, ou cercle d'intégration.",
        practices: wantsImmersion
          ? [{ name: "Retraite week-end", price: "490 € à 780 €", href: "/retraites" }]
          : [
              { name: "Constellation Rebirth", price: "95 €", href: "/reserver/constellation-naissance-rebirth" },
              { name: "Cercle de femmes", href: "/cercles-de-femmes" },
            ],
      },
    ];
  }

  if (axe === "feminin") {
    return [
      {
        month: 1,
        label: "Revenir",
        intention: "Cérémonie cacao et accompagnement individuel autour du féminin.",
        practices: [
          { name: "Cérémonie cacao", href: "/cacao" },
          { name: "Accompagnement féminin sacré", href: "/feminin-sacre" },
        ],
      },
      {
        month: 2,
        label: "Honorer",
        intention: "Cercle de femmes mensuel + soin de reconnexion au corps.",
        practices: [
          { name: "Cercle de femmes", href: "/cercles-de-femmes" },
          { name: "Massage Libération Reconnexion", price: "90 € (1h20)", href: "/reserver/massage-liberation-reconnexion" },
        ],
      },
      {
        month: 3,
        label: "Ancrer",
        intention: wantsImmersion
          ? "Retraite féminine pour vivre une véritable immersion."
          : "Constellation Rebirth pour explorer ce qui s'est joué à l'origine, ou breathwork pour intégrer.",
        practices: wantsImmersion
          ? [{ name: "Retraite immersive", price: "490 € à 1 890 €", href: "/retraites" }]
          : [
              { name: "Constellation Rebirth", price: "95 €", href: "/reserver/constellation-naissance-rebirth" },
              { name: "Breathwork chamanique", price: "90 €", href: "/reserver/breathwork" },
            ],
      },
    ];
  }

  // corps
  return [
    {
      month: 1,
      label: "Habiter",
      intention: "Reprendre contact avec le corps par le toucher et le souffle.",
      practices: [
        { name: "Massage énergétique", price: "90 €", href: "/reserver/massage-energetique" },
        { name: "Réflexologie amérindienne", price: "90 €", href: "/reserver/reflexologie" },
      ],
    },
    {
      month: 2,
      label: "Mobiliser",
      intention: "Le corps suffisamment habité, le souffle peut prendre le relais.",
      practices: [
        { name: "Breathwork chamanique", price: "90 €", href: "/reserver/breathwork" },
        { name: "Innerdance", href: "/innerdance" },
      ],
    },
    {
      month: 3,
      label: wantsImmersion ? "Immersion" : "Intégrer",
      intention: wantsImmersion
        ? "Retraite immersive — le format où votre élan trouvera sa pleine expression."
        : "Constellation pour relier le corps au transgénérationnel, ou cercle de clôture.",
      practices: wantsImmersion
        ? [{ name: "Retraite immersive", price: "490 € à 1 890 €", href: "/retraites" }]
        : [
            { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
            { name: "Cercle de femmes", href: "/cercles-de-femmes" },
          ],
    },
  ];
}

function couldFeelFor(axe: AxeId): string[] {
  switch (axe) {
    case "memoires":
      return [
        "Le sentiment qu'un poids ancien s'est levé — sans toujours savoir le nommer.",
        "Une nouvelle place dans votre famille de naissance ou actuelle, plus juste.",
        "Des situations qui se rejouaient depuis des années qui cessent de se reproduire.",
        "Une sensation d'autorisation à exister pour vous-même, débarrassée d'une loyauté ancienne.",
        "Plus de discernement face aux demandes des autres.",
      ];
    case "feminin":
      return [
        "Une présence retrouvée au quotidien — moins d'auto-pilote, plus d'écoute fine.",
        "Un rapport au corps moins fonctionnel, plus habité.",
        "Un sentiment d'appartenance après les premiers cercles — vous n'êtes plus la seule à porter cela.",
        "Une ouverture du cœur qui se traduit dans vos relations sans avoir besoin d'en parler.",
        "L'envie naturelle de réinventer certains rythmes de vie.",
      ];
    case "corps":
      return [
        "Des prises de conscience puissantes pendant et après les pratiques.",
        "Un accès à des états de présence inhabituels que vous saurez ré-invoquer ensuite.",
        "Une intensité émotionnelle qui devient ressource au lieu d'être subie.",
        "Une trajectoire qui se dessine avec plus de courage.",
        "Le sentiment d'être en lien avec quelque chose de plus grand que votre quotidien.",
      ];
  }
}

function celineMessageFor(firstname: string, axe: AxeId): string {
  const opening = firstname ? `${firstname}, je vous lis attentivement.` : "Je vous lis attentivement.";

  const middle: Record<AxeId, string> = {
    memoires:
      "L'axe Mémoires & constellations vous correspond — je le sens dans la manière dont vous décrivez ce qui se rejoue. Mon travail systémique n'est pas une thérapie au sens classique : c'est un cadre où ce qui pèse depuis longtemps peut enfin être vu. Je vous propose toujours un échange préalable par téléphone avant toute constellation, pour poser l'intention juste.",
    feminin:
      "L'axe Féminin & cacao vous correspond. Ce que vous nommez touche quelque chose de très profond. Je tiens un cadre précis dans mes cercles et cérémonies — confidentialité totale, pas d'injonction, pas de spectacle. C'est ce qui rend le travail possible. Le cacao, le cercle, l'accompagnement individuel autour de l'utérus symbolique — je peux ajuster selon ce que vous portez.",
    corps:
      "L'axe Corps & intégration vous correspond. Vous êtes prête pour un travail puissant — c'est rare et précieux. Innerdance, breathwork chamanique, retraites — on en parlera ensemble pour calibrer l'intensité juste. Le breathwork demande un échange préalable systématique : quelques minutes pour vérifier que tout est aligné côté santé.",
  };

  const closing =
    "Je vous réponds personnellement. Vous pouvez écrire, m'appeler ou réserver directement — il n'y a pas de mauvaise porte d'entrée.";

  return `${opening} ${middle[axe]} ${closing}`;
}

function recommendParcours(axe: AxeId, frequence?: string, budget?: string): { parcours: Parcours; reason: string } {
  // Mapping souple : aucun parcours n'est exclusivement réservé à un axe.
  // Reflet = entrée / clarification (apaisement, retour à soi)
  // Boussole = orientation profonde (Mémoires, Féminin)
  // Métamorphose = intensif (Corps, Immersion)
  let suggested = "boussole";
  if (axe === "corps") suggested = "metamorphose";
  if (frequence === "immersion" || budget === "immersion") suggested = "metamorphose";
  if (frequence === "ponctuel" && budget === "decouverte") suggested = "reflet";

  const found = parcours.find((p) => p.slug === suggested) ?? parcours[1];

  const reasons: Record<string, string> = {
    reflet:
      "C'est un parcours d'entrée — clarification, retour à soi, mise en place du travail. Il peut être orienté vers l'un des trois axes selon ce qui appelle, mais reste accessible et progressif.",
    boussole:
      "C'est le parcours d'orientation profonde — il convient particulièrement aux axes Mémoires et Féminin où la lecture (numérologie, constellation) ouvre le travail. Suffisamment dense pour que les choses bougent vraiment.",
    metamorphose:
      "C'est le parcours intensif — la retraite week-end intégrée fait basculer ce qui pourrait demander des années en cabinet. Particulièrement adapté à l'axe Corps & intégration mais peut englober les 3 axes selon votre profil.",
  };

  return {
    parcours: found,
    reason: reasons[found.slug] ?? reasons.boussole,
  };
}

export function buildBilan(answers: BilanAnswers, firstname: string = ""): BilanContent {
  const scores = scoreAxes(answers);
  const sortedAxes = (Object.keys(scores) as AxeId[]).sort((a, b) => scores[b] - scores[a]);
  const principalId = sortedAxes[0] ?? "memoires";
  const secondaireId = sortedAxes[1];
  const axePrincipal = axes[principalId];
  const axeSecondaire =
    secondaireId && scores[secondaireId] > 0 && scores[secondaireId] >= scores[principalId] * 0.5
      ? axes[secondaireId]
      : null;

  const ressenti = answers.ressenti ?? [];
  const frequence = answers.frequence?.[0];
  const wantsCollective = answers.format?.includes("collectif") ?? false;
  const wantsImmersion = frequence === "immersion" || answers.budget?.includes("immersion") || false;

  const reasonAxePrincipal = (() => {
    const ressentisDescr = ressenti.join(", ") || "votre élan du moment";
    return `D'après vos réponses (${ressentisDescr}, contexte ${
      answers.contexte?.[0] ?? "ouvert"
    }, format ${answers.format?.[0] ?? "indécis"}), c'est cet axe qui résonne le plus fortement avec votre situation actuelle. ${axePrincipal.shortDescription}`;
  })();

  const cercleSuggestion = (() => {
    if (axePrincipal.id === "feminin")
      return "Le Cercle Etincel vous offre un espace continu entre les rituels et les cérémonies cacao live, plus une communauté féminine privée tenue par Céline.";
    if (axePrincipal.id === "memoires")
      return "Le Cercle Etincel vous donne accès à des audios d'introspection et d'écriture pour décanter ce qui s'éclaire entre les séances.";
    return "Le Cercle Etincel propose des méditations et des cercles live pour pratiquer le souffle et la présence à votre rythme entre les retraites.";
  })();

  return {
    axePrincipal,
    axeSecondaire,
    reasonAxePrincipal,
    whatsAtPlay: whatsAtPlayParagraphs(answers, axePrincipal),
    toolsMobilized: toolsMobilizedFor(principalId, answers),
    parcours3Months: parcours3MonthsFor(principalId, frequence),
    recommendedParcours: recommendParcours(principalId, frequence, answers.budget?.[0]),
    couldFeel: couldFeelFor(principalId),
    celineMessage: celineMessageFor(firstname, principalId),
    suggestRetreat: wantsImmersion,
    suggestCollective: wantsCollective,
    cercleSuggestion,
  };
}

/** Helper exposé pour pages qui veulent récupérer la liste des axes. */
export const allAxes: BilanAxe[] = [axes.memoires, axes.feminin, axes.corps];

/** Compatibilité historique : on conservait `accompagnementsIndividuels`
 *  pour les recommandations principales — gardée pour les autres usages. */
export const _practicesCatalog: Practice[] = accompagnementsIndividuels;
