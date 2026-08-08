"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CHROMELESS_PREFIXES = ["/dashboard"];
const CHROMELESS_ROUTES = new Set(["/login", "/signup", "/reset-password", "/update-password"]);

export default function AppChrome({ children }) {
  const pathname = usePathname() || "/";
  const hideChrome =
    CHROMELESS_ROUTES.has(pathname) ||
    CHROMELESS_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {!hideChrome && <Header />}
      <div className={hideChrome ? "" : "pt-20 md:pt-24"}>{children}</div>
      {!hideChrome && <Footer />}
    </div>
  );
}
