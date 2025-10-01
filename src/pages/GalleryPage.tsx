import { useEffect, useState } from "react";
import { Image, Play, Download, Heart, Eye, Calendar } from "lucide-react";
import GlassCard from "../components/GlassCard";

// Define interface for media items
interface MediaItem {
  id: number;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  date: string;
  category: "events" | "workshops" | "community";
  views: number;
  likes: number;
}

interface Category {
  id: string;
  label: string;
  count: number;
}

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          entry.target.classList.add("animate-slide-up");
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [hasAnimated]);

  const mediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      src: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Workshop Web3 2024",
      description: "Mahasiswa sedang belajar pengembangan blockchain",
      date: "2024-12-15",
      category: "workshops",
      views: 1234,
      likes: 89,
    },
    {
      id: 2,
      type: "image",
      src: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Summit Inovasi",
      description: "Presentasi pada summit inovasi teknologi tahunan",
      date: "2024-11-20",
      category: "events",
      views: 2156,
      likes: 145,
    },
    {
      id: 3,
      type: "image",
      src: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Aktivitas Tim Building",
      description: "Acara tim building dan jaringan tahunan",
      date: "2024-10-30",
      category: "community",
      views: 987,
      likes: 67,
    },
    {
      id: 4,
      type: "image",
      src: "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Lab Riset AI",
      description: "Mahasiswa mengerjakan proyek machine learning",
      date: "2024-12-01",
      category: "workshops",
      views: 1567,
      likes: 112,
    },
    {
      id: 5,
      type: "image",
      src: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Sesi Review Kode",
      description: "Pemrograman kolaboratif dan review kode",
      date: "2024-11-15",
      category: "workshops",
      views: 834,
      likes: 45,
    },
    {
      id: 6,
      type: "image",
      src: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800",
      thumbnail:
        "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Kompetisi Pitch Startup",
      description: "Presentasi final pada kompetisi kewirausahaan",
      date: "2024-09-22",
      category: "events",
      views: 2890,
      likes: 234,
    },
  ];

  const categories: Category[] = [
    { id: "all", label: "Semua Media", count: mediaItems.length },
    {
      id: "events",
      label: "Acara",
      count: mediaItems.filter((item) => item.category === "events").length,
    },
    {
      id: "workshops",
      label: "Workshop",
      count: mediaItems.filter((item) => item.category === "workshops").length,
    },
    {
      id: "community",
      label: "Komunitas",
      count: mediaItems.filter((item) => item.category === "community").length,
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.category === selectedCategory);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case "workshops":
        return "Workshop";
      case "events":
        return "Acara";
      case "community":
        return "Komunitas";
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 relative">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div
            className={`scroll-animate opacity-0 translate-y-10 ${
              hasAnimated ? "animate-slide-up" : ""
            }`}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                Galeri
              </span>
              <br />
              <span className="text-white">Momen</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Jelajahi koleksi momen berkesan, acara, workshop, dan aktivitas
              komunitas kami yang menampilkan semangat dinamis dari himpunan
              mahasiswa kami.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <GlassCard
            className={`p-8 scroll-animate opacity-0 translate-y-10 ${
              hasAnimated ? "animate-slide-up" : ""
            }`}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-electric-cyan to-neon-purple text-white shadow-lg shadow-electric-cyan/25"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-105"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Media Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group overflow-hidden cursor-pointer scroll-animate opacity-0 translate-y-10 ${
                  hasAnimated ? "animate-slide-up" : ""
                }`}
                onClick={() => setSelectedMedia(item)}
              >
                <GlassCard className="h-full">
                  <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-space-blue/80 via-space-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Icons */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.type === "video" ? (
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-electric-cyan/90 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
                      {getCategoryLabel(item.category)}
                    </div>

                    {/* Stats */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        <Eye className="w-3 h-3" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-white/50">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      <button
                        className="hover:text-electric-cyan transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              ×
            </button>

            <GlassCard className="p-0 overflow-hidden max-h-[90vh]">
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-full object-cover max-h-[70vh]"
                  />
                </div>

                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {selectedMedia.title}
                  </h2>
                  <p className="text-white/70 leading-relaxed mb-6">
                    {selectedMedia.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Tanggal:</span>
                      <span className="text-white">
                        {formatDate(selectedMedia.date)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Kategori:</span>
                      <span className="text-electric-cyan capitalize">
                        {getCategoryLabel(selectedMedia.category)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Dilihat:</span>
                      <span className="text-white">
                        {selectedMedia.views.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Suka:</span>
                      <span className="text-white">{selectedMedia.likes}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-3 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="w-4 h-4 inline mr-2" />
                      Suka
                    </button>
                    <button
                      className="px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <GlassCard
            className={`p-16 scroll-animate opacity-0 translate-y-10 ${
              hasAnimated ? "animate-slide-up" : ""
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Bagikan{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Momen
              </span>{" "}
              Anda
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Memiliki foto atau video dari acara kami? Kami ingin
              menampilkannya di galeri kami dan berbagi kenangan dengan
              komunitas.
            </p>
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-hot-pink to-neon-purple rounded-full font-semibold text-white shadow-lg hover:shadow-hot-pink/40 transition-all duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="flex items-center justify-center gap-2">
                Unggah Foto
                <Image className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
