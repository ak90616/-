import Link from "next/link";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-[var(--line)] bg-[var(--surface)] p-5">
        <div>
          <Link href="/admin" className="font-display text-lg text-[var(--ink)]">
            後台管理
          </Link>
          <p className="mt-1 text-xs tracking-widest text-[var(--gold-deep)]">
            PLATINUM PARFUM
          </p>
        </div>
        <AdminNav />
        <div className="mt-auto border-t border-[var(--line)] pt-4">
          <p className="mb-2 truncate text-xs text-[var(--ink-faint)]">{session?.email}</p>
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-[var(--ink-soft)] hover:text-[var(--gold-deep)]">
              回到前台
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
