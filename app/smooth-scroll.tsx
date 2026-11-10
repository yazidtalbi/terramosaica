"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let stopParallax = () => {};
    const startParallax = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      const separators = Array.from(document.querySelectorAll<HTMLElement>("[data-separator-reveal]"));
      const offsets = new Map<HTMLElement, number>();
      let frame = 0;
      let disposed = false;
      const render = () => {
        frame = 0;
        const height = window.innerHeight;
        const mobileScale = window.innerWidth <= 760 ? 0.45 : 1;
        // Read geometry before writing styles; subtract our own translation
        // so scroll positions do not feed back into the next frame.
        const updates = elements.map((element) => {
          const rect = element.getBoundingClientRect();
          const top = rect.top - (offsets.get(element) ?? 0);
          const speed = Number(element.dataset.parallax) || 0;
          const limit = (Number(element.dataset.parallaxLimit) || 40) * mobileScale;
          const distance = (height / 2 - top - rect.height / 2) * speed * mobileScale;
          const offset = element.matches(":focus-within") ? 0 : Math.max(-limit, Math.min(limit, distance));
          return { element, offset };
        });
        const reveals = separators.map((element) => {
          // This text belongs to the scrolling foreground, not the sticky image.
          const rect = element.getBoundingClientRect();
          const top = rect.top + rect.height / 2;
          const progress = Math.max(0, Math.min(1, (height * 0.88 - top) / (height * 0.3)));
          return { element, progress: progress * progress * (3 - 2 * progress) };
        });
        updates.forEach(({ element, offset }) => {
          offsets.set(element, offset);
          element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        });
        reveals.forEach(({ element, progress }) => element.style.setProperty("--separator-reveal", progress.toFixed(4)));
      };
      const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(render); };
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      document.addEventListener("focusin", schedule);
      document.addEventListener("focusout", schedule);
      void document.fonts.ready.then(schedule);
      schedule();
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        document.removeEventListener("focusin", schedule);
        document.removeEventListener("focusout", schedule);
        elements.forEach((element) => element.style.removeProperty("--parallax-y"));
        separators.forEach((element) => element.style.removeProperty("--separator-reveal"));
      };
    };
    const update = () => {
      lenis?.destroy();
      stopParallax();
      lenis = preference.matches ? undefined : new Lenis({ autoRaf: true, anchors: true, duration: 1.15 });
      stopParallax = preference.matches ? () => {} : startParallax();
    };
    update();
    preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); lenis?.destroy(); stopParallax(); };
  }, []);
  return null;
}
