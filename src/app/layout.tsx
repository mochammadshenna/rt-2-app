import { FloatingMessageButton } from "@/components/floating-message-button";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rukun Tetangga 02",
    description: "Aplikasi Manajemen Rukun Tetangga",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>
            <body className="antialiased">
                {children}
                <FloatingMessageButton />
            </body>
        </html>
    );
}