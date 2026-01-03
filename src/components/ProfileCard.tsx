import React from 'react';
import type { Profile } from '../types';

interface ProfileCardProps {
    profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const theme = profile.theme || 'modern';

    const themes = {
        modern: {
            headerBg: 'bg-[#1a1a1a]', // Black
            accentText: 'text-gray-900',
            subText: 'text-gray-500', // Changed from text-gray-300
            badgeBg: 'bg-[#111111]',
            headerText: 'text-white'
        },
        midnight: {
            headerBg: 'bg-blue-900',
            accentText: 'text-blue-900',
            subText: 'text-blue-600',
            badgeBg: 'bg-blue-950',
            headerText: 'text-blue-50'
        },
        emerald: {
            headerBg: 'bg-emerald-900',
            accentText: 'text-emerald-900',
            subText: 'text-emerald-600',
            badgeBg: 'bg-emerald-950',
            headerText: 'text-emerald-50'
        },
        crimson: {
            headerBg: 'bg-red-900',
            accentText: 'text-red-900',
            subText: 'text-red-600',
            badgeBg: 'bg-red-950',
            headerText: 'text-red-50'
        },
        executive: {
            headerBg: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900',
            accentText: 'text-slate-800',
            subText: 'text-slate-500',
            badgeBg: 'bg-slate-900',
            headerText: 'text-amber-500' // Gold accent
        },
        horizon: {
            headerBg: 'bg-gradient-to-r from-orange-400 to-pink-500',
            accentText: 'text-pink-600',
            subText: 'text-orange-600',
            badgeBg: 'bg-gradient-to-r from-orange-400 to-pink-500',
            headerText: 'text-white'
        },
        oceanic: {
            headerBg: 'bg-gradient-to-br from-cyan-600 to-blue-800',
            accentText: 'text-blue-800',
            subText: 'text-cyan-700',
            badgeBg: 'bg-cyan-900',
            headerText: 'text-cyan-50'
        },
        nebula: {
            headerBg: 'bg-gradient-to-r from-violet-600 to-indigo-600',
            accentText: 'text-indigo-900',
            subText: 'text-violet-600',
            badgeBg: 'bg-indigo-900',
            headerText: 'text-indigo-100'
        }
    };

    const currentTheme = themes[theme];

    return (
        <div className="w-[375px] bg-white shadow-2xl overflow-hidden relative font-sans text-gray-900 mx-auto">
            {/* Header */}
            <div className={`${currentTheme.headerBg} h-40 pt-8 px-6 text-center transition-colors duration-300`}>
                <h2 className={`${currentTheme.headerText} opacity-90 text-[10px] uppercase tracking-[0.2em] font-medium mb-1`}>
                    Event Staff
                </h2>
                <h1 className={`${currentTheme.headerText} font-bold text-xs uppercase tracking-[0.2em]`}>
                    Identification
                </h1>
            </div>

            {/* Profile Image */}
            <div className="relative -mt-20 flex justify-center mb-6">
                <div className="w-40 h-40 bg-white p-2 rounded-[2rem] shadow-lg relative z-10">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                            src={profile.imageUrl}
                            alt={profile.name}
                            className="w-full h-full object-contain origin-center transition-transform duration-100" // Changed to object-contain
                            style={{
                                transform: `translate(${profile.imagePosition?.x || 0}px, ${profile.imagePosition?.y || 0}px) scale(${profile.imagePosition?.scale || 1})`
                            }}
                        />
                    </div>
                    {/* Soft glow/shadow behind */}
                    <div className="absolute inset-0 bg-white/20 blur-xl -z-10 rounded-[2rem]"></div>
                </div>
            </div>

            {/* Personal Info */}
            <div className="text-center px-6 mb-8">
                <h2 className={`text-2xl font-bold mb-2 tracking-tight ${currentTheme.accentText}`}>{profile.name}</h2>
                <p className={`${currentTheme.subText} text-[10px] uppercase tracking-[0.2em] font-medium`}>
                    {profile.role}
                </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 px-10 mb-8 max-w-xs mx-auto">
                <div className="text-left">
                    <p className={`${currentTheme.subText} text-[10px] uppercase tracking-[0.1em] mb-1`}>Age</p>
                    <p className={`text-lg font-bold ${currentTheme.accentText}`}>{profile.age}</p>
                </div>
                <div className="text-left">
                    <p className={`${currentTheme.subText} text-[10px] uppercase tracking-[0.1em] mb-1`}>Nationality</p>
                    <p className={`text-lg font-bold ${currentTheme.accentText}`}>{profile.nationality}</p>
                </div>
            </div>

            {/* Languages */}
            <div className="px-6 mb-10 text-center">
                <h3 className={`${currentTheme.subText} text-[10px] uppercase tracking-[0.2em] mb-4`}>
                    Languages
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {profile.languages.map((lang, index) => (
                        <span
                            key={index}
                            className={`${currentTheme.badgeBg} text-white text-[10px] font-bold py-2 px-4 rounded-full uppercase tracking-wider min-w-[80px] text-center transition-colors duration-300 shadow-sm`}
                        >
                            {lang}
                        </span>
                    ))}
                </div>
            </div>

            {/* Experience */}
            <div className="px-10 mb-12">
                <h3 className={`${currentTheme.subText} text-[10px] uppercase tracking-[0.2em] mb-6`}>
                    Experience
                </h3>
                <div className="space-y-6">
                    {profile.experience.map((exp) => (
                        <div key={exp.id} className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0`}>
                                <div className={`w-2 h-2 ${currentTheme.subText}`}>✓</div>
                            </div>
                            <p className="text-sm font-medium text-gray-800">
                                {exp.company} <span className="text-gray-400">—</span> {exp.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / ID */}
            <div className="px-6 pb-8">
                <div className={`${currentTheme.badgeBg} text-white text-xs py-4 rounded-2xl text-center tracking-[0.3em] font-bold uppercase transition-colors duration-300 shadow-md border border-white/10`}>
                    {profile.eventName}
                </div>
            </div>
        </div>
    );
};
