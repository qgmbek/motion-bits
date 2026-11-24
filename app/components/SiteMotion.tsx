"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { SpiderCursor } from "./Hero/SpiderCursor";

type MotionSettings = {
  accent: string;
  setAccent: Dispatch<SetStateAction<string>>;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
};

const SiteMotionContext = createContext<MotionSettings | null>(null);

export function SiteMotionProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState("#d0ff71");
  const [paused, setPaused] = useState(false);
  const settings = useMemo(
    () => ({ accent, setAccent, paused, setPaused }),
    [accent, paused],
  );

  return (
    <SiteMotionContext.Provider value={settings}>
      {children}
      {!paused && <SpiderCursor />}
    </SiteMotionContext.Provider>
  );
}

export function useSiteMotion() {
  const settings = useContext(SiteMotionContext);
  if (!settings) throw new Error("useSiteMotion requires SiteMotionProvider");
  return settings;
}
