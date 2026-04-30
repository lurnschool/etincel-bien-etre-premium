# Déployer Etincel de bien être en production

Le site fonctionne déjà sur GitHub Pages (vitrine statique), mais pour que le **panier Stripe**, le **chat IA Anthropic** et les **emails Resend** soient actifs il faut un hébergement Node — Vercel est recommandé. Cette procédure prend ~30 minutes la première fois.

---

## 1 — Créer les comptes externes (5 min)

| Service       | URL                          | Pour quoi                                |
|---------------|------------------------------|------------------------------------------|
| Stripe        | https://stripe.com           | Paiement panier + abonnement Le Cercle   |
| Resend        | https://resend.com           | Envois email (formulaires + confirmations) |
| Anthropic     | https://console.anthropic.com | Chat IA conciergerie                    |
| Vercel        | https://vercel.com           | Hébergement Node (routes API)            |

Choisir des plans **gratuits** au départ — ils suffisent largement pour le trafic d'un site bien-être local.

---

## 2 — Configurer Stripe (10 min)

### a. Créer les produits

Aller dans **Dashboard Stripe → Produits → Catalogue** et créer un produit pour chaque entrée du fichier [src/lib/stripeProducts.ts](src/lib/stripeProducts.ts).

> Astuce : on peut aussi laisser le code générer les produits à la volée à chaque session Checkout (c'est ce que fait `/api/checkout` aujourd'hui via `price_data`). Dans ce cas, pas besoin de pré-créer les produits — Stripe les enregistre automatiquement.

### b. Activer les paiements

Dashboard → **Paiements → Activer le compte** (informations entreprise + RIB Céline).

### c. Récupérer la clé serveur

Dashboard → **Developers → API keys** → copier la **Secret key** (`sk_live_...`).

### d. Créer le webhook

Dashboard → **Developers → Webhooks → Add endpoint**
- **Endpoint URL**  : `https://etinceldebienetre.fr/api/stripe-webhook`
- **Évènements à écouter** : `checkout.session.completed`
- Copier le **Signing secret** (`whsec_...`)

---

## 3 — Configurer Resend (5 min)

### a. Vérifier le domaine d'envoi

Dashboard Resend → **Domains → Add Domain** → `etinceldebienetre.fr`
Resend donne 3 enregistrements DNS à ajouter (SPF, DKIM, DMARC). Les coller chez le registrar du domaine. Vérification automatique en ~5 min.

### b. Récupérer la clé API

Dashboard → **API Keys → Create API Key** (nom : "Site Etincel" · permissions : "Sending access").
Copier la clé `re_...`.

---

## 4 — Configurer Anthropic (2 min)

Dashboard Anthropic → **API Keys → Create Key** → copier la clé `sk-ant-...`.

---

## 5 — Déployer sur Vercel (10 min)

### a. Connecter le repo

vercel.com → **Add New → Project** → importer `lurnschool/etincel-bien-etre-premium`.
Framework : Next.js (auto-détecté). Laisser tous les autres paramètres par défaut.

### b. Variables d'environnement

Settings → **Environment Variables** — ajouter pour les 3 environnements (Production, Preview, Development) :

| Nom                    | Valeur                                       |
|------------------------|----------------------------------------------|
| `STRIPE_SECRET_KEY`    | `sk_live_...` (depuis Stripe Dashboard)      |
| `STRIPE_WEBHOOK_SECRET`| `whsec_...` (depuis Stripe → Webhooks)       |
| `RESEND_API_KEY`       | `re_...` (depuis Resend Dashboard)           |
| `ANTHROPIC_API_KEY`    | `sk-ant-...` (depuis Anthropic Console)      |
| `RESEND_FROM`          | `Etincel <celine@etinceldebienetre.fr>` (optionnel) |

> ⚠️ Ne **jamais** activer `GITHUB_PAGES=true` sur Vercel — ça forcerait un build statique sans routes API.

### c. Déclencher le premier déploiement

Vercel pousse automatiquement à chaque commit sur `main`. Sinon : **Deployments → Redeploy**.

### d. Brancher le domaine

Settings → **Domains → Add `etinceldebienetre.fr`**.
Vercel donne la valeur du CNAME / des enregistrements A à poser chez le registrar. Compter ~10 min de propagation DNS.

---

## 6 — Premier paiement test (5 min)

1. Sur le site déployé, ajouter une séance au panier.
2. Aller sur `/panier`, cocher la case consentement, cliquer **Régler**.
3. Carte test Stripe : `4242 4242 4242 4242` · date future · CVC `123`.
4. Vérifier :
   - L'utilisateur est redirigé vers `/panier/merci`.
   - L'email arrive dans la boîte de Céline (`etincel33@gmail.com`).
   - L'email arrive dans la boîte du client.
   - La transaction apparaît dans **Stripe Dashboard → Payments**.

Si l'email n'arrive pas : **Resend Dashboard → Logs** pour voir le statut. Souvent un DNS pas encore propagé.

---

## 7 — Activer le chat IA conciergerie

Aucune action — le bouton "Besoin d'être guidée ?" en bas à droite devient automatiquement actif dès que `ANTHROPIC_API_KEY` est posée.

---

## Maintenance

- **Voir les paiements** : https://dashboard.stripe.com/payments
- **Voir les emails envoyés** : https://resend.com/emails
- **Voir les logs serveur** : https://vercel.com/<équipe>/etincel-bien-etre-premium/logs
- **Voir les sessions IA** : https://console.anthropic.com/usage

## Coûts indicatifs (trafic local typique)

| Service    | Plan gratuit            | Au-delà                                  |
|------------|-------------------------|------------------------------------------|
| Vercel     | 100 GB-hours / mois     | 20 USD/mois (Pro)                        |
| Resend     | 3 000 emails/mois       | 0,40 USD pour 1 000 emails au-delà        |
| Anthropic  | Crédit initial offert   | ~0,001 USD par message Haiku             |
| Stripe     | Pas d'abonnement        | 1,5 % + 0,25 € par paiement européen     |

Pour un cabinet bien-être avec ~10 paiements/mois, le coût total sera **< 5 € / mois** (essentiellement les frais Stripe).

---

## En cas de problème

1. Vérifier la page [Vercel Status](https://www.vercel-status.com/) et [Stripe Status](https://status.stripe.com/).
2. Vérifier les logs Vercel pour la route concernée.
3. Tester l'API directement via cURL :
   ```bash
   curl -X POST https://etinceldebienetre.fr/api/contact \
     -H 'Content-Type: application/json' \
     -d '{"intent":"contact","contact":{"firstname":"Test","email":"test@example.com"}}'
   ```
4. Si l'API renvoie 503 + `fallback: true` → c'est qu'une variable d'env est manquante.
