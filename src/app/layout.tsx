"use client";

import { FloatingMessageButton } from "@/components/floating-message-button";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body className="antialiased">
                <SessionProvider>
                    {children}
                </SessionProvider>
                {!isLoginPage && <FloatingMessageButton />}
            </body>
        </html>
    );
}