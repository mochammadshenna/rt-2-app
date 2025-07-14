"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowLeft, Camera, Cctv, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full max-w-md mx-auto relative mobile-container bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            {children}
        </div>
    );
};

const cameraLocations = [
    {
        id: 1,
        name: "Kamera 1",
        description: "Kamera di jalan musholla"
    },
    {
        id: 2,
        name: "Kamera 2",
        description: "Kamera di depan Zum Zum"
    },
    {
        id: 3,
        name: "Kamera 3",
        description: "Kamera di jalan Jelutung"
    },
    {
        id: 4,
        name: "Kamera 4",
        description: "Kamera di jalan Tengah"
    },
];

export default function CCTVPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return (
        <MobileContainer>
            <div className="flex flex-col h-screen">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-12">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            className="text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Button>

                        <div className="flex items-center space-x-2">
                            <Cctv className="h-6 w-6 text-white" />
                            <h1 className="text-2xl font-bold text-white">CCTV</h1>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    {/* Status Card */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                                        <Monitor className="h-5 w-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Camera Status</h3>
                                        <p className="text-sm text-gray-600">All cameras off</p>
                                    </div>
                                </div>
                                <div className="h-3 w-3 bg-yellow-400 rounded-full animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Camera Grid Placeholder */}
                    <div className="grid grid-cols-2 gap-4">
                        {cameraLocations.map((camera) => (
                            <Card key={camera.id} className="bg-white border-gray-200">
                                <CardContent className="p-4">
                                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="font-medium text-gray-800 text-sm">{camera.name}</h4>
                                        <p className="text-xs text-gray-600">{camera.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Card */}
                    <Card className="bg-white border-gray-200">
                        <CardContent className="p-6 text-center">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="p-4 bg-gray-100 rounded-full">
                                    <Cctv className="h-8 w-8 text-gray-700" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Pengawasan Keamanan</h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        CCTV monitoring akan ditampilkan di sini. Kamera keamanan untuk melihat langsung.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alert Card */}
                    <Card className="bg-amber-500/10 border-amber-500/20">
                        <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-amber-700 text-sm">Dalam Pengembangan</h4>
                                    <p className="text-xs text-amber-600 mt-1">
                                        Fitur CCTV akan tersedia di sini
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MobileContainer>
    );
}