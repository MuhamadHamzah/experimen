import { useState, useEffect } from 'react';
import { supabase, GalleryItem } from '../../lib/supabase';
import { CreditCard as Edit2, Trash2, Save, X } from 'lucide-react';
import GlassCard from '../GlassCard';

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    description: '',
    category: 'general',
    order_index: 0,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('gallery_items')
        .update({ ...formData, updated_at: new Date().toISOString() })
        .eq('id', editingId);

      if (!error) {
        setEditingId(null);
        resetForm();
        fetchItems();
      }
    } else {
      const { error } = await supabase
        .from('gallery_items')
        .insert([formData]);

      if (!error) {
        resetForm();
        fetchItems();
      }
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      image_url: item.image_url,
      description: item.description,
      category: item.category,
      order_index: item.order_index,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus item galeri ini?')) {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchItems();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image_url: '',
      description: '',
      category: 'general',
      order_index: 0,
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
          {editingId ? 'Edit Item Galeri' : 'Tambah Item Galeri'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                Kategori
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="e.g., event, workshop, kegiatan"
              />
            </div>

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
        <h2 className="text-xl font-bold text-white mb-4">Daftar Galeri</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    Urutan: {item.order_index}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-slate-400 text-center py-8 col-span-3">Belum ada item galeri</p>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
