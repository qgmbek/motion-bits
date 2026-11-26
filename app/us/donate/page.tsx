import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Bitcoin, Coffee, Github, Landmark, WalletCards } from "lucide-react";
import { legalDocuments } from "../../legal/documents";
import CopyIban from "./CopyIban";
import styles from "./donate.module.css";

export const metadata: Metadata = {
  title: "Support Motion Bits",
  description: "Support the development of Motion Bits, an open source React animation library.",
};

const repository = "https://github.com/qgmbek/motion-bits";

function checkoutUrl(value?: string, domain?: string) {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password) return undefined;
    if (domain && url.hostname !== domain && !url.hostname.endsWith(`.${domain}`)) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

// ISO 13616 formats and checksum. This catches typos before a recipient is shown.
function bankAccount(country: "MN" | "KZ", bankName?: string, accountName?: string, value?: string) {
  const bank = bankName?.trim();
  const recipient = accountName?.trim();
  const iban = value?.replace(/\s/g, "").toUpperCase();
  const format = country === "MN" ? /^MN\d{18}$/ : /^KZ\d{5}[A-Z0-9]{13}$/;
  if (!bank || !recipient || !iban || !format.test(iban)) return undefined;

  const checkDigits = (iban.slice(4) + iban.slice(0, 4)).replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55));
  let remainder = 0;
  for (const digit of checkDigits) remainder = (remainder * 10 + Number(digit)) % 97;
  if (remainder !== 1) return undefined;

  return { bank, recipient, iban };
}

export default function Donate() {
  const mongolia = bankAccount("MN", process.env.DONATE_MN_BANK, process.env.DONATE_MN_RECIPIENT, process.env.DONATE_MN_IBAN);
  const kazakhstan = bankAccount("KZ", process.env.DONATE_KZ_BANK, process.env.DONATE_KZ_RECIPIENT, process.env.DONATE_KZ_IBAN);
  const kaspi = checkoutUrl(process.env.DONATE_KASPI_URL, "kaspi.kz");
  const qrPath = process.env.DONATE_QPAY_QR?.trim();
  const qpayQr = qrPath && /^\/donate\/[a-z\d_-]+\.(png|jpe?g|webp)$/i.test(qrPath) ? qrPath : undefined;
  const crypto = checkoutUrl(process.env.DONATE_CRYPTO_URL);

  const countries = [
    { name: "Mongolia", currency: "MNT", symbol: "₮", account: mongolia, provider: "QPay", guide: "https://qpay.mn/p/static-qr", qr: qpayQr },
    { name: "Kazakhstan", currency: "KZT", symbol: "₸", account: kazakhstan, provider: "Kaspi Pay", guide: "https://guide.kaspi.kz/partner/ru/pos/payments/remote/q2019", checkout: kaspi },
  ];

  const platforms = [
    { name: "GitHub Sponsors", purpose: "Open source sponsorship", icon: Github, url: checkoutUrl(process.env.DONATE_GITHUB_SPONSORS_URL, "github.com"), guide: "https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors" },
    { name: "Ko-fi", purpose: "One-time tips", icon: Coffee, url: checkoutUrl(process.env.DONATE_KOFI_URL, "ko-fi.com"), guide: "https://help.ko-fi.com/hc/en-us/articles/115003980093-How-do-I-get-paid" },
    { name: "Patreon", purpose: "Monthly support", icon: WalletCards, url: checkoutUrl(process.env.DONATE_PATREON_URL, "patreon.com"), guide: "https://support.patreon.com/hc/en-gb/articles/39694936541965-Payout-guide-for-creators-outside-the-US" },
  ];

  const acceptsSupport = Boolean(mongolia || kazakhstan || kaspi || qpayQr || crypto || platforms.some(({ url }) => url));

  return (
    <main id="main" tabIndex={-1} className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.hero} aria-labelledby="support-title">
          <div className={styles.heroCopy} data-cursor-quiet>
            <p className={styles.eyebrow}>Support Motion Bits</p>
            <h1 id="support-title">Keep it <em>moving<span>.</span></em></h1>
            <p className={styles.lead}>Support the work behind new animations, better examples, and an open source library anyone can use.</p>
            <a href="#ways-to-support" className={styles.primaryLink}>
              Ways to support <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.art} aria-hidden="true" data-cursor-quiet>
            <div className={styles.orbit} />
            <div className={styles.mark}><i /><i /><i /></div>
          </div>
        </section>

        <section id="ways-to-support" className={styles.methods} aria-labelledby="ways-title">
          <div className={styles.sectionHeading}>
            <h2 id="ways-title">Ways to support</h2>
            {!acceptsSupport && <p>Payment setup is pending. The links below explain each option.</p>}
          </div>

          <div className={styles.methodGrid}>
            <article className={`${styles.card} ${styles.bankCard}`}>
              <header className={styles.cardHeader}>
                <Landmark size={19} strokeWidth={1.65} aria-hidden="true" />
                <h3>Bank transfer</h3>
              </header>
              <div className={styles.countryGrid}>
                {countries.map(({ name, currency, symbol, account, provider, guide, qr, checkout }) => (
                  <section className={styles.country} key={currency}>
                    <span className={styles.currencySymbol} aria-hidden="true">{symbol}</span>
                    <div className={styles.countryHeading}>
                      <h4>{name}</h4>
                      <span>{currency}</span>
                    </div>
                    {account && (
                      <details className={styles.transfer}>
                        <summary>Transfer details</summary>
                        <dl>
                          <dt>Bank</dt><dd>{account.bank}</dd>
                          <dt>Recipient</dt><dd>{account.recipient}</dd>
                          <dt>IBAN</dt><dd><CopyIban iban={account.iban} /></dd>
                        </dl>
                        <p>Check the recipient name in your bank app before confirming.</p>
                      </details>
                    )}
                    {qr ? (
                      <details className={styles.transfer}>
                        <summary>Show QPay QR</summary>
                        <Image src={qr} className={styles.qr} alt="Motion Bits QPay payment code" width={180} height={180} unoptimized />
                        <p>Scan with a Mongolian banking app.</p>
                      </details>
                    ) : (
                      <a href={checkout ?? guide} className={styles.textLink}>
                        {checkout ? `Pay with ${provider}` : `About ${provider}`} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}
                  </section>
                ))}
              </div>
            </article>

            <article className={styles.card}>
              <header className={styles.cardHeader}>
                <WalletCards size={19} strokeWidth={1.65} aria-hidden="true" />
                <h3>Creator platforms</h3>
              </header>
              <ul className={styles.platformList}>
                {platforms.map(({ name, purpose, icon: Icon, url, guide }) => (
                  <li key={name}>
                    <a href={url ?? guide} className={styles.platform} aria-label={`${url ? "Support on" : "About"} ${name}`}>
                      <Icon size={19} strokeWidth={1.65} aria-hidden="true" />
                      <span><strong>{name}</strong><small>{purpose}</small></span>
                      <span className={styles.platformAction}>{url ? "Support" : "Guide"} <ArrowUpRight size={14} aria-hidden="true" /></span>
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article className={`${styles.card} ${styles.cryptoCard}`}>
              <header className={styles.cardHeader}>
                <Bitcoin size={19} strokeWidth={1.65} aria-hidden="true" />
                <h3>Crypto</h3>
              </header>
              <div className={styles.cryptoBody}>
                <p>{crypto ? "Use the asset and network shown at checkout." : "Crypto checkout is pending."}</p>
                <a className={styles.textLink} href={crypto ?? "https://docs.btcpayserver.org/Apps/"}>
                  {crypto ? "Open crypto checkout" : "About BTCPay Server"} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
          <Link className={styles.paymentTerms} href={legalDocuments.support.href}>Support and payment terms</Link>
        </section>

        <footer className={styles.footer}>
          <p>A star on GitHub helps people find Motion Bits.</p>
          <a href={repository} className={styles.textLink}><Github size={16} aria-hidden="true" /> View the repository <ArrowUpRight size={14} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  );
}
