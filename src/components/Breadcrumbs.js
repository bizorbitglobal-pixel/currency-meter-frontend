"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import Script from "next/script";

export default function Breadcrumbs() {
    const pathname = usePathname();

    // Hide on homepage
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter((item) => item !== "");

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return { href, label };
    });

    // JSON-LD Schema
    const breadcrumbListSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.currencystrengthsmeters.com",
            },
            ...breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: crumb.label,
                item: `https://www.currencystrengthsmeters.com${crumb.href}`,
            })),
        ],
    };

    return (
        <>
            <nav
                aria-label="Breadcrumb"
                className="relative w-full transition-colors duration-300"
            >
                <div className="max-w-6xl mx-auto px-4 py-3">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                title="Home"
                            >
                                <Home className="w-4 h-4" />
                            </Link>
                        </li>
                        {breadcrumbs.map((crumb, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <li key={crumb.href} className="flex items-center">
                                    <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                                    {isLast ? (
                                        <span
                                            className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-[200px] sm:max-w-none"
                                            aria-current="page"
                                        >
                                            {crumb.label}
                                        </span>
                                    ) : (
                                        <Link
                                            href={crumb.href}
                                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                                        >
                                            {crumb.label}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </nav>

            {/* Structured Data */}
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
            />
        </>
    );
}
