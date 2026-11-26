import type { Metadata } from "next";
import Landing from "./components/Landing/Landing";

export const metadata: Metadata = {
  title: "Motion Bits | React animations",
  description: "Open source React animations for text, buttons, and interfaces.",
};

export default function Home() {
  return <Landing />;
}
