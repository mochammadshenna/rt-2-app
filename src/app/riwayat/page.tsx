"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CreditCard, History, Search, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RiwayatPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="container mx-auto px-4 py-6 max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-12">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/")}
                            className="text-white hover:bg-white/10 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </Button>
                        <h1 className="text-2xl font-bold text-white flex-1 text-center mr-10">
                            Riwayat
                        </h1>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <History className="w-6 h-6 text-white" />
                    </div>
                </div>
                {/* Content Area */}
                <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                    <div className="p-8 text-center">
                        <div className="mb-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <History className="w-8 h-8 text-gray-300" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Belum Ada Riwayat
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Riwayat aktivitas Anda akan ditampilkan di sini ketika Anda mulai menggunakan fitur-fitur aplikasi.
                            </p>
                        </div>

                        <div className="space-y-3 text-left">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="text-blue-500" />
                                    <p className="text-sm text-gray-500">
                                        <b>Transaksi dan Iuran</b>
                                    </p>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Search className="text-blue-500" />
                                    <p className="text-sm text-gray-500">
                                        <b>Pencarian dan filter</b>
                                    </p>
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Star className="text-blue-500" />
                                    <p className="text-sm text-gray-500">
                                        <b>Ulasan</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Additional Info Card */}
                <Card className="mt-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                    <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-800 mb-2">
                            Tips Riwayat
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Semua aktivitas Anda akan tersimpan otomatis dan dapat diakses kapan saja untuk kemudahan pelacakan.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}