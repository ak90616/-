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
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-60 shrink-0 border-r bg-white p-4 flex flex-col gap-6">
        <div>
          <Link href="/admin" className="text-lg font-bold">
            後台管理
          </Link>
          <p className="text-xs text-gray-400 mt-1">極簡商店</p>
        </div>
        <AdminNav />
        <div className="mt-auto border-t pt-4">
          <p className="text-xs text-gray-400 mb-1">{session?.email}</p>
          <div className="flex items-center justify-between">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
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
