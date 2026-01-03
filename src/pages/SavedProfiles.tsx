import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import type { Profile } from '../types';
import { DEFAULT_AVATAR } from '../constants';

// Extend Profile to include ID
interface SavedProfile extends Profile {
    id: string;
}

export default function SavedProfiles() {
    const [profiles, setProfiles] = useState<SavedProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            const { data, error } = await supabase
                .from('employee_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching profiles:', error);
            } else {
                setProfiles((data as any[])?.map(p => ({
                    id: p.id,
                    name: p.name,
                    role: p.role,
                    imageUrl: p.image_url,
                    age: p.age,
                    nationality: p.nationality,
                    languages: p.languages || [],
                    experience: p.experience || [],
                    idNumber: p.id_number,
                    eventName: p.event_name,
                    theme: p.theme || 'modern',
                    email: p.email,
                    mobile: p.mobile,
                    imagePosition: p.image_position
                })) || []);
            }
            setLoading(false);
        };

        fetchProfiles();
    }, []);

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        // Critical: Stop propagation instantly
        e.preventDefault();
        e.stopPropagation();

        console.log('Delete requested for:', id);

        if (!window.confirm(`DELETE CONFIRMATION:\nAre you sure you want to delete this profile?`)) return;

        try {
            const { error } = await supabase
                .from('employee_profiles')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProfiles(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting profile:', error);
            alert('Failed to delete profile');
        }
    };

    const handleCardClick = (id: string) => {
        navigate(`/generator?id=${id}`);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-8 font-sans text-white">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Saved Profiles</h1>
                    <Link to="/generator" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        + Create New
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {profiles.map((profile) => (
                        <div key={profile.id} className="relative group block">
                            {/* Clickable Card Background */}
                            <div
                                className="cursor-pointer"
                                onClick={() => handleCardClick(profile.id)}
                            >
                                <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group-hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
                                    <div className="h-32 overflow-hidden bg-gray-700 relative">
                                        <img
                                            src={profile.imageUrl || DEFAULT_AVATAR}
                                            alt={profile.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                        <div className="absolute bottom-2 left-3">
                                            <h2 className="text-sm font-bold text-white mb-0.5 truncate">{profile.name}</h2>
                                            <p className="text-[10px] text-gray-300 uppercase tracking-wider truncate">{profile.role}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                                        <div>
                                            <span className="block text-[8px] uppercase text-gray-500">Event</span>
                                            <span className="truncate block">{profile.eventName}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-[8px] uppercase text-gray-500">Theme</span>
                                            <span className="capitalize truncate block">{profile.theme || 'modern'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delete Button - SIBLING to the clickable card */}
                            <div className="absolute top-2 right-2 flex gap-2 z-50">
                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(profile.id, e)}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 border-2 border-gray-900"
                                    title="Delete Profile"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}


                    {profiles.length === 0 && (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl mb-4">No profiles found.</p>
                            <Link to="/generator" className="text-blue-400 hover:underline">Create your first profile</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
