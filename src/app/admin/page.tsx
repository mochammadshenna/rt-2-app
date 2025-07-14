"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
            <div className="max-w-md mx-auto h-screen flex flex-col relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pt-4">
                    <div className="flex items-center space-x-4 w-full">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            className="text-white hover:bg-white/10 p-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex-1 flex justify-start">
                            <h1 className="text-xl font-bold text-white">Admin</h1>
                        </div>
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Settings
                                className="w-6 h-6 text-white"
                            />
                        </div>
                    </div>

                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    {/* Main Content Card */}
                    <div className="bg-white shadow-lg border-0 rounded-2xl p-6">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                                <Settings
                                    className="w-8 h-8 text-white mx-auto"
                                />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 text-center">
                                Admin Panel
                            </h2>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-3">
                            <Card className="bg-[var(--card-pastel-blue)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Manajemen Warga
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Manajemen akun pengguna dan izin
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-mint)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Buku Iuran Warga
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Pembayaran iuran warga
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-purple)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Kas Rukun Tetangga
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Rekap keuangan Rukun Tetangga
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-yellow)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Pengawasan Lingkungan
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Pantau kejadian keamanan lingkungan
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                onClick={handleBack}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
                                size="lg"
                            >
                                Kembali
                            </Button>
                        </div>
                    </div>
                </div>

            </div >
        </div>
    );
}