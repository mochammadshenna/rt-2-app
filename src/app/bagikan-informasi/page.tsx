"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
                <div className="flex items-center justify-between p-6 pt-12">
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
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-white rounded-b-3xl shadow-inner">
                    {/* Main Content Card */}
                    <div className="bg-white shadow-lg border-0 rounded-2xl p-6">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Bagikan Informasi
                            </h2>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                Share information with your community and help others stay informed about important updates and announcements.
                            </p>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="space-y-4">
                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Announcements</h3>
                                    <p className="text-sm text-gray-600">Share important community updates</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Educational Content</h3>
                                    <p className="text-sm text-gray-600">Share knowledge and resources</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-0 shadow-sm rounded-xl p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Community Events</h3>
                                    <p className="text-sm text-gray-600">Organize and promote local events</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-lg rounded-2xl p-6">
                        <div className="text-center space-y-3">
                            <h3 className="text-white font-semibold">Ready to Share?</h3>
                            <p className="text-white/90 text-sm">
                                Start sharing valuable information with your community today
                            </p>
                            <Button className="bg-white text-blue-600 hover:bg-white/90 transition-colors font-medium px-6">
                                Create Post
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}