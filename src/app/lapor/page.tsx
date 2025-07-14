"use client";

import { CameraModal } from "@/components/camera-modal";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, MessageSquare, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";


export default function LaporPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState<{
        blob: Blob;
        dataUrl: string;
    } | null>(null);
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

    const categories = [
        "Keluhan mengenai fasilitas",
        "Lampu jalan mati di depan musholla mati",
        "Minta tolong ditindaklanjuti ke pengelola ya",
        "Keamanan dan ketertiban",
        "Lingkungan dan kebersihan",
        "Infrastruktur jalan",
        "Pelayanan umum",
        "Lainnya"
    ];

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage({
                    blob: file,
                    dataUrl: e.target?.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraCapture = (imageBlob: Blob, imageDataUrl: string) => {
        setSelectedImage({
            blob: imageBlob,
            dataUrl: imageDataUrl
        });
        setIsCameraModalOpen(false);
    };

    const handleCameraClick = () => {
        setIsCameraModalOpen(true);
    };

    const handleGalleryClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = () => {
        if (!selectedCategory || !description.trim()) {
            alert("Mohon lengkapi kategori dan deskripsi laporan");
            return;
        }
        alert("Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.");
        router.back();
    };

    const handleEmergency = () => {
        alert("🚨 EMERGENCY CALL ACTIVATED! Menghubungi layanan darurat...");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="max-w-md mx-auto h-screen flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-12">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            className="text-white hover:bg-white/10 transition-all duration-200"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-xl font-bold text-white flex-1 text-center mr-10">
                            Buat Laporan
                        </h1>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">

                    {/* Header Text */}
                    {/* <div className="text-center mb-6">
                        <h2 className="text-2xl text-white font-bold mb-2">Tingkatkan kepedulian</h2>
                        <p className="text-white text-lg">kejadian penting dan darurat</p>
                    </div> */}

                    {/* Photo Section */}
                    <div className="bg-white border-0 shadow-lg rounded-lg p-6">
                        <div className="space-y-4">
                            <div
                                className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                                onClick={handleCameraClick}
                            >
                                {selectedImage ? (
                                    <img
                                        src={selectedImage.dataUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <Camera className="w-12 h-12 text-gray-400 mb-2 mx-auto" />
                                        <p className="text-gray-700 font-medium">Ambil foto</p>
                                        <p className="text-gray-500 text-sm">Drag atau Drop gambar disini</p>
                                    </div>
                                )}
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                            />

                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCameraClick}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border-0"
                                >
                                    <Camera className="w-4 h-4 mr-2 text-white" />
                                    Kamera
                                </Button>
                                <Button
                                    onClick={handleGalleryClick}
                                    variant="outline"
                                    className="flex-1 rounded-lg border-gray-300 text-white hover:bg-gray-100"
                                >
                                    <Upload className="w-4 h-4 mr-2 text-white" />
                                    Galeri
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="bg-white border-0 shadow-lg rounded-lg p-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700">Kategori Laporan</h3>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full rounded-lg bg-gray-100 border-gray-300 text-gray-700 border-2">
                                    <SelectValue placeholder="Pilih kategori laporan..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category, index) => (
                                        <SelectItem key={index} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white border-0 shadow-lg rounded-lg p-6">
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-700">Deskripsi</h3>
                            <Textarea
                                placeholder="Jelaskan detail kejadian atau masalah yang ingin dilaporkan..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full resize-none rounded-lg bg-gray-100 border-gray-300 text-gray-700 border-2 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white border-0 shadow-lg rounded-lg p-6">
                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
                            size="lg"
                        >
                            Simpan
                        </Button>
                    </div>

                    {/* Camera Modal */}
                    <CameraModal
                        isOpen={isCameraModalOpen}
                        onClose={() => setIsCameraModalOpen(false)}
                        onCapture={handleCameraCapture}
                        onCancel={() => setIsCameraModalOpen(false)}
                        title="Ambil Foto Laporan"
                        description="Posisikan kamera dan tekan tombol capture untuk mengambil foto"
                    />

                </div>
            </div>
        </div>
    );
}