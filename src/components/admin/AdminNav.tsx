"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "儀表板", exact: true },
  { href: "/admin/products", label: "商品管理" },
  { href: "/admin/orders", label: "訂單管理" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "bg-gold-gradient text-white shadow-sm shadow-[#c9a35a]/30"
                : "text-[var(--ink-soft)] hover:bg-[var(--bg)]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
