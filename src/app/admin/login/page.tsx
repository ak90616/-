"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "登入失敗");
        return;
      }
      const next = searchParams.get("next") ?? "/admin";
      router.push(next);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4">
      <form
        onSubmit={handleSubmit}
        className="animate-fade-up w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 shadow-xl shadow-black/5"
      >
        <p className="text-xs tracking-[0.3em] text-[var(--gold-deep)]">PLATINUM PARFUM</p>
        <h1 className="font-display mt-2 mb-1 text-2xl text-[var(--ink)]">後台管理登入</h1>
        <p className="mb-6 text-sm text-[var(--ink-soft)]">請輸入管理員帳號密碼</p>

        <label className="mb-1.5 block text-sm text-[var(--ink-soft)]" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm outline-none transition-shadow focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-light)]"
        />

        <label className="mb-1.5 block text-sm text-[var(--ink-soft)]" htmlFor="password">
          密碼
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-5 w-full rounded-lg border border-[var(--line)] px-4 py-2.5 text-sm outline-none transition-shadow focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold-light)]"
        />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold-gradient px-4 py-3 text-sm text-white shadow-md shadow-[#c9a35a]/30 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? "登入中…" : "登入"}
        </button>

        <p className="mt-5 text-center text-xs text-[var(--ink-faint)]">
          預設帳號:admin@example.com / admin123
        </p>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
