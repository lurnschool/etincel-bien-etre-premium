import { redirect } from "next/navigation";

/**
 * /etre-guidee → ancre "Boussole" sur la home.
 * Garde l'URL propre pour les liens du header et les partages.
 */
export default function EtreGuideePage() {
  redirect("/#boussole");
}
