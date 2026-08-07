import { CartProvider } from "@/components/cart/CartProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";
import { QuickViewProvider } from "@/components/store/QuickViewProvider";
import { CustomCursor } from "@/components/store/CustomCursor";
import { ScrollProgress } from "@/components/store/ScrollProgress";
import { ScrollReveal } from "@/components/store/ScrollReveal";
import { StoreHeader } from "@/components/store/StoreHeader";
import { CartSidebar } from "@/components/store/CartSidebar";
import { QuickViewModal } from "@/components/store/QuickViewModal";
import { Footer } from "@/components/store/Footer";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-aurum flex min-h-screen flex-col">
      <ToastProvider>
        <CartProvider>
          <QuickViewProvider>
            <CustomCursor />
            <ScrollProgress />
            <ScrollReveal />
            <StoreHeader />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartSidebar />
            <QuickViewModal />
          </QuickViewProvider>
        </CartProvider>
      </ToastProvider>
    </div>
  );
}
