"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/lib/whatsapp";

function generateRef(): string {
  const date = new Date();
  const stamp = `${date.getFullYear().toString().slice(2)}${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EBE-${stamp}-${rand}`;
}

export default function PanierMerciPage() {
  const { clear } = useCart();
  const [orderRef, setOrderRef] = useState<string>("");
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Lecture des params d'URL Stripe Checkout — uniquement côté client après mount.
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessionId(sid && sid !== "{CHECKOUT_SESSION_ID}" ? sid : null);
     
    setOrderRef(sid && sid !== "{CHECKOUT_SESSION_ID}" ? sid.slice(-12).toUpperCase() : generateRef());
    clear();
  }, [clear]);

  const whatsappBody = `Bonjour Céline, je viens de finaliser un paiement Stripe. Référence : ${orderRef}.`;

  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Paiement confirmé"
        title={
          <>
            Merci pour votre{" "}
            <span className="font-display-italic text-gold-deep">confiance</span>.
          </>
        }
        description="Céline a reçu votre commande. Elle vous recontacte personnellement dans les heures qui viennent pour caler le créneau exact et préparer votre venue."
      />

      <section className="py-16 md:py-20">
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/25 via-bg-card to-bg-card p-8 md:p-12 space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/60 text-gold-deep">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep flex items-center gap-2">
                  <Etincelle size={9} /> Confirmé
                </p>
                <h2 className="font-display text-3xl md:text-4xl text-text-deep leading-tight mt-1">
                  Votre paiement a été reçu.
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-border-soft bg-bg-base p-5 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-text-soft">Référence</span>
                <span className="font-mono font-medium text-text-deep">{orderRef}</span>
              </div>
              {sessionId && (
                <div className="flex justify-between gap-3">
                  <span className="text-text-soft">Session Stripe</span>
                  <span className="font-mono text-[0.7rem] text-text-medium truncate ml-3">
                    {sessionId.slice(0, 24)}…
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-3 pt-2 border-t border-border-soft">
                <span className="text-text-soft">Confirmation</span>
                <span className="text-text-deep">Email Stripe automatique + appel Céline sous 24h</span>
              </div>
            </div>

            <div className="space-y-3 text-text-medium leading-relaxed">
              <p>
                <strong className="text-text-deep">Et maintenant ?</strong>
              </p>
              <ol className="space-y-2 pl-5 list-decimal">
                <li>
                  Vous recevez immédiatement un reçu Stripe à l&apos;adresse renseignée lors du paiement.
                </li>
                <li>
                  Céline vous appelle ou vous écrit dans les 24h pour caler le créneau exact, le lieu (Le Taillan-Médoc ou Univers&apos;elles à Martignas) et préparer votre venue.
                </li>
                <li>
                  En cas de question avant cet échange, vous pouvez la joindre directement sur WhatsApp.
                </li>
              </ol>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={whatsappLink(whatsappBody)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1ebe5a] transition-colors"
              >
                <Phone className="h-4 w-4" />
                Continuer sur WhatsApp
              </a>
              <Link href="/le-cercle" className="btn-secondary">
                <Sparkles className="h-4 w-4" />
                Découvrir Le Cercle
              </Link>
              <Link href="/" className="btn-secondary">
                Retour à l&apos;accueil
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
