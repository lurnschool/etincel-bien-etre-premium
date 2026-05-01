import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Heart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonHalo } from "@/components/ui/ButtonHalo";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Paiement annulé",
  description:
    "Votre paiement n'a pas été finalisé. Votre panier est conservé — vous pouvez réessayer ou écrire à Céline.",
  robots: { index: false, follow: false },
};

/**
 * /panier/annule — page de retour Stripe Checkout en cas d'annulation.
 * Sprint Vercel : route demandée explicitement par le brief de
 * déploiement (parcours panier complet : panier / merci / annule).
 *
 * Aucune simulation : on ne fait pas l'air "rassurant faux", juste un
 * message doux qui rappelle que le panier est conservé et qu'on peut
 * reprendre tranquillement ou passer par WhatsApp.
 */
export default function PanierAnnulePage() {
  const wa = whatsappLink(whatsappMessages.generic);
  return (
    <>
      <PageHeader
        eyebrow="Paiement non finalisé"
        title="Pas d'inquiétude — rien n'a été débité."
        description="Votre panier est conservé. Vous pouvez reprendre votre commande quand vous le souhaitez, ou écrire à Céline si vous préférez régler avec elle."
      />

      <section className="relative bg-bg-base py-16 md:py-22">
        <Container>
          <div className="mx-auto max-w-xl rounded-[1.75rem] bg-bg-card border border-border-soft p-8 md:p-10 text-center space-y-6 shadow-[0_8px_24px_rgba(31,26,46,0.06)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-soft/40 text-[#a86058]">
              <Heart className="h-6 w-6" />
            </div>
            <p className="text-base text-text-medium leading-relaxed">
              Cela arrive — un doute, un détail à vérifier, un changement
              d&apos;avis. Votre choix peut attendre. Et si vous voulez en
              parler avant de finaliser, Céline est joignable directement.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <ButtonHalo tone="mixed">
                <Link
                  href="/panier"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-deep px-6 py-3 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour au panier
                </Link>
              </ButtonHalo>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-text-deep/15 bg-bg-card px-6 py-3 text-sm font-medium text-text-deep hover:border-accent hover:text-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Écrire à Céline
              </a>
            </div>
            <p className="text-[0.78rem] text-text-soft italic pt-2">
              Aucune transaction n&apos;a été débitée. Vous pouvez aussi
              consulter les autres pages du site en attendant.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
