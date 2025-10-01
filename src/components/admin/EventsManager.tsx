import { useState, useEffect } from 'react';
import { supabase, Event } from '../../lib/supabase';
import { CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import GlassCard from '../GlassCard';

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    event_date: '',
    location: '',
    is_published: true,
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('events')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
        resetForm();
        fetchEvents();
      }
    } else {
      const { error } = await supabase
        .from('events')
        .insert([formData]);

      if (!error) {
        resetForm();
        fetchEvents();
      }
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      image_url: event.image_url,
      event_date: event.event_date.split('T')[0],
      location: event.location,
      is_published: event.is_published,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus event ini?')) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchEvents();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      event_date: '',
      location: '',
      is_published: true,
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <h2 className="text-xl font-bold text-white mb-4">
          {editingId ? 'Edit Event' : 'Tambah Event Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Judul Event
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL Gambar
            </label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tanggal Event
              </label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Lokasi
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status Publikasi
            </label>
            <select
              value={formData.is_published ? 'true' : 'false'}
              onChange={(e) => setFormData({ ...formData, is_published: e.target.value === 'true' })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            >
              <option value="true">Dipublikasikan</option>
              <option value="false">Draft</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              {editingId ? 'Update' : 'Tambah'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Batal
              </button>
            )}
          </div>
        </form>
      </GlassCard>

      <GlassCard>
        <h2 className="text-xl font-bold text-white mb-4">Daftar Event</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex gap-4">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-32 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{event.description}</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {new Date(event.event_date).toLocaleDateString('id-ID')}
                    </span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                      {event.location}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.is_published
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {event.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-slate-400 text-center py-8">Belum ada event</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
