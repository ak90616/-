"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

const NAV_LINKS = [
  { href: "/#shop", label: "商店", section: "shop" },
  { href: "/#featured", label: "精選", section: "featured" },
  { href: "/#gallery", label: "工藝", section: "gallery" },
  { href: "/#reviews", label: "評價", section: "reviews" },
  { href: "/#contact", label: "聯絡", section: "contact" },
];

const SECTION_IDS = ["hero", "shop", "featured", "gallery", "reviews", "contact"];

export function StoreHeader() {
  const { totalQuantity, toggleCart } = useCart();
  const [sticky, setSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setSticky(window.scrollY > 50);
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 px-5 py-4 transition-colors duration-500 sm:px-10 ${
          sticky ? "border-b border-[var(--line)] bg-[var(--bg)]/95 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="font-display flex items-baseline gap-2 text-[var(--gold)]">
            <span className="text-lg tracking-[0.3em]">鉑金香氛</span>
            <span className="hidden text-[0.6rem] tracking-[0.25em] text-[var(--gold)]/45 italic sm:inline">
              Platinum Parfum
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-[0.62rem] tracking-[0.24em] uppercase transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[var(--gold)] after:transition-all ${
                  activeSection === link.section
                    ? "text-[var(--gold-light)] after:w-full"
                    : "text-[var(--ink-soft)] hover:text-[var(--gold-light)] hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={toggleCart}
              className="relative flex items-center gap-2 text-[0.62rem] tracking-[0.2em] text-[var(--ink-soft)] uppercase transition-colors hover:text-[var(--gold)]"
            >
              <span className="relative inline-block h-5 w-5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-current" fill="none" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalQuantity > 0 && (
                  <span
                    key={totalQuantity}
                    className="animate-pop absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold-gradient text-[0.6rem] text-black"
                  >
                    {totalQuantity}
                  </span>
                )}
              </span>
              購物車
            </button>
            <Link
              href="/#shop"
              className="rounded-none bg-gold-gradient px-5 py-2.5 text-[0.58rem] tracking-[0.26em] text-black uppercase shadow-md shadow-[#c9a35a]/25 transition-transform hover:scale-105"
            >
              立即選購
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="開啟選單"
            className="flex flex-col gap-1.5 md:hidden"
          >
            <span className="block h-px w-5 bg-[var(--gold)]" />
            <span className="block h-px w-5 bg-[var(--gold)]" />
            <span className="block h-px w-5 bg-[var(--gold)]" />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[var(--bg)]/98 backdrop-blur">
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="關閉選單"
            className="absolute top-6 right-6 text-2xl text-[var(--gold)]"
          >
            ✕
          </button>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-3xl font-light tracking-wide text-[var(--ink)] transition-colors hover:text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
