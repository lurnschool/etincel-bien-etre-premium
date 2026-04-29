import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { brand, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Etincel de bien être collecte, utilise et protège vos données personnelles.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHeader eyebrow="Données personnelles" title="Politique de confidentialité" />

      <section className="pb-24">
        <Container size="narrow">
          <Reveal>
            <div className="space-y-8 text-text-medium leading-relaxed">
              <p>
                {brand.name} attache une grande importance à la confidentialité de vos données. Cette politique explique comment vos informations sont collectées, utilisées et protégées.
              </p>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Données collectées</h2>
                <p>
                  Lors de l'utilisation des formulaires (contact, lead magnet, diagnostic, cartes cadeaux, inscription aux cercles ou retraites), nous pouvons collecter : prénom, email, téléphone (optionnel), motivation et message libre.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Finalités</h2>
                <p>
                  Vos données sont utilisées uniquement par {brand.practitioner} pour répondre à votre demande, vous tenir informée des prochains événements ou vous transmettre les ressources demandées (guide, dates de cercles, retraites).
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Conservation</h2>
                <p>
                  Vos données sont conservées le temps nécessaire à l'accomplissement des finalités ci-dessus, et au maximum 3 ans après votre dernier contact.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition. Pour exercer ces droits, écrivez à <a href={contact.emailLink} className="link-elegant">{contact.email}</a>.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Cookies</h2>
                <p>
                  Le site n'utilise pas de cookies de tracking publicitaire. Seuls des cookies techniques essentiels au bon fonctionnement du site sont déposés.
                </p>
                <p className="text-xs text-text-soft mt-2">
                  À compléter si analytics / outils tiers ajoutés ultérieurement.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Sécurité</h2>
                <p>
                  Vos données sont stockées sur des infrastructures sécurisées. Aucune donnée n'est transmise à des tiers à des fins commerciales.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
