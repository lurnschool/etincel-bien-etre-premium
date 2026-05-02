import type { Metadata } from "next";
import { PageRefugeHero } from "@/components/page/PageRefugeHero";
import { GuidanceFooter } from "@/components/page/GuidanceFooter";
import { ProchainesDates } from "@/components/page/ProchainesDates";
import { constellationDates } from "@/lib/agenda";
import {
  PillarFormatsSection,
  PillarFaqSection,
} from "@/components/page/PillarSections";
import { CircleLinksSection } from "@/components/page/sections/CircleLinksSection";
import { DetailStrip } from "@/components/ui/DetailStrip";
import { PathwayBadge } from "@/components/layout/PathwayBadge";
import { EtincelleAccent } from "@/components/ui/EtincelleAccent";

export const metadata: Metadata = {
  title: "Constellations familiales & Rebirth",
  description:
    "Constellations familiales et de naissance avec Céline Dusseval — explorer les loyautés transgénérationnelles, mettre en lumière les dynamiques invisibles.",
};

const constellationsHero = {
  eyebrow: "Constellations familiales",
  greeting: "Le théâtre invisible.",
  title: "Explorer ce qui se rejoue dans la lignée.",
  body: "Une approche symbolique pour mettre en lumière les loyautés invisibles, les places qu'on porte sans avoir choisies, les histoires qu'on continue d'écrire pour d'autres. Familiale ou Rebirth de naissance.",
  primaryCta: { label: "Écrire à Céline", href: "/contact?sujet=Constellation" },
  secondaryCta: { label: "Voir le chemin Mémoires", href: "/memoires-constellations" },
};

const constellationsNodes = [
  { label: "Le secret", body: "Une histoire tue qui pèse, sans qu'on sache pourquoi." },
  { label: "L'absent", body: "Quelqu'un qui n'a pas été nommé, et qu'on porte malgré tout." },
  { label: "Le double", body: "Une vie qui rejoue celle d'un autre, à son insu." },
  { label: "La place vide", body: "Un rôle qu'on a pris pour combler ce qui manquait." },
  { label: "L'enfant parental", body: "Avoir grandi en s'occupant de ses parents." },
  { label: "La répétition", body: "Le même schéma qui passe de génération en génération." },
];

const constellationsFormats = {
  eyebrow: "Comment ça se passe",
  title: "Trois manières d'entrer dans ce travail.",
  body: "Selon ce qui appelle, plusieurs portes possibles. On en parle avant pour choisir le format juste.",
  cards: [
    { id: "constellation-individuelle", title: "Constellation individuelle", body: "Une séance dédiée pour explorer une dynamique précise — un lien, un schéma, une mémoire. Sans groupe, en présence à deux.", meta: "1h30 · 95 €" },
    { id: "constellation-rebirth", title: "Constellation Rebirth", body: "Un voyage symbolique au cœur de votre naissance et des empreintes qu'elle a laissées dans votre rapport à la vie.", meta: "1h30 · 95 €" },
    { id: "constellation-collective", title: "Constellation en groupe", body: "Un cercle de 6 à 10 personnes où chacune peut amener une question. Le groupe devient miroir et soutien.", meta: "Sessions ponctuelles · sur inscription" },
    { id: "hypnose-trans", title: "Hypnose transgénérationnelle", body: "Un voyage intérieur pour reconnecter aux mémoires de la lignée et libérer ce qu'on porte sans l'avoir choisi.", meta: "1h30 · 90 €" },
  ],
} as const;

const constellationsFaq = [
  { q: "Faut-il connaître son histoire familiale en détail ?", a: "Non. Souvent, c'est même plus juste de venir avec ce que vous savez (ou ne savez pas) sans chercher à reconstituer un arbre complet. Le travail symbolique met en lumière des dynamiques que la mémoire consciente n'a pas forcément stockées." },
  { q: "Quelle différence entre constellation individuelle et en groupe ?", a: "En individuel, vous êtes seule avec moi — on travaille avec des objets, des supports symboliques. En groupe, d'autres personnes deviennent les représentants de votre système — c'est plus immersif, mais aussi plus exposé. Les deux sont puissants, on choisit selon où vous en êtes." },
  { q: "Combien de séances faut-il prévoir ?", a: "Cela dépend de ce qui se présente. Certaines personnes viennent une fois, d'autres reviennent. On en parle ensemble selon ce qui s'ouvre." },
  { q: "Est-ce compatible avec une psychothérapie ?", a: "Tout à fait. Ce travail s'inscrit dans une démarche de bien-être et de développement personnel. Il ne remplace pas un suivi thérapeutique, et peut très bien s'articuler avec un accompagnement médical ou psychologique en cours." },
  { q: "Comment se passe l'inscription ?", a: "Pour les séances individuelles, on convient d'une date après un premier échange. Pour les sessions en groupe, vous rejoignez la liste d'intérêt et vous êtes prévenue dès qu'une session s'ouvre." },
];

/**
 * Page /constellations — Sprint D "refuge connecté".
 * Pièce du refuge : LE THÉÂTRE INVISIBLE.
 * Émotion : profondeur, liens invisibles, famille.
 *
 * Différenciation /memoires-constellations vs /constellations :
 *  - /memoires : axe global (mémoires + tout ce qui s'y rattache)
 *  - /constellations : focus spécifique sur la pratique des constellations
 *
 * Variant circle (fond nuit) + CircleLinksSection avec 6 nœuds spécifiques
 * (le secret, l'absent, le double, la place vide, l'enfant parental,
 * la répétition) — différents de ceux de /memoires-constellations.
 */
export default function ConstellationsPage() {
  return (
    <>
      <PageRefugeHero
        eyebrow={constellationsHero.eyebrow}
        greeting={constellationsHero.greeting}
        title={
          <>
            Explorer ce qui se{" "}
            <EtincelleAccent variant="glow">rejoue</EtincelleAccent>{" "}
            dans la lignée.
          </>
        }
        body={constellationsHero.body}
        primaryCta={constellationsHero.primaryCta}
        secondaryCta={constellationsHero.secondaryCta}
        visualId="memoires-detail-1"
        variant="circle"
      />

      <PathwayBadge pathway="memoires" />

      <DetailStrip
        assetIds={["micro-memoires-1", "micro-memoires-2", "micro-memoires-3", "micro-memoires-4", "micro-memoires-5", "micro-memoires-6"]}
        tone="night"
        size="md"
        caption="Fragments du cercle — objets, mains, présence."
      />

      <CircleLinksSection
        eyebrow="Ce qui peut se rejouer"
        title="Quelques figures qui reviennent souvent."
        intro="Aucune n'est universelle. Mais ce sont des dynamiques fréquentes que la constellation peut mettre en lumière."
        nodes={constellationsNodes}
      />

      <PillarFormatsSection
        eyebrow={constellationsFormats.eyebrow}
        title={constellationsFormats.title}
        body={constellationsFormats.body}
        cards={constellationsFormats.cards}
        background="paper-sand"
      />

      <PillarFaqSection items={constellationsFaq} background="bg-base" />

      <ProchainesDates
        eyebrow="Prochaines constellations"
        title="Les prochains rendez-vous."
        kind="autre"
        dates={constellationDates}
        notifyLabel="Recevoir les prochaines dates"
      />

      <GuidanceFooter variant="contact" />
    </>
  );
}
