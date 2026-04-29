import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { brand, contact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Etincel de bien être.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader eyebrow="Informations légales" title="Mentions légales" />

      <section className="pb-24">
        <Container size="narrow">
          <Reveal>
            <div className="prose-elegant space-y-8 text-text-medium leading-relaxed">
              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Éditeur du site</h2>
                <p>
                  Le présent site est édité par {brand.practitioner}, exerçant sous l'enseigne {brand.name}.
                  <br />
                  Adresse : {contact.addressMain.street}, {contact.addressMain.city}.
                  <br />
                  Email : <a href={contact.emailLink} className="link-elegant">{contact.email}</a>
                  <br />
                  Téléphone : <a href={contact.phoneLink} className="link-elegant">{contact.phone}</a>
                </p>
                <p className="text-xs text-text-soft mt-3">
                  Statut juridique, numéro SIRET et informations complètes : à compléter avec Céline.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Hébergement</h2>
                <p>
                  Hébergeur : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. <br />
                  <em className="text-xs text-text-soft">À mettre à jour si l'hébergement change.</em>
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Propriété intellectuelle</h2>
                <p>
                  L'ensemble du contenu du site (textes, images, logos, photographies) est la propriété exclusive de {brand.practitioner}, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Responsabilité</h2>
                <p>
                  Les informations présentes sur le site sont données à titre indicatif. Les accompagnements proposés s'inscrivent dans une démarche de bien-être et de développement personnel. Ils ne remplacent pas un suivi médical, psychologique ou thérapeutique conventionnel lorsque celui-ci est nécessaire.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-deep mb-3">Crédits</h2>
                <p>
                  Conception et développement : équipe Lurn Groupe. <br />
                  <em className="text-xs text-text-soft">À compléter avec mentions photographe / illustrateur si applicable.</em>
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
