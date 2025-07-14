import { FloatingMessageButton } from "@/components/floating-message-button";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rukun Tetangga 02",
    description: "Aplikasi Manajemen Rukun Tetangga",
    openGraph: {
        title: "Rukun Tetangga 02",
        description: "Aplikasi Manajemen Rukun Tetangga",
        url: "YOUR_ACTUAL_VERCEL_DEPLOYMENT_URL", // IMPORTANT: Replace this with your live Vercel URL (e.g., https://your-project-name.vercel.app/)
        siteName: "Rukun Tetangga App",
        images: [
            {
                url: "YOUR_ACTUAL_VERCEL_DEPLOYMENT_URL/og-image.svg", // IMPORTANT: Replace this with your live Vercel URL (e.g., https://your-project-name.vercel.app/)
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