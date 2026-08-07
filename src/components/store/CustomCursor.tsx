"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const root = document.querySelector(".theme-aurum");
    root?.classList.add("has-cursor");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    function handleMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      raf = requestAnimationFrame(animateRing);
    }

    function handleOver(e: MouseEvent) {
      if ((e.target as Element)?.closest?.("a,button,[data-cursor-hover]")) {
        root?.classList.add("aurum-hover");
      }
    }
    function handleOut(e: MouseEvent) {
      if ((e.target as Element)?.closest?.("a,button,[data-cursor-hover]")) {
        root?.classList.remove("aurum-hover");
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      cancelAnimationFrame(raf);
      root?.classList.remove("has-cursor", "aurum-hover");
    };
  }, []);

  return (
    <>
      <div id="aurum-cursor-dot" ref={dotRef} />
      <div id="aurum-cursor-ring" ref={ringRef} />
    </>
  );
}
