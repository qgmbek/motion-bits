import { Red_Hat_Text } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav/Nav";
import StarOnGithub from "./components/StarOnGithub/StarOnGithub";

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
      <body className={redHatText.variable}>
        <Nav />
        <StarOnGithub />
        {children}
      </body>
    </html>
  );
}
