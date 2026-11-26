export const legalDocuments = {
  terms: { href: "/legal/terms", label: "Terms", title: "Terms and Conditions" },
  privacy: { href: "/legal/privacy", label: "Privacy", title: "Privacy Policy" },
  cookies: { href: "/legal/cookies", label: "Cookies", title: "Cookie Policy" },
  support: { href: "/legal/support", label: "Support terms", title: "Support and Payments" },
} as const;

export type LegalDocument = keyof typeof legalDocuments;

export const lastUpdated = { iso: "2026-11-26", label: "November 26, 2026" };
