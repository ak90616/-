import Link from "next/link";

const LINKS = [
  { href: "/#shop", label: "商店" },
  { href: "/#featured", label: "精選" },
  { href: "/#gallery", label: "工藝" },
  { href: "/#reviews", label: "評價" },
  { href: "/#contact", label: "聯絡我們" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-5 py-12 text-center">
      <p className="font-display text-2xl tracking-[0.3em] text-[var(--gold)]">鉑金香氛</p>
      <p className="mt-1 text-[0.5rem] tracking-[0.4em] text-[var(--gold)]/35 uppercase">
        Platinum Parfum · Since 2024
      </p>
      <nav className="my-6 flex flex-wrap justify-center gap-6">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[0.55rem] tracking-[0.2em] text-[var(--ink-faint)] uppercase transition-colors hover:text-[var(--gold)]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mx-auto mb-4 h-px w-7 bg-[var(--gold)]" />
      <p className="text-[0.5rem] text-[var(--ink-faint)]/60">
        © 2026 鉑金香氛 Platinum Parfum. All rights reserved.
      </p>
    </footer>
  );
}
