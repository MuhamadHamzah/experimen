import { useEffect, useRef, useState } from "react";
import {
  Users,
  Target,
  Lightbulb,
  Heart,
  Zap,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import GlassCard from "../components/GlassCard";
import { supabase, TeamMember } from "../lib/supabase";

const AboutPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Lightbulb,
      title: "Inovasi",
      description:
        "Kami berani melangkah lebih jauh dan mengembangkan teknologi terkini demi solusi yang bermanfaat.",
      color: "cyan",
    },
    {
      icon: Users,
      title: "Kolaborasi",
      description:
        "Kami percaya pada kekuatan kerja sama untuk menciptakan dampak yang lebih besar.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Keunggulan",
      description:
        "Kami berkomitmen untuk mencapai standar tertinggi dalam segala hal yang kami lakukan.",
      color: "pink",
    },
    {
      icon: Heart,
      title: "Dampak Positif",
      description:
        "Kami berdedikasi untuk memberikan kontribusi positif bagi masyarakat dan industri teknologi.",
      color: "cyan",
    },
  ];

  useEffect(() => {
    const fetchTeam = async () => {
      const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });

      if (data && data.length > 0) {
        setTeamMembers(data);
      }
    };

    fetchTeam();
  }, []);

  const team = teamMembers.length > 0
    ? teamMembers.map(member => ({
        name: member.name,
        role: member.position,
        image: member.photo_url,
        bio: member.bio,
        social: { github: "#", linkedin: "#", twitter: "#" },
      }))
    : [
        {
          name: "Pinkan Aprilia",
          role: "Ketua Umum HMP-TI Angkatan 13",
          image: "/img/team/pinkan.jpg",
          bio: "Kata kata motivasi",
          social: { github: "#", linkedin: "#", twitter: "#" },
        },
        {
          name: "M. Fajar Hermawan",
          role: "Wakil Ketua Umum HMP-TI Angkatan 13",
          image: "/img/team/fajar.jpg",
          bio: "Kata kata motivasi",
          social: { github: "#", linkedin: "#", twitter: "#" },
        },
        {
          name: "Muhammad Firdaus",
          role: "Sekertaris Umum",
          image: "/img/team/firdaus.jpg",
          bio: "Kata kata motivasi",
          social: { github: "#", linkedin: "#", twitter: "#" },
        },
        {
          name: "Aprilia Firdayani",
          role: "Bendahara Umum",
          image: "/img/team/aprilia.jpg",
          bio: "Kata kata motivasi",
          social: { github: "#", linkedin: "#", twitter: "#" },
        },
      ];

  const stats = [
    { number: "50+", label: "Anggota Aktif" },
    { number: "3", label: "Tahun Pengalaman" },
    { number: "20+", label: "Event yang di adakan" },
    { number: "10+", label: "Prestasi Juara" },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 relative">
      {/* Header Section */}
      <section ref={headerRef} className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-10">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                Tentang Kami
              </span>
              <br />
              <span className="text-white">Our Vision</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Menjadi organisasi terdepan yang menginspirasi dan memberdayakan
              generasi muda untuk berinovasi dan berkontribusi dalam dunia
              teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-animate opacity-0 translate-y-10">
            <GlassCard className="p-6 sm:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                    Misi{" "}
                    <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                      Kami
                    </span>
                  </h2>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6">
                    Menyediakan platform bagi mahasiswa untuk mengembangkan
                    keterampilan teknis dan kepemimpinan melalui proyek nyata
                    dan kolaborasi.
                  </p>
                  <div className="flex items-start sm:items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        Mendorong Inovasi
                      </h3>
                      <p className="text-sm sm:text-base text-white/60">
                        Melakukan riset dan pengembangan teknologi terbaru untuk
                        menciptakan solusi inovatif.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 sm:p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                    >
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent mb-1 sm:mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 scroll-animate opacity-0 translate-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Value{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Kami
              </span>
            </h2>
            <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto px-4">
              Prinsip-prinsip yang kami pegang teguh dalam setiap langkah kami.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="scroll-animate opacity-0 translate-y-10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GlassCard className="p-4 sm:p-8 text-center group h-full">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-r ${
                        value.color === "cyan"
                          ? "from-electric-cyan to-blue-400"
                          : value.color === "purple"
                          ? "from-neon-purple to-purple-400"
                          : "from-hot-pink to-red-400"
                      } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4 group-hover:text-electric-cyan transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                      {value.description}
                    </p>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 scroll-animate opacity-0 translate-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Kenali Tim{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Kami
              </span>
            </h2>
            <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto px-4">
              Tim berdedikasi yang menggerakkan visi dan misi kami ke depan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-10"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <GlassCard className="p-4 sm:p-6 group h-full">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-electric-cyan/20 group-hover:ring-electric-cyan/40 transition-all duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/img/team-placeholder.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-electric-cyan transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-electric-cyan text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-3 sm:mb-4">
                      {member.bio}
                    </p>

                    <div className="flex justify-center space-x-2 sm:space-x-3">
                      <a
                        href={member.social.github}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors"
                        aria-label={`${member.name} GitHub`}
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors"
                        aria-label={`${member.name} Twitter`}
                      >
                        <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-10">
            <GlassCard className="p-8 sm:p-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                Siap Untuk{" "}
                <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                  Bergabung?
                </span>
              </h2>
              <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                Jadilah bagian dari komunitas kami yang dinamis dan
                berkontribusi dalam perjalanan teknologi yang menarik ini.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full font-semibold text-white shadow-lg hover:shadow-electric-cyan/40 transition-all duration-300 hover:scale-105">
                  <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                    Gabung sebagai Anggota
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
                <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
