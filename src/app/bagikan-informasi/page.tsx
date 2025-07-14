"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, FileText, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BagikanInformasiPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="max-w-md mx-auto h-screen flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-4">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleBack}
                            className="text-white hover:bg-white/10 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="text-2xl font-bold text-white">Bagikan Informasi</h1>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <Share2
                            className="w-6 h-6 text-white"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    {/* Main Content Card */}
                    <div className="bg-white shadow-lg border-0 rounded-2xl p-6">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                                <Share2
                                    className="w-8 h-8 text-white"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Bagikan Informasi
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                Bagikan informasi dengan Warga agar tetap tahu tentang pembaruan dan pengumuman penting.
                            </p>
                        </div>
                    </div>
                    <br />

                    {/* Feature Cards */}
                    <div className="space-y-4">
                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <FileText
                                        className="w-5 h-5 text-white"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Pengumuman</h3>
                                    <p className="text-sm text-gray-600">Bagikan pengumuman penting dengan Warga</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <Book
                                        className="w-5 h-5 text-white"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Edukasi</h3>
                                    <p className="text-sm text-gray-600">Bagikan pengetahuan dan sumber daya</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <Share2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Acara</h3>
                                    <p className="text-sm text-gray-600">Kegiatan Lingkungan Warga</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-lg rounded-2xl p-6">
                        <div className="text-center space-y-3">
                            <h3 className="text-white font-semibold">Siap Berbagi?</h3>
                            <p className="text-white/90 text-sm">
                                Mulai berbagi informasi berharga dengan Warga
                            </p>
                            <Button className="bg-white text-blue-600 hover:bg-white/90 transition-colors font-medium px-6">
                                Buat Postingan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}