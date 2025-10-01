import { useEffect, useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Search,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

// Definisikan tipe untuk event
interface EventItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: "workshop" | "bootcamp" | "networking" | "conference";
  attendees: number;
  maxAttendees: number;
  description: string;
  image: string;
  status: string;
  tags: string[];
}

// Definisikan tipe untuk kategori
interface CategoryItem {
  id: string;
  label: string;
  count: number;
}

const EventsPage = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
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

  const events: EventItem[] = [
    {
      id: 1,
      title: "Workshop Pengembangan Web3",
      date: "2025-02-15",
      time: "14:00",
      location: "Tech Hub, Ruang 301",
      category: "workshop",
      attendees: 45,
      maxAttendees: 60,
      description:
        "Pelajari dasar-dasar pengembangan Web3 termasuk smart contract, protokol DeFi, dan pembuatan dApp.",
      image:
        "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      tags: ["Blockchain", "Smart Contracts", "DeFi"],
    },
    {
      id: 2,
      title: "Bootcamp AI & Machine Learning",
      date: "2025-02-20",
      time: "09:00",
      location: "Pusat Inovasi",
      category: "bootcamp",
      attendees: 78,
      maxAttendees: 100,
      description:
        "Bootcamp intensif 2 hari yang mencakup teknik AI modern, jaringan neural, dan aplikasi ML praktis.",
      image:
        "https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      tags: ["AI", "Machine Learning", "Python"],
    },
    {
      id: 3,
      title: "Malam Presentasi Startup",
      date: "2025-02-25",
      time: "18:00",
      location: "Auditorium Utama",
      category: "networking",
      attendees: 120,
      maxAttendees: 150,
      description:
        "Presentasikan ide startup Anda kepada pakar industri, investor, dan sesama pengusaha.",
      image:
        "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      tags: ["Kewirausahaan", "Presentasi", "Jaringan"],
    },
    {
      id: 4,
      title: "Konferensi Keamanan Siber 2025",
      date: "2025-03-05",
      time: "10:00",
      location: "Ruang Konferensi A",
      category: "conference",
      attendees: 200,
      maxAttendees: 300,
      description:
        "Konferensi keamanan siber tahunan featuring pemimpin industri membahas ancaman terbaru dan strategi pertahanan.",
      image:
        "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      status: "upcoming",
      tags: ["Keamanan Siber", "Privasi", "Pertahanan"],
    },
  ];

  const categories: CategoryItem[] = [
    { id: "all", label: "Semua Acara", count: events.length },
    {
      id: "workshop",
      label: "Workshop",
      count: events.filter((e) => e.category === "workshop").length,
    },
    {
      id: "bootcamp",
      label: "Bootcamp",
      count: events.filter((e) => e.category === "bootcamp").length,
    },
    {
      id: "networking",
      label: "Jaringan",
      count: events.filter((e) => e.category === "networking").length,
    },
    {
      id: "conference",
      label: "Konferensi",
      count: events.filter((e) => e.category === "conference").length,
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filter === "all" || event.category === filter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case "workshop":
        return "Workshop";
      case "bootcamp":
        return "Bootcamp";
      case "networking":
        return "Jaringan";
      case "conference":
        return "Konferensi";
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
                Acara
              </span>
              <br />
              <span className="text-white">Mendatang</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Ikuti acara, workshop, dan konferensi menarik kami yang dirancang
              untuk memperluas pengetahuan Anda dan terhubung dengan para
              penggemar teknologi lainnya.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <GlassCard
            className={`p-8 scroll-animate opacity-0 translate-y-10 ${
              hasAnimated ? "animate-slide-up" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Cari acara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      filter === category.id
                        ? "bg-gradient-to-r from-electric-cyan to-neon-purple text-white"
                        : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <GlassCard
                key={event.id}
                className={`group overflow-hidden scroll-animate opacity-0 translate-y-10 ${
                  hasAnimated ? "animate-slide-up" : ""
                }`}
              >
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-blue/80 via-space-blue/20 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-electric-cyan/90 backdrop-blur-sm rounded-full text-xs font-medium text-white capitalize">
                    {getCategoryLabel(event.category)}
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-white/90">
                    <Users className="w-3 h-3" />
                    <span>
                      {event.attendees}/{event.maxAttendees}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-cyan transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="w-4 h-4 text-electric-cyan" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4 text-neon-purple" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <MapPin className="w-4 h-4 text-hot-pink" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    className="w-full group/btn relative px-4 py-3 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-xl font-semibold text-white shadow-lg hover:shadow-electric-cyan/25 transition-all duration-300 hover:scale-105"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Daftar Sekarang
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center opacity-50">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Tidak ada acara ditemukan
              </h3>
              <p className="text-white/60">
                Coba sesuaikan pencarian atau filter kriteria Anda
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <GlassCard
            className={`p-16 scroll-animate opacity-0 translate-y-10 ${
              hasAnimated ? "animate-slide-up" : ""
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ingin Mengadakan{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Acara?
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Bagikan pengetahuan dan keahlian Anda dengan komunitas kami. Kami
              selalu mencari pembicara dan pemimpin workshop yang bersemangat.
            </p>
            <button
              className="group relative px-8 py-4 bg-gradient-to-r from-hot-pink to-neon-purple rounded-full font-semibold text-white shadow-lg hover:shadow-hot-pink/40 transition-all duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="flex items-center justify-center gap-2">
                Ajukan Acara
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
