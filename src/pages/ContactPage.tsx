import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Calendar,
  ExternalLink,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);

    // Here you would typically send the data to your backend
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Kami",
      value: "hello@studentassoc.edu",
      description: "Kirim kami email kapan saja",
      action: "mailto:hello@studentassoc.edu",
      color: "cyan",
    },
    {
      icon: Phone,
      title: "Telepon Kami",
      value: "+62 812-3456-7890",
      description: "Sen-Jum 09.00-18.00",
      action: "tel:+6281234567890",
      color: "purple",
    },
    {
      icon: MapPin,
      title: "Kunjungi Kami",
      value: "Gedung Teknologi, Ruang 301",
      description: "Kampus Universitas",
      action: "https://maps.google.com",
      color: "pink",
    },
  ];

  const socialLinks = [
    { name: "Discord", url: "#", color: "bg-indigo-600" },
    { name: "Instagram", url: "#", color: "bg-pink-600" },
    { name: "LinkedIn", url: "#", color: "bg-blue-600" },
    { name: "GitHub", url: "#", color: "bg-gray-800" },
    { name: "Twitter", url: "#", color: "bg-blue-500" },
    { name: "YouTube", url: "#", color: "bg-red-600" },
  ];

  const faqItems = [
    {
      question: "Bagaimana cara bergabung dengan himpunan mahasiswa?",
      answer:
        "Anda dapat bergabung dengan menghadiri salah satu acara kami atau mengisi formulir keanggotaan di situs web kami. Keanggotaan terbuka untuk semua mahasiswa.",
    },
    {
      question: "Apakah ada biaya keanggotaan?",
      answer:
        "Tidak, keanggotaan sepenuhnya gratis! Kami percaya dalam membuat komunitas kami dapat diakses oleh semua orang.",
    },
    {
      question: "Jenis acara apa yang Anda selenggarakan?",
      answer:
        "Kami menyelenggarakan workshop, bootcamp, acara jaringan, konferensi, dan aktivitas sosial yang berfokus pada teknologi dan pengembangan profesional.",
    },
    {
      question: "Dapatkah saya mengusulkan workshop atau acara?",
      answer:
        "Tentu saja! Kami menyambut baik proposal dari anggota komunitas. Hubungi kami dengan ide Anda dan kami akan membantu Anda mewujudkannya.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 px-4 relative">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-10">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                Hubungi
              </span>
              <br />
              <span className="text-white">Kami</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Memiliki pertanyaan, ide, atau ingin berkolaborasi? Kami ingin
              mendengar dari Anda. Hubungi kami dan mari membangun sesuatu yang
              luar biasa bersama.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="scroll-animate opacity-0 translate-y-10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <GlassCard className="p-8 text-center group">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${
                        info.color === "cyan"
                          ? "from-electric-cyan to-blue-400"
                          : info.color === "purple"
                          ? "from-neon-purple to-purple-400"
                          : "from-hot-pink to-red-400"
                      } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-xl text-electric-cyan mb-2">
                      {info.value}
                    </p>
                    <p className="text-white/60 mb-4">{info.description}</p>

                    <a
                      href={info.action}
                      target={
                        info.action.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        info.action.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-2 text-white/80 hover:text-electric-cyan transition-colors"
                    >
                      Hubungi Sekarang
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="scroll-animate opacity-0 translate-y-10">
              <GlassCard className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Kirim kami{" "}
                  <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                    Pesan
                  </span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Nama
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                        placeholder="Nama lengkap Anda"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Subjek
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                    >
                      <option value="">Pilih subjek</option>
                      <option value="membership">Pertanyaan Keanggotaan</option>
                      <option value="event">Usulan Acara</option>
                      <option value="partnership">Kemitraan</option>
                      <option value="general">Pertanyaan Umum</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Pesan
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm resize-none"
                      placeholder="Ceritakan tentang pertanyaan Anda..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-xl font-semibold text-white shadow-lg hover:shadow-electric-cyan/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          Kirim Pesan
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </GlassCard>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div
                className="scroll-animate opacity-0 translate-y-10"
                style={{ animationDelay: "0.2s" }}
              >
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-electric-cyan" />
                    Jam Operasional
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Senin - Jumat</span>
                      <span className="text-white">09.00 - 18.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Sabtu</span>
                      <span className="text-white">10.00 - 16.00</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70">Minggu</span>
                      <span className="text-white/60">Tutup</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Social Links */}
              <div
                className="scroll-animate opacity-0 translate-y-10"
                style={{ animationDelay: "0.3s" }}
              >
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-neon-purple" />
                    Hubungi Kami
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} p-4 rounded-xl text-white text-center font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg`}
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Pertanyaan yang{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Sering Diajukan
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Jawaban cepat untuk pertanyaan umum tentang komunitas kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className="scroll-animate opacity-0 translate-y-10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GlassCard className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
