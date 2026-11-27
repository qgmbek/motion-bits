import { Instrument_Serif, Manrope, Red_Hat_Text } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import SiteFooter from "./components/SiteFooter";
import { SiteMotionProvider } from "./components/SiteMotion";

// Fail the build if a page starts depending on request-time server rendering.
export const dynamic = "error";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const redHatText = Red_Hat_Text({
  variable: "--font-red-hat-text",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${redHatText.variable} ${manrope.variable} ${instrumentSerif.variable}`}>
        <SiteMotionProvider>
          <Nav />
          {children}
          <SiteFooter />
        </SiteMotionProvider>
      </body>
    </html>
  );
}
