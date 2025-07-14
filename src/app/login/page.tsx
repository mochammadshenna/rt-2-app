"use client";

import { RTLogo } from "@/components/rt-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Users } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [userType, setUserType] = useState<'admin' | 'warga' | null>(null);

    const handleGoogleSignIn = async () => {
        await signIn('google', { callbackUrl: '/' });
    };

    const handleDemoSignIn = (type: 'admin' | 'warga') => {
        setUserType(type);
        localStorage.setItem('userType', type);

        setTimeout(() => {
            if (type === 'admin') {
                router.push('/?role=admin');
            } else {
                router.push('/?role=warga');
            }
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{
            background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)',
        }}>
            <div className="w-full max-w-md">
                <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                        <div className="text-center space-y-8">
                            {/* RT Logo */}
                            <div className="flex justify-center">
                                <RTLogo size={80} variant="icon" showGlow />
                            </div>

                            {/* Welcome Text */}
                            <div className="space-y-3">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Rukun Tetangga 02
                                </h1>
                            </div>

                            {/* Authentication Options */}
                            <div className="space-y-4">

                                {/* Official Google Sign-in Button */}
                                <Button
                                    onClick={handleGoogleSignIn}
                                    className="w-full h-auto p-0 flex items-stretch bg-[#4285F4] text-white border border-[#4285F4] shadow-sm transition-all duration-200 hover:shadow-md hover:bg-[#4285F4] hover:text-white rounded-lg"
                                >
                                    {/* Google Logo Section */}
                                    <div className="flex items-center justify-center w-12 bg-white rounded-l-lg">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>

                                    {/* Text Section */}
                                    <div className="flex-1 flex items-center justify-center px-4 py-3 font-medium text-white hover:text-white">
                                        <span>Sign in with Google</span>
                                    </div>
                                </Button>




                                <p className="text-sm text-gray-600 text-center mt-6">Akun Demo:</p>
                                {/* Admin Google Sign-in Button */}
                                <Button
                                    onClick={() => handleDemoSignIn('admin')}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md py-4 h-auto rounded-lg font-medium"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        <User className="w-5 h-5" />
                                        <span>Pengurus</span>
                                    </div>
                                </Button>

                                {/* warga Google Sign-in Button */}
                                <Button
                                    onClick={() => handleDemoSignIn('warga')}
                                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md py-4 h-auto rounded-lg font-medium"
                                >
                                    <div className="flex items-center justify-center space-x-3">
                                        <Users className="w-5 h-5" />
                                        <span>Warga</span>
                                    </div>
                                </Button>

                            </div>

                            {/* User Type Display */}
                            {userType && (
                                <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                                    <div className="text-green-800 font-medium">
                                        Masuk sebagai {userType}...
                                    </div>
                                </div>
                            )}

                            {/* Additional Info */}
                            <p className="text-[10px] text-gray-500 leading-relaxed text-center whitespace-nowrap overflow-hidden">
                                Dengan masuk, Anda menyetujui persyaratan layanan dan kebijakan privasi kami.
                            </p>
                        </div>
                    </CardContent>
                </Card >
            </div >
        </div >
    );
}