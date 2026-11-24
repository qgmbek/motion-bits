"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav/Nav";
import StarOnGithub from "./StarOnGithub/StarOnGithub";

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="Motion Bits" className="logo" />
      <Nav />
      <StarOnGithub />
    </>
  );
}
