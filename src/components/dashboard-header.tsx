"use client"

import { RTLogo } from "@/components/rt-logo"
import { Button } from "@/components/ui/button"
import { Bell, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
    userRole?: 'admin' | 'warga' | 'guest'
}

export default function DashboardHeader({ userRole = 'guest' }: DashboardHeaderProps) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('userType')
        router.push("/login")
    }

    const getRoleInfo = () => {
        switch (userRole) {
            case 'admin':
                return { title: 'Pengurus RT', subtitle: 'Kelola Laporan', bgColor: 'bg-red-500/20' }
            case 'warga':
                return { title: 'RT Apps', subtitle: 'Hallo Warga RT 02', bgColor: 'bg-blue-500/20' }
            case 'guest':
                return { title: 'RT Apps', subtitle: 'Hallo Warga RT 02', bgColor: 'bg-gray-500/20' }
            default:
                return { title: 'Dashboard', subtitle: 'Hallo Warga RT 02', bgColor: 'bg-white/20' }
        }
    }

    const roleInfo = getRoleInfo()

    return (
        <div className="px-6 py-4 pt-12">
            {/* Header with RT Logo */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <RTLogo size={48} variant="icon" />
                    <div>
                        <h1 className="text-2xl font-bold text-white">{roleInfo.title}</h1>
                        <p className="text-sm text-white/80">{roleInfo.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 transition-colors rounded-xl"
                    >
                        <Bell className="w-5 h-5" />
                    </Button>

                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 transition-colors rounded-xl"
                    >
                        <LogOut className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* User Role Badge */}
            <div className="mb-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${roleInfo.bgColor} backdrop-blur-sm border border-white/20`}>
                    <User className="w-4 h-4 text-white mr-2" />
                    <span className="text-white text-sm font-medium capitalize">{userRole}</span>
                </div>
            </div>
        </div>
    )
}