"use client";

import { Grid3X3, Home, Layers } from 'lucide-react';
import React from 'react';

interface RTLogoProps {
    size?: number;
    variant?: 'icon' | 'with-text' | 'full-logo';
    className?: string;
    showGlow?: boolean;
}

export const RTLogo: React.FC<RTLogoProps> = ({
    size = 48,
    variant = 'icon',
    className = '',
    showGlow = false
}) => {

    const iconSize = size * 0.5;

    const IconOnly = () => (
        <div
            className={`relative flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 ${showGlow ? 'shadow-lg shadow-purple-500/25' : ''} ${className} ring-2 ring-white/30`}
            style={{ width: size, height: size }}
        >
            {/* Grid background pattern */}
            <div className="absolute inset-1 rounded-md">
                <Grid3X3 className="absolute top-1 left-1 text-white/20" size={iconSize * 0.4} />
                <Layers className="absolute bottom-1 right-1 text-white/20" size={iconSize * 0.4} />
            </div>

            {/* Main icons with better layering */}
            <div className="relative flex items-center justify-center z-10">
                <div className="relative">
                    <Home
                        className="text-white drop-shadow-md"
                        size={iconSize}
                        strokeWidth={2.5}
                    />
                </div>
            </div>

            {/* Glass effect overlay */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm"></div>

            {/* Border highlight */}
            <div className="absolute inset-0 rounded-lg border border-white/40"></div>

            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-lg shadow-inner"></div>
        </div>
    );

    const WithText = () => (
        <div className={`flex items-center gap-3 ${className}`}>
            <IconOnly />
            <span
                className="font-bold text-white drop-shadow-md"
                style={{ fontSize: size * 0.35 }}
            >
                RT
            </span>
        </div>
    );

    const FullLogo = () => (
        <div className={`flex items-center gap-4 ${className}`}>
            <IconOnly />
            <div className="flex flex-col">
                <span
                    className="font-bold text-white leading-tight drop-shadow-md"
                    style={{ fontSize: size * 0.35 }}
                >
                    Rukun Tetangga
                </span>
                <span
                    className="text-white/80 font-medium leading-tight drop-shadow-md"
                    style={{ fontSize: size * 0.18 }}
                >
                    Community Management
                </span>
            </div>
        </div>
    );

    const variants = {
        'icon': IconOnly,
        'with-text': WithText,
        'full-logo': FullLogo
    };

    const Component = variants[variant];

    return <Component />;
};

export default RTLogo;