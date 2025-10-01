import { useState, useEffect } from 'react';
import { supabase, Slide } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import GlassCard from '../GlassCard';

export default function SlidesManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    description: '',
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const { data, error } = await supabase
      .from('slides')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setSlides(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('slides')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
        resetForm();
        fetchSlides();
      }
    } else {
      const { error } = await supabase
        .from('slides')
        .insert([formData]);

      if (!error) {
        resetForm();
        fetchSlides();
      }
    }
  };

  const handleEdit = (slide: Slide) => {
    setEditingId(slide.id);
    setFormData({
      image_url: slide.image_url,
      title: slide.title,
      description: slide.description,
      order_index: slide.order_index,
      is_active: slide.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus slide ini?')) {
      const { error } = await supabase
        .from('slides')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchSlides();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      description: '',
      order_index: 0,
      is_active: true,
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
          {editingId ? 'Edit Slide' : 'Tambah Slide Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Judul
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
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Urutan
              </label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status
              </label>
              <select
                value={formData.is_active ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              >
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </select>
            </div>
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
        <h2 className="text-xl font-bold text-white mb-4">Daftar Slide</h2>
        <div className="space-y-4">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <img
                src={slide.image_url}
                alt={slide.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{slide.title}</h3>
                <p className="text-slate-400 text-sm">{slide.description}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    Urutan: {slide.order_index}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    slide.is_active
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}>
                    {slide.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(slide.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {slides.length === 0 && (
            <p className="text-slate-400 text-center py-8">Belum ada slide</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
