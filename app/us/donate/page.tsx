import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bitcoin, Coffee, Github, Landmark, WalletCards } from "lucide-react";
import RevealMain from "../../components/Reveal/RevealMain";
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

const kofiGuide = "https://help.ko-fi.com/hc/en-us/articles/24482435253661-What-payment-methods-are-available-on-Ko-fi";

export default function Donate() {
  const mongolia = bankAccount("MN", process.env.DONATE_MN_BANK, process.env.DONATE_MN_RECIPIENT, process.env.DONATE_MN_IBAN);
  const kazakhstan = bankAccount("KZ", process.env.DONATE_KZ_BANK, process.env.DONATE_KZ_RECIPIENT, process.env.DONATE_KZ_IBAN);
  const kaspi = checkoutUrl(process.env.DONATE_KASPI_URL, "kaspi.kz");
  const qrPath = process.env.DONATE_QPAY_QR?.trim();
  const qpayQr = qrPath && /^\/donate\/[a-z\d_-]+\.(png|jpe?g|webp)$/i.test(qrPath) ? qrPath : undefined;
  const kofi = checkoutUrl(process.env.DONATE_KOFI_URL, "ko-fi.com");
  const crypto = checkoutUrl(process.env.DONATE_CRYPTO_URL);

  const countries = [
    { name: "Mongolia", currency: "MNT", account: mongolia, provider: "QPay", guide: "https://qpay.mn/p/static-qr", qr: qpayQr },
    { name: "Kazakhstan", currency: "KZT", account: kazakhstan, provider: "Kaspi Pay", guide: "https://guide.kaspi.kz/partner/ru/pos/payments/remote/q2019", checkout: kaspi },
  ];

  const platforms = [
    {
      name: "GitHub Sponsors", purpose: "Open source sponsorship",
      url: checkoutUrl(process.env.DONATE_GITHUB_SPONSORS_URL, "github.com"),
      guide: "https://docs.github.com/en/sponsors/getting-started-with-github-sponsors/about-github-sponsors",
    },
    {
      name: "Patreon", purpose: "Monthly support",
      url: checkoutUrl(process.env.DONATE_PATREON_URL, "patreon.com"),
      guide: "https://support.patreon.com/hc/en-us/articles/203913709-Joining-a-creator-s-Patreon-as-a-paid-member",
    },
  ];

  return (
    <RevealMain className={styles.page}>
      <div className={styles.layout}>
        <header className={styles.hero} data-intro data-reveal="fade up" data-cursor-quiet>
          <h1>Support Motion Bits</h1>
          <p className={styles.lead} data-reveal="fade right" data-reveal-detail>
            Contributions help maintain the library and build new React animations.
          </p>
        </header>

        <section className={styles.featured} aria-labelledby="kofi-title" data-intro data-reveal="fade up" data-cursor-quiet>
          <div className={styles.featuredCopy}>
            <div className={styles.featuredTitle}>
              <span className={styles.kofiIcon}><Coffee size={23} strokeWidth={1.7} aria-hidden="true" /></span>
              <h2 id="kofi-title">Ko-fi</h2>
            </div>
            <p data-reveal="fade up" data-reveal-detail>
              Send a one-time tip as a guest. Payment options depend on your location and payment provider.
            </p>
          </div>
          <div className={styles.featuredActions} data-reveal="slide up" data-reveal-detail data-reveal-step="1">
            {kofi ? (
              <a href={kofi} className={styles.kofiButton}>Donate on Ko-fi <ArrowUpRight size={17} aria-hidden="true" /></a>
            ) : (
              <>
                <span className={styles.status}>Ko-fi checkout pending</span>
                <a href={kofiGuide} className={styles.kofiInfo}>How Ko-fi payments work <ArrowUpRight size={16} aria-hidden="true" /></a>
              </>
            )}
          </div>
        </section>

        <section className={styles.options} id="ways-to-support" aria-labelledby="ways-title">
          <h2 id="ways-title" data-reveal="fade up">More ways to give</h2>
          <div className={styles.methods}>
            <section className={styles.method} id="bank-transfers" aria-labelledby="bank-title" data-reveal="slide right">
              <header className={styles.methodHeading}>
                <Landmark size={22} strokeWidth={1.55} aria-hidden="true" />
                <h3 id="bank-title">Bank transfers</h3>
              </header>
              <div className={styles.routeList}>
                {countries.map(({ name, currency, account, provider, guide, qr, checkout }, index) => (
                  <section className={styles.route} key={currency} aria-labelledby={`bank-${currency}`}
                    data-reveal="fade right" data-reveal-detail data-reveal-step={index || undefined}>
                    <div className={styles.routeRow}>
                      <div>
                        <h4 id={`bank-${currency}`}>{name} <span className={styles.currency}>{currency}</span></h4>
                        <p>{account ? `Transfer in ${currency}` : "IBAN details pending"}</p>
                      </div>
                      {!qr && (
                        <a href={checkout ?? guide} className={styles.routeLink}>
                          {checkout ? `Pay with ${provider}` : `${provider} guide`} <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                    {account && (
                      <details className={styles.transfer}>
                        <summary>View transfer details</summary>
                        <dl>
                          <dt>Bank</dt><dd>{account.bank}</dd>
                          <dt>Recipient</dt><dd>{account.recipient}</dd>
                          <dt>IBAN</dt><dd><CopyIban iban={account.iban} /></dd>
                        </dl>
                        <p>Check the recipient name in your bank app before confirming.</p>
                      </details>
                    )}
                    {qr && (
                      <details className={styles.transfer}>
                        <summary>Show QPay QR</summary>
                        <Image src={qr} className={styles.qr} alt="Motion Bits QPay payment code" width={180} height={180} unoptimized />
                        <p>Scan with a Mongolian banking app.</p>
                      </details>
                    )}
                  </section>
                ))}
              </div>
            </section>

            <section className={styles.method} id="other-platforms" aria-labelledby="platforms-title" data-reveal="slide left" data-reveal-step="1">
              <header className={styles.methodHeading}>
                <WalletCards size={22} strokeWidth={1.55} aria-hidden="true" />
                <h3 id="platforms-title">Other platforms</h3>
              </header>
              <ul className={styles.routeList}>
                {platforms.map(({ name, purpose, url, guide }, index) => (
                  <li className={styles.route} key={name} data-reveal="fade left" data-reveal-detail data-reveal-step={index || undefined}>
                    <div className={styles.routeRow}>
                      <div>
                        <h4>{name}</h4>
                        <p>{purpose}{!url && " · Checkout pending"}</p>
                      </div>
                      <a href={url ?? guide} className={styles.routeLink} aria-label={`${url ? "Support on" : "Read the guide for"} ${name}`}>
                        {url ? "Support" : "Guide"} <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </section>

        <section className={styles.crypto} aria-labelledby="crypto-title" data-reveal="fade up">
          <div className={styles.cryptoLabel}>
            <Bitcoin size={20} strokeWidth={1.6} aria-hidden="true" />
            <h2 id="crypto-title">Crypto</h2>
          </div>
          <p>{crypto ? "Use the asset and network shown at checkout." : "Crypto checkout is pending."}</p>
          <a href={crypto ?? "https://docs.btcpayserver.org/Apps/"} className={styles.textLink}>
            {crypto ? "Open crypto checkout" : "About BTCPay Server"} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </section>

        <footer className={styles.footer} data-reveal="fade up">
          <a href={repository} className={styles.textLink}>
            <Github size={16} aria-hidden="true" /> Star Motion Bits on GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <Link className={styles.terms} href={legalDocuments.support.href}>Support and payment terms</Link>
        </footer>
      </div>
    </RevealMain>
  );
}
