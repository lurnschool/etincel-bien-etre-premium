/**
 * Génération du bilan personnalisé Etincel.
 *
 * À partir des 8 réponses du diagnostic, on assemble un contenu
 * pédagogique riche qui ne se contente pas de donner une recommandation,
 * mais qui explique :
 *  - ce que la personne est en train de traverser (analyse fine),
 *  - pourquoi telle pratique est juste pour elle (justification),
 *  - un parcours suggéré sur 3 mois (vision d'avenir),
 *  - ce qu'elle peut ressentir après quelques séances (projection bénéfice),
 *  - un mot direct de Céline (création du lien).
 *
 * Tous les textes sont des templates statiques solides — pas d'IA dans
 * cette version. Quand `/api/ai-chat` sera actif sur Vercel, on pourra
 * surcharger `celineMessage` par un appel Anthropic pour générer un
 * message vraiment unique. Pour l'instant les templates suffisent à
 * créer le moment "ah oui, je comprends".
 */

import { accompagnementsIndividuels, type Practice } from "./data";
import { parcours, type Parcours } from "./parcours";

export type BilanAnswers = Record<string, string[]>;

export type BilanProfile = {
  id: string;
  title: string;
  catchphrase: string;
  shortDescription: string;
  longDescription: string;
};

export type BilanParcours = {
  month: number;
  label: string;
  intention: string;
  practices: { name: string; href?: string; price?: string }[];
};

export type BilanContent = {
  profile: BilanProfile;
  whatsAtPlay: string[];
  whyThisPractice: { practice: Practice; reason: string };
  parcours3Months: BilanParcours[];
  recommendedParcours: { parcours: Parcours; reason: string };
  couldFeel: string[];
  celineMessage: string;
  recommendedSecondary: Practice[];
  suggestRetreat: boolean;
  suggestCollective: boolean;
  reservationHref: string;
};

const profiles: Record<string, BilanProfile> = {
  cacao: {
    id: "cacao",
    title: "La chercheuse de présence",
    catchphrase: "Ralentir pour réentendre ce qui appelle au cœur.",
    shortDescription:
      "Vous êtes prête pour un travail sensoriel et symbolique — pas pour une thérapie verbale.",
    longDescription:
      "Vous n'avez pas besoin qu'on vous explique ce qui ne va pas. Vous avez besoin d'un espace pour le sentir, le déposer, le laisser passer. Le rituel cacao, les cercles de femmes et les retraites sont vos territoires : un travail qui ne demande pas la performance, mais la présence.",
  },
  constellations: {
    id: "constellations",
    title: "L'éclaireuse des liens",
    catchphrase: "Voir l'invisible pour reprendre sa place.",
    shortDescription:
      "Quelque chose, derrière, demande à être vu — un schéma, une transmission, une loyauté ancienne.",
    longDescription:
      "Vous sentez que ce qui se rejoue n'est pas seulement le vôtre. Une dynamique familiale, une mémoire de lignée, une place mal posée à la naissance — il y a un nœud qui demande la lumière. Les constellations familiales ou Rebirth ne soignent pas par la parole : elles montrent. Et ce qui est vu, souvent, se dénoue tout seul.",
  },
  comprendre: {
    id: "comprendre",
    title: "L'âme cartographe",
    catchphrase: "Lire la carte avant de marcher.",
    shortDescription:
      "Vous voulez du sens, des repères, une lecture de votre trajectoire.",
    longDescription:
      "Avant d'agir, vous voulez comprendre. Et c'est juste : votre intelligence est un outil, pas un obstacle. La numérologie ne donne pas de réponses préfabriquées — elle révèle les cycles, les talents, les ressources que vous portez déjà. Une fois la carte lue, le chemin se dessine de lui-même.",
  },
  apaiser: {
    id: "apaiser",
    title: "La voyageuse fatiguée",
    catchphrase: "Déposer ce qui n'a plus à être porté.",
    shortDescription:
      "Vous avez beaucoup donné. Maintenant il s'agit de relâcher, libérer, retrouver le calme.",
    longDescription:
      "Une fatigue qui n'est pas seulement physique. Une charge émotionnelle qui s'est installée silencieusement. Hypnose, CellRelease®, massage énergétique — Céline vous propose d'abord de relâcher, de redonner de la place. Ensuite seulement, on regardera ce qui se libère et vers où ça veut aller.",
  },
  corps: {
    id: "corps",
    title: "L'habitante du sensible",
    catchphrase: "Le corps comme première maison.",
    shortDescription:
      "Vous avez quitté votre corps quelque part en route. Il s'agit d'y revenir.",
    longDescription:
      "Le travail commence par la sensation. Massage Libération Reconnexion, réflexologie amérindienne, breathwork : ces pratiques rouvrent le dialogue avec votre corps comme un langage qu'on aurait oublié. Les émotions, les souvenirs, les intuitions reviennent quand le corps redevient un espace habitable.",
  },
  explorer: {
    id: "explorer",
    title: "La voyageuse intérieure",
    catchphrase: "Aller chercher ce qui demande à émerger.",
    shortDescription:
      "Vous êtes prête pour un travail puissant — souffle, états sensibles, immersion.",
    longDescription:
      "Vous n'êtes pas dans la découverte timide. Vous voulez aller voir, vraiment, ce qui est là. Innerdance, breathwork chamanique, retraites — ces pratiques mobilisent tout l'être. Elles demandent de l'engagement et donnent en retour une intensité d'écoute que peu d'expériences offrent.",
  },
  feminin: {
    id: "feminin",
    title: "La femme qui revient à elle",
    catchphrase: "Réhabiter le féminin comme un territoire vivant.",
    shortDescription:
      "Cycles, intuition, énergie créatrice — quelque chose de très ancien et très neuf vous appelle.",
    longDescription:
      "Le féminin n'est pas un concept ou un atelier. C'est une présence à retrouver dans votre corps, votre rythme, votre intuition. Cercles de femmes, féminin sacré, cérémonie cacao en sororité — ces espaces font ce que la société rend rare : tenir un cadre où votre singularité féminine peut respirer.",
  },
  retraite: {
    id: "retraite",
    title: "La voyageuse en immersion",
    catchphrase: "Sortir du quotidien pour se retrouver.",
    shortDescription:
      "Une séance ne suffit plus. Vous avez besoin de temps long, de groupe, de dépaysement.",
    longDescription:
      "Quelques heures par semaine ne déplacent plus rien. C'est dans la durée qu'il faut chercher : 2 à 7 jours dans un lieu choisi, en petit groupe, avec des pratiques tenues et une séance individuelle intégrée. Le format retraite n'est pas un séjour — c'est une décision d'aller voir, vraiment.",
  },
};

export function buildProfile(intentions: string[]): BilanProfile {
  const top = intentions[0] ?? "comprendre";
  return profiles[top] ?? profiles.comprendre;
}

/** Phrases d'analyse personnalisée selon les tags dominants */
function whatsAtPlayParagraphs(answers: BilanAnswers, profile: BilanProfile): string[] {
  const out: string[] = [];

  // Paragraphe 1 — ressenti
  const ressenti = answers.ressenti ?? [];
  if (ressenti.includes("fatigue")) {
    out.push(
      "Vous traversez une fatigue qui ne se règle plus avec une bonne nuit. Une fatigue émotionnelle, qui s'est installée doucement et qui demande maintenant à être entendue, pas combattue.",
    );
  } else if (ressenti.includes("blocage")) {
    out.push(
      "Vous sentez qu'un schéma se rejoue malgré vous — une situation qui revient, une réaction qui vous échappe, une part de vous qui freine alors que tout le reste avance. Ce n'est pas un manque de volonté ; c'est une mémoire du système qui demande à être vue.",
    );
  } else if (ressenti.includes("transition")) {
    out.push(
      "Vous êtes au milieu d'un passage — séparation, parentalité, perte, virage professionnel, ou tout simplement la fin d'une étape qui vous habitait depuis longtemps. Les transitions ne se traversent pas seules dans la durée.",
    );
  } else if (ressenti.includes("clarte")) {
    out.push(
      "Vous cherchez de la clarté. Pas une réponse simple — une vue d'ensemble. Quelque chose à quoi vous puissiez vous fier pour orienter vos choix des prochains mois.",
    );
  } else if (ressenti.includes("transmission")) {
    out.push(
      "Vous percevez qu'une histoire familiale pèse encore — peut-être une transmission silencieuse, une loyauté invisible, ou simplement la sensation que quelque chose se rejoue par-dessus votre tête.",
    );
  } else if (ressenti.includes("coeur")) {
    out.push(
      "Quelque chose autour du cœur appelle. Pas le sentimental — une ouverture plus profonde, un besoin de présence à vous-même que les mots ne disent pas tout à fait.",
    );
  } else {
    out.push(
      "Vous avez décidé de vous écouter, là, maintenant. Ce premier pas vaut beaucoup — la plupart des personnes mettent des années avant d'oser s'arrêter pour faire ce bilan.",
    );
  }

  // Paragraphe 2 — contexte
  const contexte = answers.contexte?.[0];
  if (contexte === "transition") {
    out.push(
      "Le contexte que vous décrivez — une transition forte — demande un accompagnement structuré. Pas une séance de découverte au cas où. Un vrai cadre où Céline tient le fil pendant que vous traversez.",
    );
  } else if (contexte === "epuisement") {
    out.push(
      "L'épuisement progressif que vous décrivez n'est pas qu'une fatigue : c'est un signal. Le corps demande à être pris au sérieux avant que ça aille plus loin. Le travail commence là — relâcher, libérer, retrouver des appuis.",
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

  // Paragraphe 3 — objectif + fréquence
  const objectif = answers.objectif?.[0];
  const frequence = answers.frequence?.[0];
  if (objectif === "transformer") {
    out.push(
      "L'objectif de transformation profonde que vous portez ne se joue pas en une séance. Cela demande un parcours — quelques mois, idéalement, où Céline construit avec vous une trajectoire qui prend en compte votre rythme et vos résistances.",
    );
  } else if (objectif === "ressourcer") {
    out.push(
      "Le besoin de ressource que vous nommez est précis : il ne s'agit pas de \"se relaxer\". Il s'agit de retrouver de la matière en vous — de l'énergie, de l'élan, de la sensation d'être vivante.",
    );
  } else if (frequence === "immersion") {
    out.push(
      "Vous le sentez vous-même : une immersion (retraite, week-end) sera plus juste qu'une séance ponctuelle. Le format long permet à des choses de remonter qu'une heure à la fois ne déplacerait jamais.",
    );
  } else if (frequence === "intensif") {
    out.push(
      "Vous êtes prête à un format soutenu. Plusieurs séances rapprochées créent un effet de cumul que l'espacement mensuel n'offre pas. Céline vous proposera un parcours adapté.",
    );
  }

  // Paragraphe 4 — profil et conclusion
  out.push(profile.longDescription);

  return out;
}

function whyThisPracticeReason(practice: Practice, profileId: string, ressenti: string[]): string {
  const family = practice.family;
  const parts: string[] = [];

  parts.push(`${practice.name} est juste pour vous parce qu'elle ${reasonForFamily(family)}.`);

  if (ressenti.includes("fatigue") && family !== "apaiser") {
    parts.push(
      "Avant d'aller plus loin, Céline veillera à ce que vous ayez l'énergie de tenir le travail — un soin de relâchement initial peut être proposé en amont.",
    );
  }

  if (profileId === "constellations" && family === "feminin") {
    parts.push(
      "Le travail systémique est puissant ici car il aborde directement la transmission, sans avoir besoin de tout connaître consciemment.",
    );
  }

  parts.push(
    "Ce n'est pas une thérapie au sens médical. C'est une démarche sensible — et c'est précisément cela qui ouvre les choses différemment.",
  );

  return parts.join(" ");
}

function reasonForFamily(family: string): string {
  switch (family) {
    case "comprendre":
      return "donne du sens et des repères avant l'action — c'est exactement ce que vous demandez";
    case "apaiser":
      return "permet de relâcher et libérer ce qui pèse, sans avoir besoin d'expliquer ou d'analyser";
    case "corps":
      return "remet le corps au centre — votre maison habitable, votre première intelligence";
    case "explorer":
      return "ouvre un espace intérieur que la parole seule n'atteint pas";
    case "feminin":
      return "tient un cadre symbolique pour votre corps, vos cycles et votre énergie créatrice";
    case "cacao":
      return "ralentit profondément et ouvre le cœur sans psychédélisme ni promesse";
    default:
      return "correspond à votre élan du moment";
  }
}

function parcours3Months(profile: BilanProfile, principale: Practice, frequence?: string): BilanParcours[] {
  const wantsImmersion = frequence === "immersion";

  switch (profile.id) {
    case "cacao":
      return [
        {
          month: 1,
          label: "Ouverture",
          intention: "Premier rituel + cercle de femmes pour goûter l'univers en sororité.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
            { name: "Cercle de femmes mensuel", href: "/cercles-de-femmes" },
          ],
        },
        {
          month: 2,
          label: "Approfondir",
          intention: "Ajouter le travail corporel pour ancrer ce qui s'est levé.",
          practices: [
            { name: "Massage Libération Reconnexion · 1h45", price: "120 €", href: "/reserver/massage-liberation-reconnexion" },
            { name: "Cercle cacao", href: "/cacao" },
          ],
        },
        {
          month: 3,
          label: wantsImmersion ? "Immersion" : "Intégrer",
          intention: wantsImmersion
            ? "Week-end retraite pour faire un saut décisif."
            : "Une lecture numérologique pour ancrer l'élan dans votre cycle de vie.",
          practices: wantsImmersion
            ? [{ name: "Week-end reconnexion", price: "490 € à 780 €", href: "/retraites" }]
            : [{ name: "Lecture numérologie", price: "110 €", href: "/reserver/numerologie" }],
        },
      ];

    case "constellations":
      return [
        {
          month: 1,
          label: "Voir",
          intention: "Une première constellation pour mettre la lumière sur ce qui se rejoue.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
          ],
        },
        {
          month: 2,
          label: "Décanter",
          intention: "Laisser les mouvements se poser, soutenu par un soin corporel.",
          practices: [
            { name: "CellRelease®", price: "90 €", href: "/reserver/cellrelease" },
            { name: "Hypnose & mouvements oculaires", price: "90 €", href: "/reserver/hypnose" },
          ],
        },
        {
          month: 3,
          label: "Ancrer",
          intention: "Constellation de naissance Rebirth pour clore le cycle, ou cercle d'intégration.",
          practices: [
            { name: "Constellation Rebirth", price: "95 €", href: "/reserver/constellation-naissance-rebirth" },
            { name: "Cercle de femmes", href: "/cercles-de-femmes" },
          ],
        },
      ];

    case "comprendre":
      return [
        {
          month: 1,
          label: "Lire",
          intention: "Lecture numérologique complète + synthèse écrite remise.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
          ],
        },
        {
          month: 2,
          label: "Approfondir",
          intention: "Une séance d'hypnose ou de constellation pour mettre en mouvement ce qui s'est éclairé.",
          practices: [
            { name: "Hypnose & mouvements oculaires", price: "90 €", href: "/reserver/hypnose" },
            { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
          ],
        },
        {
          month: 3,
          label: "Transmettre",
          intention: wantsImmersion
            ? "Retraite immersive pour ancrer profondément, ou Module 1 de formation si la transmission vous appelle."
            : "Module 1 de la formation Numérologie si la transmission vous attire — ou rituel cacao pour fermer le cycle.",
          practices: wantsImmersion
            ? [{ name: "Retraite week-end", price: "490 € à 780 €", href: "/retraites" }]
            : [
                { name: "Formation Numérologie M1", price: "320 €", href: "/reserver/formation-numerologie-m1" },
                { name: "Cérémonie cacao", href: "/cacao" },
              ],
        },
      ];

    case "apaiser":
      return [
        {
          month: 1,
          label: "Relâcher",
          intention: "Deux séances rapprochées pour redonner de l'espace au système nerveux.",
          practices: [
            { name: "CellRelease® · séance 1", price: "90 €", href: "/reserver/cellrelease" },
            { name: "Hypnose · séance 2", price: "90 €", href: "/reserver/hypnose" },
          ],
        },
        {
          month: 2,
          label: "Libérer",
          intention: "Quand l'apaisement est posé, un travail plus profond peut commencer.",
          practices: [
            { name: "Massage Libération Reconnexion · 1h45", price: "120 €", href: "/reserver/massage-liberation-reconnexion" },
            { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
          ],
        },
        {
          month: 3,
          label: "Réinvestir",
          intention: "Lire ce qui s'est libéré et orienter la suite avec une lecture numérologique.",
          practices: [
            { name: "Lecture numérologie", price: "110 €", href: "/reserver/numerologie" },
          ],
        },
      ];

    case "corps":
      return [
        {
          month: 1,
          label: "Habiter",
          intention: "Reprendre contact avec le corps par le toucher et le souffle.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
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
            ? "Une retraite pour ancrer ce qui s'est mis en mouvement."
            : "Une séance d'hypnose ou de constellation pour boucler le cycle.",
          practices: wantsImmersion
            ? [{ name: "Week-end reconnexion", price: "490 € à 780 €", href: "/retraites" }]
            : [
                { name: "Hypnose", price: "90 €", href: "/reserver/hypnose" },
                { name: "Cercle de femmes", href: "/cercles-de-femmes" },
              ],
        },
      ];

    case "feminin":
      return [
        {
          month: 1,
          label: "Revenir",
          intention: "Premier cercle + accompagnement individuel autour du féminin sacré.",
          practices: [
            { name: "Accompagnement féminin sacré", href: "/feminin-sacre" },
            { name: "Cercle de femmes mensuel", href: "/cercles-de-femmes" },
          ],
        },
        {
          month: 2,
          label: "Honorer",
          intention: "Cérémonie cacao en sororité + soin corporel.",
          practices: [
            { name: "Cercle cacao", href: "/cacao" },
            { name: "Massage Libération Reconnexion", price: "90 € (1h20)", href: "/reserver/massage-liberation-reconnexion" },
          ],
        },
        {
          month: 3,
          label: "Ancrer",
          intention: wantsImmersion
            ? "Retraite féminin sacré pour vivre une véritable immersion."
            : "Constellation de naissance Rebirth — explorer ce qui s'est joué à l'origine.",
          practices: wantsImmersion
            ? [{ name: "Retraite féminin sacré", price: "490 € à 1 890 €", href: "/retraites" }]
            : [{ name: "Constellation Rebirth", price: "95 €", href: "/reserver/constellation-naissance-rebirth" }],
        },
      ];

    case "explorer":
      return [
        {
          month: 1,
          label: "Ouvrir",
          intention: "Breathwork ou innerdance pour mobiliser les ressources sensibles.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
          ],
        },
        {
          month: 2,
          label: "Approfondir",
          intention: "Constellation + soin corporel pour ancrer ce qui se lève.",
          practices: [
            { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
            { name: "Massage énergétique", price: "90 €", href: "/reserver/massage-energetique" },
          ],
        },
        {
          month: 3,
          label: "Immersion",
          intention: "Retraite immersive — c'est dans ce format que votre élan trouvera sa pleine expression.",
          practices: [
            { name: "Retraite immersive", price: "490 € à 1 890 €", href: "/retraites" },
          ],
        },
      ];

    case "retraite":
      return [
        {
          month: 1,
          label: "Préparer",
          intention: "Une séance individuelle préparatoire avant la retraite — pour ne pas y arriver \"à froid\".",
          practices: [
            { name: "Lecture numérologie", price: "110 €", href: "/reserver/numerologie" },
            { name: "Constellation individuelle", price: "95 €", href: "/reserver/constellation-individuelle" },
          ],
        },
        {
          month: 2,
          label: "Vivre",
          intention: "La retraite — week-end ou plusieurs jours selon ce qui résonne.",
          practices: [
            { name: "Retraite immersive", price: "490 € à 1 890 €", href: "/retraites" },
          ],
        },
        {
          month: 3,
          label: "Intégrer",
          intention: "Une séance individuelle de retour — décanter ce qui s'est ouvert.",
          practices: [
            { name: "Hypnose", price: "90 €", href: "/reserver/hypnose" },
            { name: "Cercle de femmes", href: "/cercles-de-femmes" },
          ],
        },
      ];

    default:
      return [
        {
          month: 1,
          label: "Démarrer",
          intention: "Une première séance pour ouvrir le travail.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
          ],
        },
        {
          month: 2,
          label: "Approfondir",
          intention: "Une deuxième séance ou une pratique complémentaire.",
          practices: [
            { name: principale.name, price: principale.price, href: `/reserver/${principale.slug}` },
          ],
        },
        {
          month: 3,
          label: "Intégrer",
          intention: "Cercle ou retraite pour ancrer ce qui s'est mis en mouvement.",
          practices: [
            { name: "Cercle de femmes", href: "/cercles-de-femmes" },
          ],
        },
      ];
  }
}

function couldFeelFor(profile: BilanProfile): string[] {
  switch (profile.id) {
    case "cacao":
    case "feminin":
      return [
        "Une présence retrouvée au quotidien — moins d'auto-pilote, plus d'écoute fine.",
        "Un sentiment d'appartenance, après les premiers cercles : vous n'êtes plus la seule à porter cela.",
        "Une ouverture du cœur qui se traduit dans vos relations proches sans avoir besoin d'en parler.",
        "Un rapport au corps moins fonctionnel, plus habité.",
        "L'envie naturelle de réinventer certains rythmes de vie.",
      ];
    case "constellations":
      return [
        "Le sentiment qu'un poids ancien s'est levé — sans toujours savoir le nommer.",
        "Une nouvelle place dans votre famille de naissance ou actuelle, plus juste.",
        "Des situations qui se rejouaient depuis des années qui cessent de se reproduire.",
        "Une sensation d'autorisation à exister pour vous-même.",
        "Plus de discernement face aux demandes des autres.",
      ];
    case "comprendre":
      return [
        "Une vue d'ensemble de votre trajectoire, comme une carte enfin lisible.",
        "Une compréhension de pourquoi certains cycles ont eu lieu à tel moment précis.",
        "Une confiance nouvelle dans vos talents — c'était là, vous ne l'aviez pas nommé.",
        "Des décisions plus alignées, prises avec moins de doute.",
        "L'envie d'aller plus loin (Module 1) ou de transmettre vous-même.",
      ];
    case "apaiser":
      return [
        "Un sommeil qui revient ou s'approfondit dès les premières séances.",
        "Une charge émotionnelle qui baisse de plusieurs crans.",
        "Plus de capacité à dire non sans vous justifier.",
        "Une énergie disponible pour ce qui compte, au lieu d'être absorbée par ce qui pèse.",
        "Le sentiment que vous vous tenez à nouveau debout, intérieurement.",
      ];
    case "corps":
      return [
        "Une sensorialité retrouvée — les odeurs, les saveurs, la peau.",
        "Une posture plus ouverte, moins défensive.",
        "Des tensions chroniques qui s'estompent (épaules, dos, ventre).",
        "Un rapport plus tendre avec votre corps, sans injonction.",
        "Une intuition qui se remet à parler — souvent par le corps avant la tête.",
      ];
    case "explorer":
      return [
        "Des prises de conscience puissantes pendant et après les pratiques.",
        "Un accès à des états de présence inhabituels que vous saurez ré-invoquer ensuite.",
        "Une intensité émotionnelle qui devient une ressource au lieu d'être subie.",
        "Une trajectoire qui se dessine avec plus de courage.",
        "Le sentiment d'être en lien avec quelque chose de plus grand que votre quotidien.",
      ];
    case "retraite":
      return [
        "Une coupure réelle d'avec le quotidien — beaucoup parlent d'un \"avant\" et d'un \"après\".",
        "Des amitiés profondes nées dans le cercle, qui durent.",
        "Un repos qui ne se prend pas en vacances habituelles.",
        "Une clarté sur ce qui doit changer dans votre vie ordinaire.",
        "Une envie d'inscrire ces espaces dans votre rythme annuel.",
      ];
    default:
      return [
        "Un mieux-être qui se diffuse dans votre quotidien.",
        "Plus d'écoute de vos signaux internes.",
        "Des choix qui s'alignent davantage.",
        "Une présence retrouvée à vous-même.",
      ];
  }
}

function celineMessageFor(firstname: string, profile: BilanProfile, principale: Practice): string {
  const opening = firstname
    ? `${firstname}, je vous lis attentivement.`
    : "Je vous lis attentivement.";

  const middle = (() => {
    switch (profile.id) {
      case "cacao":
        return "Ce que vous décrivez n'a pas besoin de mots compliqués. C'est précisément ce que les rituels permettent — ralentir, écouter, déposer. Le format individuel est une bonne porte d'entrée, et un cercle ensuite peut faire un effet très fort.";
      case "constellations":
        return "Si vous le ressentez, on commence par là. Une seule constellation suffit souvent à dénouer un nœud précis. Je vous propose toujours un échange préalable, par téléphone, pour poser l'intention juste — c'est ce qui fait la qualité du travail.";
      case "comprendre":
        return "La numérologie vous donnera une vue d'ensemble que vous n'avez probablement jamais lue auparavant. Je vous remettrai une synthèse écrite — gardez-la, relisez-la dans 6 mois, vous serez surprise.";
      case "apaiser":
        return "Le premier travail est de relâcher. Pas de chercher à comprendre tout de suite. Une séance d'hypnose ou de CellRelease® vous donnera une respiration immédiate. Ensuite, on regardera ce qui veut bouger.";
      case "corps":
        return "Le corps a beaucoup à dire. Mon approche n'est pas une kinésithérapie — c'est un dialogue avec ce qui s'est tendu, oublié, mis de côté. Vous ressortez d'une séance avec une sensation très différente, souvent.";
      case "explorer":
        return "Vous êtes prête pour un travail puissant — c'est rare et c'est précieux. On en parlera ensemble pour calibrer l'intensité juste. Le breathwork demande un échange préalable systématique : quelques minutes pour vérifier que tout est aligné côté santé.";
      case "feminin":
        return "Ce que vous nommez touche quelque chose de très profond. Je tiens un cadre précis dans mes cercles — confidentialité totale, pas d'injonction, pas de spectacle. C'est ce qui rend le travail possible.";
      case "retraite":
        return "Vous avez raison : à un certain point, l'individuel ne suffit plus. Mes retraites sont en petits groupes (6 à 12), avec une séance individuelle intégrée. Inscrivez-vous à la liste d'intérêt — vous recevrez le programme avant la sortie publique.";
      default:
        return `Je vois que ${principale.name} est sans doute une bonne porte d'entrée, mais je ne tranche jamais sans un échange. Écrivez-moi, ou réservez directement — la suite, on la dessine ensemble.`;
    }
  })();

  const closing =
    "Je vous réponds personnellement. Vous pouvez écrire, m'appeler ou réserver directement — il n'y a pas de mauvaise porte d'entrée.";

  return `${opening} ${middle} ${closing}`;
}

function recommendParcours(profileId: string, frequence?: string, budget?: string): { parcours: Parcours; reason: string } {
  // Mapping archétype → parcours suggéré
  const map: Record<string, string> = {
    apaiser: "reflet",
    corps: "reflet",
    comprendre: "boussole",
    constellations: "boussole",
    feminin: "boussole",
    cacao: "boussole",
    explorer: "metamorphose",
    retraite: "metamorphose",
  };
  let suggested = map[profileId] ?? "boussole";

  // Ajustement selon frequence / budget
  if (frequence === "immersion" || budget === "immersion") suggested = "metamorphose";
  if (frequence === "ponctuel" && budget === "decouverte") suggested = "reflet";

  const found = parcours.find((p) => p.slug === suggested) ?? parcours[1];

  const reasons: Record<string, string> = {
    reflet:
      "C'est le format le plus juste pour vous : 12 semaines pour relâcher, libérer, retrouver de l'énergie — sans précipiter le travail d'analyse. Le suivi continu fait toute la différence quand on traverse une fatigue.",
    boussole:
      "C'est le parcours qui correspond à votre demande de clarté. Numérologie + séances individuelles + constellation : vous obtenez la lecture d'ensemble que vous cherchez, ancrée dans votre corps et votre lignée.",
    metamorphose:
      "Vous êtes prête pour un travail puissant — la retraite week-end intégrée fait basculer ce qui pourrait demander des années en cabinet. Le parcours le plus profond, pour celles qui veulent vraiment changer de territoire intérieur.",
  };

  return {
    parcours: found,
    reason: reasons[found.slug] ?? reasons.boussole,
  };
}

export function buildBilan(answers: BilanAnswers, firstname: string = ""): BilanContent {
  const tags: string[] = [];
  const allQuestions = ["ressenti", "contexte", "format", "attire", "objectif", "frequence", "niveau", "budget"];
  Object.entries(answers).forEach(([qId, values]) => {
    if (!allQuestions.includes(qId)) return;
    values.forEach((v) => tags.push(...tagsForAnswer(qId, v)));
  });
  const counts: Record<string, number> = {};
  tags.forEach((t) => {
    counts[t] = (counts[t] || 0) + 1;
  });
  const sortedTags = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([k]) => k);

  const dominantTags = sortedTags.length > 0 ? sortedTags : ["comprendre"];
  const profile = buildProfile(dominantTags);

  const matched = accompagnementsIndividuels.filter((a) => dominantTags.slice(0, 3).includes(a.family));
  const principale = matched[0] ?? accompagnementsIndividuels.find((p) => p.slug === "numerologie")!;
  const secondaires = matched.slice(1, 4);

  const ressenti = answers.ressenti ?? [];
  const frequence = answers.frequence?.[0];
  const wantsCollective = answers.format?.includes("collectif");
  const wantsImmersion =
    frequence === "immersion" || answers.budget?.includes("immersion") || dominantTags.includes("retraite");

  return {
    profile,
    whatsAtPlay: whatsAtPlayParagraphs(answers, profile),
    whyThisPractice: {
      practice: principale,
      reason: whyThisPracticeReason(principale, profile.id, ressenti),
    },
    parcours3Months: parcours3Months(profile, principale, frequence),
    recommendedParcours: recommendParcours(profile.id, frequence, answers.budget?.[0]),
    couldFeel: couldFeelFor(profile),
    celineMessage: celineMessageFor(firstname, profile, principale),
    recommendedSecondary: secondaires,
    suggestRetreat: wantsImmersion,
    suggestCollective: wantsCollective ?? false,
    reservationHref: `/reserver/${principale.slug}`,
  };
}

const TAG_MAP: Record<string, Record<string, string[]>> = {
  ressenti: {
    fatigue: ["apaiser", "corps"],
    blocage: ["apaiser", "explorer"],
    clarte: ["comprendre"],
    transition: ["comprendre", "explorer"],
    corps: ["corps"],
    feminin: ["feminin"],
    coeur: ["cacao"],
    transmission: ["constellations"],
  },
  attire: {
    respiration: ["explorer"],
    massage: ["corps"],
    numerologie: ["comprendre"],
    hypnose: ["apaiser"],
    innerdance: ["explorer"],
    cercle: ["feminin"],
    cacao: ["cacao"],
    retraite: ["retraite"],
    constellations: ["constellations"],
  },
};

function tagsForAnswer(question: string, value: string): string[] {
  return TAG_MAP[question]?.[value] ?? [];
}
