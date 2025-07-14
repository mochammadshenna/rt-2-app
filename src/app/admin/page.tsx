"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const MobileContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] relative">
            {children}
        </div>
    );
};

export default function AdminPage() {
    const router = useRouter();

    const handleBack = () => {
        router.push("/");
    };

    return (
        <MobileContainer>
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-6 bg-gradient-to-b from-[var(--primary-gradient-start)] to-transparent">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="text-white hover:bg-white/10 p-2"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-bold text-white">Admin</h1>
                <div className="w-9" /> {/* Spacer for center alignment */}
            </div>

            {/* Content */}
            <div className="px-4 pb-4">
                <Card className="bg-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-[var(--card-text)] text-lg">
                            Admin Panel Access
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-[var(--card-text)] text-sm">
                            Welcome to the admin panel. This area is restricted to authorized personnel only.
                        </p>

                        <div className="grid gap-3">
                            <Card className="bg-[var(--card-pastel-blue)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        User Management
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Manage user accounts and permissions
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-mint)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        System Settings
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Configure application settings
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-purple)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Analytics
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        View system usage and statistics
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-[var(--card-pastel-yellow)] border-0">
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-[var(--card-text)] text-sm mb-2">
                                        Security Logs
                                    </h3>
                                    <p className="text-[var(--card-text)] text-xs opacity-70">
                                        Monitor security events and access logs
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                onClick={handleBack}
                                className="w-full bg-[var(--primary-gradient-start)] hover:bg-[var(--primary-gradient-end)] text-white"
                            >
                                Back to Main Page
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MobileContainer>
    );
}