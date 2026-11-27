import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "../LegalPage";
import { legalDocuments } from "../documents";

export const metadata: Metadata = { title: "Cookie Policy | Motion Bits" };

export default function Cookies() {
  return (
    <LegalPage
      document="cookies"
      summary="What Motion Bits keeps in your browser and when an external service may receive a request."
      sections={[
        {
          id: "first-party-storage",
          title: "Site cookies and storage",
          content: (
            <>
              <p>The Motion Bits application sets no first-party cookies and uses no persistent browser storage for its settings. The app has no built-in analytics or advertising trackers.</p>
              <ul>
                <li>Accent and lighting choices live in temporary browser memory and reset on a full reload.</li>
                <li>Collections uses the part of the URL after the hash symbol to open a specific demo from a shared link.</li>
                <li>Your browser can keep its normal history and cache. The hosting service may use its own cookies for security or preview access.</li>
              </ul>
            </>
          ),
        },
        {
          id: "external-services",
          title: "External media and links",
          content: (
            <>
              <p>Some Collections demos load images from Unsplash or the Xbox Store, or sample media from MDN’s GitHub Pages site. When these assets load, your browser contacts the media host, which receives the information needed to serve the request.</p>
              <p>See the <a href="https://unsplash.com/privacy">Unsplash Privacy Policy</a> and the <a href="https://www.microsoft.com/privacy/privacystatement">Microsoft Privacy Statement</a>.</p>
              <p>GitHub and payment providers may also set their own cookies when you open their sites. Each service provides its own controls.</p>
            </>
          ),
        },
        {
          id: "browser-controls",
          title: "Browser controls",
          content: <p>You can manage or clear cookies and site data in your browser settings. For information about site requests, payment records, and privacy rights, see the <Link href={legalDocuments.privacy.href}>Privacy Policy</Link>.</p>,
        },
      ]}
    />
  );
}
