import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact } from "../LegalPage";
import { legalDocuments } from "../documents";

export const metadata: Metadata = { title: "Terms and Conditions | Motion Bits" };

export default function Terms() {
  return (
    <LegalPage
      document="terms"
      summary="Terms for browsing Motion Bits, using the interactive demos, and reusing the source code."
      sections={[
        {
          id: "site-use",
          title: "Using the site",
          content: <p>Motion Bits provides React animation examples and source code. These terms apply when you use the website. Use it lawfully and respect other people’s rights. Avoid disrupting the site or accessing systems or data without authorization.</p>,
        },
        {
          id: "license",
          title: "Source code and assets",
          content: (
            <>
              <p>The repository makes its software available under the <a href="https://github.com/qgmbek/motion-bits/blob/main/LICENSE">MIT License</a>. It permits use, modification, and redistribution and requires the copyright and license notices to accompany copies or substantial portions of the software.</p>
              <p>Third-party media, models, and dependencies can carry separate terms. The <a href="/models/hero-skull-anatomy.license.txt">hero model credits</a> list the anatomical sources, changes, and Creative Commons attribution requirements. Check the terms for individual assets before reusing them.</p>
            </>
          ),
        },
        {
          id: "external-services",
          title: "External services and support",
          content: <p>External services, including code hosting and payment providers, have their own terms. Contributions are voluntary. The <Link href={legalDocuments.support.href}>support terms</Link> explain payment methods, recurring support, and how to raise a payment issue.</p>,
        },
        {
          id: "availability",
          title: "Availability and responsibility",
          content: <p>The website and demos are provided as available. Features, examples, and links can change. Evaluate and test components for your own project, including accessibility and browser support. To the extent permitted by applicable law, the website is provided without warranties. Mandatory rights and remedies under applicable law still apply.</p>,
        },
        {
          id: "changes",
          title: "Changes to these terms",
          content: <p>Updates appear on this page with a revised date. Where the law requires additional notice or agreement, those requirements apply.</p>,
        },
        {
          id: "contact",
          title: "Questions and rights concerns",
          content: (
            <>
              <LegalContact />
              <p>For a concern about material on the site, include the page address, the material at issue, and enough information to follow up.</p>
            </>
          ),
        },
      ]}
    />
  );
}
