"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { ArrowLeft, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SwitchRumahPage() {
    const router = useRouter();

    const depokCoordinates = { lat: -6.38784865, lng: 106.81779755 };
    const [currentAddress, setCurrentAddress] = useState("");
    const [currentLatitude, setCurrentLatitude] = useState(depokCoordinates.lat.toFixed(6));
    const [currentLongitude, setCurrentLongitude] = useState(depokCoordinates.lng.toFixed(6));
    const [zoom, setZoom] = useState(13);

    // Component to render inside APIProvider to get map instance
    function MapContent() {
        const map = useMap();

        const handleOpenInMaps = () => {
            if (currentLatitude && currentLongitude) {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${currentLatitude},${currentLongitude}`;
                window.open(mapsUrl, '_blank');
            }
        };

        return (
            <>
                <Map
                    defaultCenter={depokCoordinates}
                    defaultZoom={zoom}
                    gestureHandling={"greedy"}
                    disableDefaultUI={false} // Set to false to enable default UI
                    onCameraChanged={({ detail }) => {
                        if (map) {
                            const newLat = detail.center.lat.toFixed(6);
                            const newLng = detail.center.lng.toFixed(6);
                            setCurrentLatitude(newLat);
                            setCurrentLongitude(newLng);
                            setZoom(detail.zoom);
                        }
                    }}
                />
                <Button onClick={handleOpenInMaps} className="absolute bottom-4 right-4 bg-white text-blue-600 hover:bg-gray-100 shadow-md z-10">
                    Open in Maps
                </Button>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="max-w-md mx-auto h-screen flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-4">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            className="text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">Perbaharui Alamat</h1>
                        <div className="w-10 h-10" /> {/* Spacer for centering */}
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    {/* Main Card */}
                    <Card className="bg-white shadow-lg border-0">
                        {/* <CardHeader className="text-center"> */}
                        {/* <CardTitle className="text-xl font-bold text-[var(--card-text)]">
                                Pilih Alamat
                            </CardTitle>
                            <CardDescription className="text-[var(--muted-foreground)]">
                                Pilih alamat rumah Anda terbaru
                            </CardDescription> */}
                        {/* </CardHeader> */}
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                                    <MapPin className="h-8 w-8 text-blue-500 mr-2" />
                                    <p className="text-lg font-semibold text-gray-800">Lihat Maps</p>
                                </div>

                                {/* Google Map Section */}
                                <div className="w-full h-64 rounded-lg overflow-hidden shadow-md mb-10 relative">
                                    <APIProvider apiKey="AIzaSyB2iHs28PxXZdo54-1UqFoSnHELCeC2ORE">
                                        <MapContent />
                                    </APIProvider>
                                </div>

                                <div>
                                    <Label htmlFor="previous-address" className="text-sm font-medium text-gray-700">Alamat Sebelumnya</Label>
                                    <Input
                                        id="previous-address"
                                        placeholder="Masukkan alamat sebelumnya"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="current-address" className="text-sm font-medium text-gray-700">Alamat Saat Ini</Label>
                                    <Input
                                        id="current-address"
                                        placeholder="Masukkan alamat saat ini"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                        value={currentAddress}
                                        onChange={(e) => setCurrentAddress(e.target.value)} // Allow manual editing
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="latitude" className="text-sm font-medium text-gray-700">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        placeholder="Latitude"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                        value={currentLatitude}
                                        onChange={(e) => setCurrentLatitude(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="longitude" className="text-sm font-medium text-gray-700">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        placeholder="Longitude"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                        value={currentLongitude}
                                        onChange={(e) => setCurrentLongitude(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Deskripsi</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Jelaskan detail perpindahan Anda atau alasan pindah..."
                                        rows={4}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 bg-gray-50 text-gray-800"
                                    />
                                </div>

                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
                                    size="lg"
                                >
                                    Simpan
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Remove Info Cards */}

                </div>
            </div>
        </div>
    );
}