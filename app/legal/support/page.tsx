import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { LegalContact } from "../LegalPage";
import { legalDocuments } from "../documents";

export const metadata: Metadata = { title: "Support and Payments | Motion Bits" };

export default function SupportTerms() {
  return (
    <LegalPage
      document="support"
      summary="How voluntary contributions, recurring payments, and payment questions work."
      sections={[
        {
          id: "contributions",
          title: "Voluntary contributions",
          content: <p>Contributions help fund the development and maintenance of Motion Bits. The library’s open source license applies independently of any contribution. Your bank or payment provider supplies the transaction confirmation.</p>,
        },
        {
          id: "payment-methods",
          title: "Banks and payment platforms",
          content: <p>Available methods appear on the <Link href="/us/donate">Donate page</Link>. Your bank or payment provider handles the transaction and sets any processing fees and exchange rates. Confirm the recipient, currency, and amount before sending. If a crypto checkout is available, use the asset and network shown there. Confirmed blockchain transfers are generally irreversible.</p>,
        },
        {
          id: "recurring-support",
          title: "Recurring support",
          content: <p>If you choose a recurring contribution on a provider’s site, that provider shows the billing schedule and manages future charges. Change or cancel the contribution through the provider before the next charge, according to its terms.</p>,
        },
        {
          id: "payment-issues",
          title: "Mistaken payments and refunds",
          content: (
            <>
              <p>If a payment is incorrect, duplicated, or unauthorized, contact the bank or platform that processed it promptly. Available remedies depend on the method, provider rules, and applicable law.</p>
              <p>If you need help identifying a payment, use a private channel and share the date, amount, currency, and a transaction reference. Keep your card number, banking credentials, and wallet keys private.</p>
              <LegalContact />
              <p>The <Link href={legalDocuments.privacy.href}>Privacy Policy</Link> describes how the project handles support records.</p>
            </>
          ),
        },
      ]}
    />
  );
}
