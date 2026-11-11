"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import creamTile from "./public/reveal/Image ChatGPT 11 nov. 2026, 09_53_42-1.png";
import secondTile from "./public/reveal/Image ChatGPT 11 nov. 2026, 09_53_43-2.png";
import thirdTile from "./public/reveal/Image ChatGPT 11 nov. 2026, 09_53_43-3.png";
import fourthTile from "./public/reveal/Image ChatGPT 11 nov. 2026, 09_53_44-4.png";

const tiles = [creamTile, secondTile, thirdTile, fourthTile];
type Phase = "waiting" | "tiles" | "revealing" | "complete";

export function OpeningReveal({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [mounted, setMounted] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const previousOverflow = document.documentElement.style.overflow;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    let disposed = false;
    let finished = false;
    let locked = false;
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      if (locked) document.documentElement.style.overflow = previousOverflow;
      setPhase("complete");
    };
    if (preference.matches) {
      finish();
      return () => { window.history.scrollRestoration = previousRestoration; };
    }
    document.documentElement.style.overflow = "hidden";
    locked = true;
    const onPreference = () => { if (preference.matches) finish(); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    preference.addEventListener("change", onPreference);
    window.addEventListener("keydown", onKey);

    const images = Array.from(sceneRef.current?.querySelectorAll("img") ?? []);
    // Start from decoded artwork, with a bounded fallback for slow connections.
    const decoded = Promise.allSettled(images.map((image) => image.decode()));
    const timeout = new Promise<void>((resolve) => { timers.push(setTimeout(resolve, 800)); });
    void Promise.race([decoded, timeout]).then(() => {
      if (disposed || finished) return;
      setPhase("tiles");
      timers.push(setTimeout(() => {
        setPhase("revealing");
      }, 1000));
      timers.push(setTimeout(finish, 2350));
    });

    return () => {
      disposed = true;
      timers.forEach(clearTimeout);
      if (locked) document.documentElement.style.overflow = previousOverflow;
      window.history.scrollRestoration = previousRestoration;
      preference.removeEventListener("change", onPreference);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (phase !== "complete") return;
    // Measure after the opening styles and scroll lock have actually cleared.
    const frame = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  return <div className="opening-experience" data-opening={phase} data-lenis-prevent={phase !== "complete" ? true : undefined}>
    {phase !== "complete" && <>
      <div ref={sceneRef} className="opening-scene" aria-hidden="true">
        <div className="opening-tiles">
          {tiles.map((tile, index) => <div className="opening-tile" key={tile.src} style={{ animationDelay: `${index * 240}ms` }}>
            <Image src={tile} alt="" sizes="(max-width: 760px) min(52vw, 245px), clamp(160px, 22vw, 280px)" loading="eager" fetchPriority={index === 0 ? "high" : "auto"} />
          </div>)}
        </div>
      </div>
    </>}
    <div className="opening-page" inert={mounted && phase !== "complete"}>{children}</div>
    <noscript><style>{`.opening-scene{display:none!important}.opening-page{opacity:1!important}.opening-page .hero-media{transform:none!important}`}</style></noscript>
  </div>;
}
