import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact } from "../LegalPage";
import { legalDocuments } from "../documents";

export const metadata: Metadata = { title: "Privacy Policy | Motion Bits" };

export default function Privacy() {
  const hostPolicy = process.env.LEGAL_HOST_PRIVACY_URL?.trim();
  const hostPolicyUrl = hostPolicy && URL.canParse(hostPolicy) ? new URL(hostPolicy) : undefined;
  const publicHostPolicy = hostPolicyUrl?.protocol === "https:" && !hostPolicyUrl.username && !hostPolicyUrl.password
    ? hostPolicyUrl.href
    : undefined;

  return (
    <LegalPage
      document="privacy"
      summary="How information is handled when you visit Motion Bits, open a demo, contact the project, or send support."
      sections={[
        {
          id: "operator",
          title: "Who runs Motion Bits",
          content: <p>Motion Bits is maintained by Khogambek Yersin (<a href="https://github.com/qgmbek">qgmbek</a>). This policy covers the Motion Bits website and information the project receives through contact or support.</p>,
        },
        {
          id: "site-requests",
          title: "Site requests and demos",
          content: (
            <>
              <p>When you load the site, the hosting infrastructure processes connection information such as your IP address, browser information, requested path, and request time. The host may log these details to deliver the site, troubleshoot errors, and protect it from abuse.</p>
              {publicHostPolicy && <p>Read the <a href={publicHostPolicy}>hosting provider’s privacy notice</a> for its data handling practices.</p>}
              <p>The cursor effect and visual controls run in your browser. When you open a code preview, the site’s highlighting endpoint receives the example snippet and its language so it can return formatted code. Some image demos request remote assets from the media hosts listed in the <Link href={legalDocuments.cookies.href}>Cookie Policy</Link>.</p>
            </>
          ),
        },
        {
          id: "contact-and-payments",
          title: "Messages and support",
          content: (
            <>
              <p>If you contact the project, the maintainer receives your message and the contact information you share to answer questions or address reports. Contributions or issues posted publicly on GitHub are also subject to <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy statement</a>.</p>
              <p>Banks and payment platforms process payments through their own services. The maintainer may receive records such as the sender name or platform username, amount, date, reference, and payment status for reconciliation, support, and recordkeeping. Enter payment credentials only through your bank or the payment provider’s checkout.</p>
            </>
          ),
        },
        {
          id: "sharing-and-retention",
          title: "Sharing and retention",
          content: (
            <>
              <p>Hosting, code hosting, media, and payment providers handle information for the services described above. Their services may process information in other countries. Disclosure may also be required by law.</p>
              <p>Log retention depends on the provider and its settings. Messages and support records are kept for as long as needed to respond, maintain financial records, resolve disputes, or meet legal obligations.</p>
            </>
          ),
        },
        {
          id: "choices-and-rights",
          title: "Your choices and rights",
          content: (
            <>
              <p>Depending on applicable law, you may have rights to access, correct, or delete personal information, object to or restrict certain uses, or complain to the relevant privacy authority. Where processing relies on consent, you may withdraw it. Contact the service that handles your data for requests concerning a bank, payment platform, or other external service.</p>
              <LegalContact />
            </>
          ),
        },
      ]}
    />
  );
}
