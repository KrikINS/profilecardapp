import React from 'react';

export const KrikInsLogo: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-black text-xl tracking-tighter text-gray-400">
                Krik
            </span>
            <div className="relative w-8 h-8 flex items-center justify-center animate-spin-slow">
                <span className="font-black text-xs text-blue-500 absolute rotate-0">I</span>
                <span className="font-black text-xs text-blue-500 absolute rotate-90">N</span>
                <span className="font-black text-xs text-blue-500 absolute rotate-180">S</span>
                {/* Decoration ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-transparent"></div>
            </div>
            {/* Alternative simple text version if user wants words side by side with one rotating */}
            {/* But user said "so the INS keeps rotating slowly". 
                If they meant the word INS itself rotates around its center:
            */}
        </div>
    );
};

import { Link } from 'react-router-dom';

export const KrikInsLogoSimple: React.FC = () => {
    return (
        <Link to="/" className="fixed bottom-6 right-6 z-50 flex items-center bg-white/90 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200 shadow-2xl select-none hover:scale-105 transition-transform cursor-pointer">
            <span className="font-bold text-lg text-gray-900 font-sans mr-1">Krik</span>
            <span className="font-bold text-lg text-blue-600 font-sans animate-spin-sideways-pause origin-center inline-block">INS</span>
        </Link>
    );
};
