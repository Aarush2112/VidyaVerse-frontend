"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean).slice(1); // Remove empty and 'student' (handled by home)

    return (
        <nav className="flex items-center text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
                <li>
                    <Link href="/student/dashboard" className="flex items-center hover:text-white transition-colors">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const href = `/student/${segments.slice(0, index + 1).join("/")}`;
                    const isLast = index === segments.length - 1;
                    const title = segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

                    return (
                        <Fragment key={href}>
                            <ChevronRight className="h-4 w-4 text-gray-700" />
                            <li>
                                {isLast ? (
                                    <span className="text-white font-medium">{title}</span>
                                ) : (
                                    <Link href={href} className="hover:text-white transition-colors">
                                        {title}
                                    </Link>
                                )}
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
