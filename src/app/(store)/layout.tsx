import { StoreHeader } from "@/components/store/StoreHeader";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">{children}</div>
      </main>
      <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <p className="font-display text-lg tracking-wide text-[var(--ink)]">鉑金香氛</p>
          <p className="mt-2 text-xs tracking-widest text-[var(--ink-faint)]">
            PLATINUM PARFUM · 馥郁尊寵,鉑金之選
          </p>
        </div>
      </footer>
    </>
  );
}
