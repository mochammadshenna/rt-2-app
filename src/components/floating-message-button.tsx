
"use client";

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export const FloatingMessageButton = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
        alert('Chat feature coming soon! 💬');
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!isMounted) {
        return null;
    }

    return (
        <button
            onClick={handleClick}
            aria-label="Open chat"
            className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 md:w-16 md:h-16
        rounded-full
        bg-gradient-to-br from-green-500 to-green-700
        text-white
        shadow-lg
        hover:shadow-xl hover:shadow-blue-500/25
        transform transition-all duration-300 ease-out
        hover:scale-110
        focus:outline-none focus:ring-4 focus:ring-green-300/50
        active:scale-95
        animate-pulse hover:animate-none
        ${isClicked ? 'animate-bounce' : ''}
        `}
            style={{
                boxShadow: `
            0 4px 14px 0 rgba(31, 38, 135, 0.37),
            0 0 20px rgba(79, 70, 229, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
            }}
        >
            <div className="relative">
                <MessageCircle
                    size={24}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-sm"
                />

                {/* Ripple effect overlay */}
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />

                {/* Subtle inner glow */}
                <div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)'
                    }}
                />
            </div>
        </button>
    );
};