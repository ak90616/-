"use client";

import { useEffect } from "react";

/** Adds `.aurum-in` to `.aurum-rv` elements as they scroll into view. */
export function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".aurum-rv");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aurum-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
