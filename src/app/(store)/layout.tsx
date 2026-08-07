import { StoreHeader } from "@/components/store/StoreHeader";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 w-full">{children}</div>
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">
          極簡商店 · 示範用電商網站
        </div>
      </footer>
    </>
  );
}
