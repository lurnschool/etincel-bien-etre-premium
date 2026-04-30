import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { brand, contact, navigation, navigationActions, disclaimers } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { Etincelle } from "@/components/ui/Etincelle";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const navColumn1 = [...navigation];
  const navColumn2 = [
    ...navigationActions,
    { label: "À propos", href: "/a-propos" },
    { label: "Formations", href: "/formations" },
    { label: "Évènements", href: "/evenements" },
    { label: "Cercles de femmes", href: "/cercles-de-femmes" },
    { label: "Féminin sacré", href: "/feminin-sacre" },
    { label: "Innerdance", href: "/innerdance" },
  ];

  return (
    <footer className="relative bg-bg-deep text-text-on-dark overflow-hidden mt-24">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent/30 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gold/20 blur-[120px]" />
      </div>
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-gold">
                <Etincelle size={24} />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl">{brand.name}</span>
                <span className="font-display-italic text-xs tracking-[0.32em] uppercase text-gold-soft mt-1">
                  Céline Dusseval
                </span>
              </div>
            </div>
            <p className="text-sm text-text-on-dark-soft leading-relaxed">
              {brand.shortDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={contact.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={contact.social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold transition-colors"
              >
                <FacebookIcon size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-text-on-dark">Naviguer</h4>
            <ul className="space-y-2.5">
              {navColumn1.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-on-dark-soft hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-text-on-dark">Explorer</h4>
            <ul className="space-y-2.5">
              {navColumn2.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-on-dark-soft hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-5 text-text-on-dark">Me joindre</h4>
            <ul className="space-y-3.5 text-sm text-text-on-dark-soft">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <a href={contact.phoneLink} className="hover:text-gold transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <a href={contact.emailLink} className="hover:text-gold transition-colors break-all">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
                <div>
                  <div>{contact.addressMain.street}</div>
                  <div>{contact.addressMain.city}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-text-on-dark-soft/60">
                    Aussi à {contact.addressSecondary.label}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 space-y-6">
          <p className="text-xs text-text-on-dark-soft/70 leading-relaxed max-w-4xl">
            {disclaimers.bienEtre}
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-text-on-dark-soft/60">
            <p>
              © {currentYear} {brand.name} · {brand.practitioner}. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/mentions-legales" className="hover:text-gold transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-gold transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
