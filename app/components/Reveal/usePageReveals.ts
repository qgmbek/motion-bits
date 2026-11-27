import { useLayoutEffect, type RefObject } from "react";

export function usePageReveals(pageRef: RefObject<HTMLElement | null>, revision?: string) {
  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || typeof IntersectionObserver === "undefined") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

    function prepareReveals() {
      if (preference.matches || !page) return;
      const requiredHeight = (height: number) => Math.min(height * 0.4, window.innerHeight * 0.32);
      const pending = new Map<HTMLElement, HTMLElement[]>();
      const roots: HTMLElement[] = [];
      for (const element of page.querySelectorAll<HTMLElement>("[data-reveal]")) {
        if (element.dataset.revealState) continue;
        const parent = element.parentElement?.closest<HTMLElement>("[data-reveal]");
        const followups = parent && pending.get(parent);
        if (followups) {
          followups.push(element);
          pending.set(element, []);
          continue;
        }

        const { top, bottom, height } = element.getBoundingClientRect();
        if (!height) continue;
        const visibleHeight = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
        if (element.hasAttribute("data-intro") || (bottom > 0 && visibleHeight < requiredHeight(height))) {
          roots.push(element);
          pending.set(element, []);
        }
      }

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          const state = element.dataset.revealState;
          if (state === "settled") {
            observer.unobserve(element);
            continue;
          }

          const { top, bottom, height } = entry.boundingClientRect;
          const visibleHeight = Math.min(bottom, window.innerHeight) - Math.max(top, 0);
          if (state === "entered" && visibleHeight <= 0) element.dataset.revealState = "paused";
          if ((state === "waiting" || state === "paused") && height && visibleHeight >= requiredHeight(height)) {
            element.dataset.revealState = "entered";
          }
        }
      }, { threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4] });

      const settle = (element: HTMLElement) => {
        const followups = pending.get(element);
        if (!followups || element.dataset.revealState === "settled") return;
        element.dataset.revealState = "settled";
        observer.unobserve(element);
        for (const child of followups) {
          if (child.dataset.revealState === "waiting") observer.observe(child);
        }
      };

      const finishReveal = (event: AnimationEvent) => {
        if (!(event.target instanceof HTMLElement)) return;
        const state = event.target.dataset.revealState;
        if (state === "entered" || state === "paused") settle(event.target);
      };
      const revealFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        let element = event.target.closest<HTMLElement>("[data-reveal]");
        while (element && page.contains(element)) {
          settle(element);
          element = element.parentElement?.closest<HTMLElement>("[data-reveal]") ?? null;
        }
      };

      page.addEventListener("animationend", finishReveal);
      page.addEventListener("focusin", revealFocused);
      for (const element of pending.keys()) element.dataset.revealState = "waiting";
      for (const element of roots) observer.observe(element);

      return () => {
        observer.disconnect();
        page.removeEventListener("animationend", finishReveal);
        page.removeEventListener("focusin", revealFocused);
        for (const element of pending.keys()) {
          if (element.dataset.revealState === "waiting") delete element.dataset.revealState;
          if (element.dataset.revealState === "entered" || element.dataset.revealState === "paused") {
            element.dataset.revealState = "settled";
          }
        }
      };
    }

    let cleanup = prepareReveals();
    const refresh = () => {
      cleanup?.();
      cleanup = prepareReveals();
    };
    preference.addEventListener("change", refresh);
    return () => {
      preference.removeEventListener("change", refresh);
      cleanup?.();
    };
  }, [pageRef, revision]);
}
