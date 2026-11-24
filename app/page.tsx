import type { Metadata } from "next";
import Landing from "./components/Landing/Landing";

export const metadata: Metadata = {
  title: "Motion Bits — Beyond ordinary",
  description:
    "Expressive React animations for interfaces with a little more feeling. Explore free, open-source text effects, buttons, and interactive components.",
};

export default function Home() {
  return <Landing />;
}
