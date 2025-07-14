import { FloatingMessageButton } from "@/components/floating-message-button";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rukun Tetangga 02",
    description: "Aplikasi Manajemen Rukun Tetangga",
    openGraph: {
        title: "Rukun Tetangga 02",
        description: "Aplikasi Manajemen Rukun Tetangga",
        url: "https://rt-2-app.vercel.app/", // Replace with your Vercel deployment URL
        siteName: "Rukun Tetangga App",
        images: [
            {
                url: "https://rt-2-app.vercel.app/og-image.svg", // Replace with your Vercel deployment URL
                width: 1200,
                height: 630,
                alt: "Rukun Tetangga 02 Open Graph Image",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
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