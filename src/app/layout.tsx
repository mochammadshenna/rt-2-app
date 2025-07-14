import { FloatingMessageButton } from "@/components/floating-message-button";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "RT Community App",
    description: "Rukun Tetangga Community Management Application",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
                <FloatingMessageButton />
            </body>
        </html>
    );
}