import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Image, Users, Calendar, Camera } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import SlidesManager from '../components/admin/SlidesManager';
import TeamManager from '../components/admin/TeamManager';
import EventsManager from '../components/admin/EventsManager';
import GalleryManager from '../components/admin/GalleryManager';

type Tab = 'slides' | 'team' | 'events' | 'gallery';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('slides');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin');
  };

  if (!user) {
    navigate('/admin');
    return null;
  }

  const tabs = [
    { id: 'slides' as Tab, label: 'Slide Homepage', icon: Image },
    { id: 'team' as Tab, label: 'Tim Kami', icon: Users },
    { id: 'events' as Tab, label: 'Event', icon: Calendar },
    { id: 'gallery' as Tab, label: 'Galeri', icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Kelola konten website HMPTI</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>

        <GlassCard className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </GlassCard>

        <div>
          {activeTab === 'slides' && <SlidesManager />}
          {activeTab === 'team' && <TeamManager />}
          {activeTab === 'events' && <EventsManager />}
          {activeTab === 'gallery' && <GalleryManager />}
        </div>
      </div>
    </div>
  );
}
