import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import type { Profile } from '../types';

// Extend Profile to include ID
interface SavedProfile extends Profile {
    id: string;
}

export default function SavedProfiles() {
    const [profiles, setProfiles] = useState<SavedProfile[]>([]);
    const [loading, setLoading] = useState(true);

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile) => (
                        <Link key={profile.id} to={`/generator?id=${profile.id}`} className="block group">
                            <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group-hover:border-blue-500 transition-all shadow-lg hover:shadow-blue-500/20">
                                <div className="h-48 overflow-hidden bg-gray-700 relative">
                                    <img
                                        src={profile.imageUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60"}
                                        alt={profile.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-4">
                                        <h2 className="text-xl font-bold text-white mb-1">{profile.name}</h2>
                                        <p className="text-xs text-gray-300 uppercase tracking-wider">{profile.role}</p>
                                    </div>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-4 text-sm text-gray-400">
                                    <div>
                                        <span className="block text-xs uppercase text-gray-500">Event</span>
                                        {profile.eventName}
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs uppercase text-gray-500">Theme</span>
                                        <span className="capitalize">{profile.theme || 'modern'}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
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
