"use client"

import { Camera, CreditCard, FileSignature, FileText, Lock, MapPin, Megaphone, MessageSquare, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface ActionCard {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    backgroundColor: string
    route: string
    shortDescription: string
    adminOnly?: boolean
}

const actionCards: ActionCard[] = [
    {
        id: "iuran",
        label: "Iuran",
        icon: CreditCard,
        backgroundColor: "bg-gradient-to-br from-purple-100 to-purple-200",
        route: "/tagihan",
        shortDescription: "Lihat dan bayar iuran"
    },
    {
        id: "bagikan-informasi",
        label: "Bagikan Informasi",
        icon: Megaphone,
        backgroundColor: "bg-gradient-to-br from-green-100 to-green-200",
        route: "/bagikan-informasi",
        shortDescription: "Berbagi info komunitas",
        adminOnly: true
    },
    {
        id: "riwayat",
        label: "Riwayat",
        icon: FileText,
        backgroundColor: "bg-gradient-to-br from-orange-100 to-orange-200",
        route: "/riwayat",
        shortDescription: "Lihat aktivitas terdahulu"
    },
    {
        id: "buat-surat",
        label: "Buat Surat",
        icon: FileSignature,
        backgroundColor: "bg-gradient-to-br from-blue-100 to-blue-200",
        route: "/buat-surat",
        shortDescription: "Buat surat pengantar",
    },
    {
        id: "lapor",
        label: "Lapor",
        icon: MessageSquare,
        backgroundColor: "bg-gradient-to-br from-yellow-100 to-yellow-200",
        route: "/lapor",
        shortDescription: "Temuan penting"
    },
    {
        id: "cctv",
        label: "CCTV",
        icon: Camera,
        backgroundColor: "bg-gradient-to-br from-pink-100 to-pink-200",
        route: "/cctv",
        shortDescription: "Monitor keamanan area",
    },
    {
        id: "admin",
        label: "Admin",
        icon: Settings,
        backgroundColor: "bg-gradient-to-br from-gray-100 to-gray-200",
        route: "/admin",
        shortDescription: "Panel pengurus RT",
        adminOnly: true
    },
    {
        id: "switch-rumah",
        label: "Pindah Alamat",
        icon: MapPin,
        backgroundColor: "bg-gradient-to-br from-indigo-100 to-indigo-200",
        route: "/switch-rumah",
        shortDescription: "Perbaharui data tinggal",
    }
]

interface ActionCardsGridProps {
    onCardClick?: (cardId: string) => void
    userRole?: 'admin' | 'warga'
}

export default function ActionCardsGrid({ onCardClick, userRole = 'warga' }: ActionCardsGridProps) {
    const router = useRouter()

    const handleCardClick = (card: ActionCard) => {
        // Check permissions
        if (card.adminOnly && userRole !== 'admin') {
            alert('Fitur ini hanya tersedia untuk Admin')
            return
        }

        if (onCardClick) {
            onCardClick(card.id)
        }
        // Navigate to the specific page
        router.push(card.route)
    }

    const getFilteredCards = () => {
        return actionCards.filter(card => {
            // For admin users, show all cards, including admin-only ones.
            // Admin cards themselves will be filtered out if their 'id' is 'admin' from the overall list,
            // as the admin dashboard provides specific admin functionalities.
            if (userRole === 'admin') {
                return true
            }

            // For wargas, show all cards except admin-only
            if (userRole === 'warga') {
                return !card.adminOnly
            }

            return true
        })
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-2">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {getFilteredCards().map((card) => {
                    const IconComponent = card.icon
                    const isRestricted = (card.adminOnly && userRole !== 'admin')

                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card)}
                            disabled={isRestricted}
                            className={`
                                    ${card.backgroundColor}
                                    relative overflow-hidden rounded-3xl p-6 
                                    transition-all duration-300 ease-out
                                    hover:scale-105 hover:shadow-2xl
                                    focus:outline-none focus:ring-4 focus:ring-white/50
                                    active:scale-95
                                    flex flex-col items-center justify-between
                                    min-h-[140px] sm:min-h-[160px]
                                    group
                                    shadow-lg
                                    ${isRestricted ? 'opacity-60 cursor-not-allowed' : ''}
                            `}
                        >
                            {/* Main Content */}
                            <div className="flex flex-col items-center space-y-3 flex-1 justify-center">
                                <div className="relative">
                                    <div className="p-3 rounded-2xl bg-white/40 backdrop-blur-sm group-hover:bg-white/60 transition-all duration-300 shadow-sm">
                                        {isRestricted ? (
                                            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
                                        ) : (
                                            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-gray-700 group-hover:scale-110 transition-transform duration-300" />
                                        )}
                                    </div>

                                    {/* Permission Badge */}
                                    {card.adminOnly && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">A</span>
                                        </div>
                                    )}
                                </div>

                                <div className="text-center space-y-1">
                                    <span className="text-gray-800 text-sm sm:text-base font-semibold leading-tight block">
                                        {card.label}
                                    </span>
                                    <span className="text-gray-600 text-xs leading-tight block">
                                        {card.shortDescription}
                                    </span>
                                </div>
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

                            {/* Sparkle Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping delay-100"></div>
                                <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-ping delay-300"></div>
                                <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full animate-ping delay-500"></div>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* Role Information */}
            {userRole === 'admin' && (
                <div className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-400/20">
                    <p className="text-white/90 text-sm text-center">
                        🔑 Mode Admin: Akses fitur administrasi melalui menu yang tersedia
                    </p>
                </div>
            )}
        </div>
    )
}