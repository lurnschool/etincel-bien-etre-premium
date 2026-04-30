"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Minus,
  Plus,
  Send,
  Shield,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Etincelle } from "@/components/ui/Etincelle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useCart, formatEuros } from "@/lib/cart";
import { whatsappLink } from "@/lib/whatsapp";

type ContactState = {
  firstname: string;
  email: string;
  phone: string;
  consent: boolean;
};

const initialContact: ContactState = {
  firstname: "",
  email: "",
  phone: "",
  consent: false,
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function PanierPage() {
  const { enriched, totalCents, count, updateQuantity, removeItem, isReady } = useCart();
  const [contact, setContact] = useState<ContactState>(initialContact);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isContactValid =
    contact.firstname.trim().length > 1 &&
    isValidEmail(contact.email) &&
    contact.consent;

  const whatsappBody = useMemo(() => {
    if (enriched.length === 0) return "";
    const lines = enriched
      .map(
        (it) =>
          `• ${it.product.name} × ${it.quantity} (${formatEuros(it.lineCents)})`,
      )
      .join("\n");
    return `Bonjour Céline, je souhaite finaliser un panier sur le site :\n${lines}\n\nTotal indicatif : ${formatEuros(totalCents)}.`;
  }, [enriched, totalCents]);

  const handleStripeCheckout = async () => {
    if (!isContactValid || enriched.length === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "payment",
          lines: enriched.map((it) => ({
            productId: it.productId,
            quantity: it.quantity,
            customAmountCents: it.customAmountCents,
            noteToCeline: it.noteToCeline,
          })),
          contact: {
            firstname: contact.firstname,
            email: contact.email,
            phone: contact.phone,
          },
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        fallback?: boolean;
      };

      if (!res.ok || !data.url) {
        if (data.fallback || res.status === 503) {
          setError(
            "Le paiement Stripe n'est pas encore activé sur cet hébergement. Vous pouvez finaliser avec Céline via WhatsApp ou email — votre récapitulatif lui est transmis directement.",
          );
        } else {
          setError(
            data.error ?? "Stripe a refusé la création de la session. Réessayez dans un instant ou écrivez à Céline.",
          );
        }
        setProcessing(false);
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("Checkout error", err);
      setError(
        "Connexion au paiement impossible. Vérifiez votre réseau ou finalisez avec Céline via WhatsApp.",
      );
      setProcessing(false);
    }
  };

  const showEmpty = isReady && enriched.length === 0;

  return (
    <>
      <PageHeader
        variant="warm"
        eyebrow="Votre panier"
        title={
          <>
            Votre <span className="font-display-italic text-gold-deep">parcours</span>{" "}
            sur mesure.
          </>
        }
        description="Récapitulez vos accompagnements, validez vos coordonnées, puis finalisez avec Stripe ou directement avec Céline."
      />

      <section className="py-16 md:py-20">
        <Container>
          {showEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto rounded-3xl border border-border-soft bg-bg-card p-10 md:p-14 text-center space-y-6"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/40 text-gold-deep">
                <ShoppingBag className="h-7 w-7" />
              </span>
              <div className="space-y-3">
                <h2 className="font-display text-3xl text-text-deep">
                  Votre panier est vide.
                </h2>
                <p className="text-text-medium leading-relaxed">
                  Commencez par un bilan d&apos;orientation gratuit, ou explorez les accompagnements que Céline propose autour des 3 axes (mémoires, féminin, corps).
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link href="/diagnostic" className="btn-primary">
                  Faire mon bilan
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/tarifs" className="btn-secondary">
                  Voir les tarifs
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
              {/* Lignes du panier */}
              <div className="space-y-5">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-2xl text-text-deep">
                    Vos accompagnements
                  </h2>
                  <p className="text-[0.7rem] uppercase tracking-[0.28em] text-text-soft">
                    {count} article{count > 1 ? "s" : ""}
                  </p>
                </div>

                <ul className="space-y-4">
                  {enriched.map((item) => (
                    <li
                      key={item.productId}
                      className="rounded-2xl border border-border-soft bg-bg-card p-5 md:p-6 space-y-4"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div className="space-y-2 min-w-0 flex-1">
                          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep">
                            {item.product.category === "carte-cadeau"
                              ? "Carte cadeau"
                              : item.product.category === "formation"
                              ? "Formation"
                              : "Accompagnement"}
                          </p>
                          <p className="font-display text-xl text-text-deep leading-tight">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-text-medium leading-relaxed">
                            {item.product.description}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-display text-2xl text-text-deep tabular-nums">
                            {formatEuros(item.lineCents)}
                          </p>
                          <p className="text-xs text-text-soft tabular-nums">
                            {formatEuros(item.unitCents)} / unité
                          </p>
                        </div>
                      </div>

                      {item.noteToCeline && (
                        <p className="text-sm italic text-text-medium border-l-2 border-gold-soft pl-3 leading-relaxed">
                          « {item.noteToCeline} »
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-soft">
                        <div className="inline-flex items-center gap-1 rounded-full border border-border-soft bg-bg-base">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg-soft transition-colors"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-bg-soft transition-colors"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="inline-flex items-center gap-1.5 text-sm text-text-soft hover:text-accent-deep transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Retirer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coordonnées + paiement */}
              <aside className="space-y-5 lg:sticky lg:top-28 self-start">
                <div className="rounded-3xl border border-gold-soft/40 bg-gradient-to-br from-gold-soft/15 via-bg-card to-bg-card p-6 md:p-7 space-y-5">
                  <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                    <Etincelle size={10} />
                    Récapitulatif
                  </div>

                  <dl className="space-y-2 text-sm">
                    {enriched.map((it) => (
                      <div key={it.productId} className="flex justify-between gap-3">
                        <dt className="text-text-medium truncate">
                          {it.product.name}
                          {it.quantity > 1 && (
                            <span className="text-text-soft"> × {it.quantity}</span>
                          )}
                        </dt>
                        <dd className="text-text-deep tabular-nums shrink-0">
                          {formatEuros(it.lineCents)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex justify-between items-baseline pt-3 border-t border-border-soft">
                    <p className="font-display text-base text-text-deep">Total</p>
                    <p className="font-display text-3xl text-text-deep tabular-nums">
                      {formatEuros(totalCents)}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-border-soft bg-bg-card p-6 md:p-7 space-y-5">
                  <div className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-deep">
                      Vos coordonnées
                    </p>
                    <p className="font-display text-xl text-text-deep">
                      Pour que Céline vous recontacte.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Prénom
                      </label>
                      <input
                        type="text"
                        required
                        value={contact.firstname}
                        onChange={(e) =>
                          setContact({ ...contact, firstname: e.target.value })
                        }
                        placeholder="Votre prénom"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) =>
                          setContact({ ...contact, email: e.target.value })
                        }
                        placeholder="vous@email.fr"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-[0.22em] text-text-soft block">
                        Téléphone <span className="opacity-60">(optionnel)</span>
                      </label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) =>
                          setContact({ ...contact, phone: e.target.value })
                        }
                        placeholder="06 …"
                        className="w-full bg-bg-soft rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                      />
                    </div>
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-text-medium cursor-pointer pt-2">
                      <input
                        type="checkbox"
                        required
                        checked={contact.consent}
                        onChange={(e) =>
                          setContact({ ...contact, consent: e.target.checked })
                        }
                        className="mt-0.5 h-4 w-4 rounded border-border-medium text-accent focus:ring-accent/30"
                      />
                      <span>
                        J&apos;accepte que Céline conserve mes coordonnées pour finaliser ma réservation. Mes données ne sont pas transmises à des tiers.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="rounded-3xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-bg-card to-bg-card p-6 md:p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-accent-deep" />
                    <p className="font-display text-xl text-text-deep">
                      Paiement Stripe sécurisé
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    disabled={processing || !isContactValid}
                    className="orbit-shine w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent-deep px-6 py-3.5 text-sm font-medium text-text-on-dark hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Préparation Stripe…
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        Régler {formatEuros(totalCents)}
                      </>
                    )}
                  </button>

                  {error && (
                    <div className="rounded-2xl border border-gold-soft/60 bg-bg-soft p-4 text-xs text-text-medium leading-relaxed space-y-2">
                      <p>{error}</p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <WhatsAppButton message={whatsappBody}>
                          Continuer sur WhatsApp
                        </WhatsAppButton>
                        <a
                          href={`mailto:etincel33@gmail.com?subject=Panier%20Etincel&body=${encodeURIComponent(whatsappBody)}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-bg-card border border-border-soft px-4 py-2 text-xs font-medium text-text-deep hover:bg-bg-soft transition-colors"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Envoyer par email
                        </a>
                      </div>
                    </div>
                  )}

                  <p className="text-[0.7rem] text-text-soft leading-relaxed">
                    3D Secure · Visa, MasterCard, Amex · annulation 100 % remboursée à 7 jours du rendez-vous.
                  </p>
                </div>

                <div className="rounded-2xl border border-border-soft bg-bg-card p-5 space-y-2">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold-deep flex items-center gap-2">
                    <Shield className="h-3 w-3" />
                    Garanties
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                      Échange préalable systématique avec Céline avant la séance.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                      Annulation 100 % remboursée à 7 jours du rendez-vous.
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-3 w-3 text-gold mt-0.5 shrink-0" />
                      Vos données ne sont pas transmises à des tiers.
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <Link
                    href="/tarifs"
                    className="inline-flex items-center gap-1.5 text-text-medium hover:text-text-deep"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    Continuer mes choix
                  </Link>
                  <a
                    href={whatsappLink(whatsappBody)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-soft hover:text-text-deep underline-offset-2 hover:underline"
                  >
                    Finaliser avec Céline →
                  </a>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
