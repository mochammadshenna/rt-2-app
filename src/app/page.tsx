"use client"

import ActionCardsGrid from "@/components/action-cards-grid"
import DashboardHeader from "@/components/dashboard-header"
import { MobileContainer } from "@/components/shared/mobile-container"
import VotingSection from "@/components/voting-section"
import { useRouter, useSearchParams } from "next/navigation"
import React, { Suspense, useEffect, useState } from "react"

function HomeContent() {
    const [selectedCard, setSelectedCard] = useState<string | null>(null)
    const [userRole, setUserRole] = useState<'admin' | 'warga' | null>(null)
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        // Check URL params first
        const roleParam = searchParams.get('role')
        if (roleParam && ['admin', 'warga'].includes(roleParam)) {
            setUserRole(roleParam as 'admin' | 'warga')
            return
        }

        // Check localStorage for stored user type
        const storedUserType = localStorage.getItem('userType')
        if (storedUserType && ['admin', 'warga'].includes(storedUserType)) {
            setUserRole(storedUserType as 'admin' | 'warga')
            return
        }

        // If no role found, redirect to login
        router.push('/login')
    }, [searchParams, router])

    const handleCardClick = (cardId: string) => {
        setSelectedCard(cardId)
        console.log(`Card clicked: ${cardId}`)
    }

    // Show loading while determining user role
    if (!userRole) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)',
            }}>
                <div className="text-white text-xl">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen" style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.9) 0%, rgba(59, 130, 246, 0.9) 100%)',
            '--primary-gradient-start': '#4F46E5',
            '--primary-gradient-end': '#3B82F6',
            '--card-pastel-pink': '#FDF2F8',
            '--card-pastel-yellow': '#FEF3C7',
            '--card-pastel-blue': '#DBEAFE',
            '--card-pastel-mint': '#D1FAE5',
            '--card-pastel-purple': '#F3E8FF',
            '--card-pastel-green': '#DCFCE7',
            '--card-text': '#374151'
        } as React.CSSProperties}>
            <MobileContainer>
                <div className="flex flex-col h-full">
                    <DashboardHeader userRole={userRole} />

                    <div className="flex-1 px-4 py-2 overflow-y-auto">
                        <ActionCardsGrid onCardClick={handleCardClick} userRole={userRole} />

                        {/* Information Section */}
                        <div className="mt-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                                <h3 className="text-white font-semibold text-lg mb-4">📢 Informasi Terkini</h3>
                                <div className="space-y-3">
                                    <div className="bg-white/15 rounded-2xl p-4">
                                        <h4 className="text-white font-medium text-sm mb-2">Rapat Bulanan RT</h4>
                                        <p className="text-white/90 text-xs">Mengundang seluruh warga untuk hadir dalam rapat bulanan yang akan diselenggarakan pada Minggu, 15 Januari 2024.</p>
                                        <span className="text-xs text-white/70 mt-2 block">2 hari yang lalu</span>
                                    </div>
                                    <div className="bg-white/15 rounded-2xl p-4">
                                        <h4 className="text-white font-medium text-sm mb-2">Pembayaran Iuran</h4>
                                        <p className="text-white/90 text-xs">Reminder pembayaran iuran bulanan periode Januari 2024. Batas waktu pembayaran hingga tanggal 20 Januari.</p>
                                        <span className="text-xs text-white/70 mt-2 block">1 minggu yang lalu</span>
                                    </div>
                                    {userRole === 'admin' && (
                                        <div className="bg-red-500/20 rounded-2xl p-4 border border-red-400/30">
                                            <h4 className="text-white font-medium text-sm mb-2">⚠️ Admin Notice</h4>
                                            <p className="text-white/90 text-xs">Ada 3 laporan baru yang memerlukan tindakan segera. Silakan cek menu Admin untuk detail.</p>
                                            <span className="text-xs text-white/70 mt-2 block">Baru saja</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <VotingSection />
                    </div>
                </div>
            </MobileContainer>
        </div>
    )
}

export default function HomePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeContent />
        </Suspense>
    )
}