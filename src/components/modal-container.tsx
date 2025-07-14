"use client"

import { ReactNode } from "react"

interface MobileContainerProps {
    children: ReactNode
}

export default function MobileContainer({ children }: MobileContainerProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center p-4 md:p-8">
            {/* Mobile Device Frame */}
            <div className="relative">
                {/* Phone Bezel/Frame */}
                <div className="bg-slate-800 rounded-[2.5rem] p-3 shadow-2xl">
                    {/* Inner Phone Screen */}
                    <div className="bg-slate-900 rounded-[2rem] p-1">
                        {/* Screen Content Area */}
                        <div
                            className="bg-gradient-to-b from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] rounded-[1.75rem] overflow-hidden"
                            style={{
                                width: "375px",
                                height: "812px",
                                aspectRatio: "375/812"
                            }}
                        >
                            {/* Status Bar */}
                            <div className="flex items-center justify-between px-6 py-3 text-white text-sm font-medium">
                                <div className="flex items-center gap-1">
                                    <span>9:41</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="flex gap-1">
                                        <div className="w-4 h-2 bg-white rounded-sm opacity-60"></div>
                                        <div className="w-4 h-2 bg-white rounded-sm opacity-80"></div>
                                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                                    </div>
                                    <div className="w-6 h-3 border-2 border-white rounded-sm">
                                        <div className="w-full h-full bg-white rounded-sm opacity-80"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 overflow-hidden">
                                {children}
                            </div>

                            {/* Home Indicator */}
                            <div className="flex justify-center py-2">
                                <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute left-[-4px] top-20 w-1 h-8 bg-slate-700 rounded-l-md"></div>
                <div className="absolute left-[-4px] top-32 w-1 h-12 bg-slate-700 rounded-l-md"></div>
                <div className="absolute left-[-4px] top-48 w-1 h-12 bg-slate-700 rounded-l-md"></div>
                <div className="absolute right-[-4px] top-28 w-1 h-16 bg-slate-700 rounded-r-md"></div>
            </div>
        </div>
    )
}