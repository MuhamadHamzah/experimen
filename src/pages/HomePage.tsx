import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Star,
  ChevronDown,
} from "lucide-react";
import GlassCard from "../components/GlassCard";

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [logoHovered, setLogoHovered] = useState(false);

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

  const stats = [
    { number: "500+", label: "Active Members", icon: Users },
    { number: "50+", label: "Events This Year", icon: Calendar },
    { number: "25+", label: "Achievements", icon: Trophy },
    { number: "4.9/5", label: "Member Rating", icon: Star },
  ];

  return (
    <div className="relative pt-16">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="text-white">Leaders</span>
                <br />
                <span className="text-white/80">Unite</span>
              </h1>
              <p className="text-xl text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Join the most innovative student association where technology
                meets leadership, and dreams become reality through
                collaboration and innovation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full font-semibold text-white shadow-lg shadow-electric-cyan/25 hover:shadow-electric-cyan/40 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  Join Community
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div
              className="flex items-center justify-center"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              {/* Background Particles dengan animasi */}
              {logoHovered && (
                <div className="absolute inset-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none">
                  <div className="absolute top-12 left-12 w-3 h-3 bg-electric-cyan rounded-full animate-pulse"></div>
                  <div className="absolute top-20 right-16 w-2 h-2 bg-neon-purple rounded-full animate-ping"></div>
                  <div className="absolute bottom-20 left-16 w-2.5 h-2.5 bg-electric-cyan rounded-full animate-bounce"></div>
                  <div className="absolute bottom-12 right-12 w-2 h-2 bg-hot-pink rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 left-8 w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping"></div>
                  <div className="absolute top-2/3 right-8 w-2 h-2 bg-electric-cyan rounded-full animate-bounce"></div>
                </div>
              )}

              {/* Logo utama HMP-TI saja tanpa kotak */}
              <div
                className={`
                relative transition-all duration-700 ease-out
                ${
                  logoHovered
                    ? "scale-150 drop-shadow-[0_0_80px_rgba(0,210,255,1)]"
                    : "scale-100 drop-shadow-[0_0_40px_rgba(0,210,255,0.6)]"
                }
              `}
              >
                {/* Outer glow ring */}
                <div
                  className={`
                  absolute inset-0 rounded-full transition-all duration-700
                  ${
                    logoHovered
                      ? "bg-gradient-to-r from-electric-cyan/50 to-neon-purple/50 scale-200 blur-2xl"
                      : "bg-gradient-to-r from-electric-cyan/30 to-neon-purple/30 scale-100 blur-xl"
                  }
                `}
                ></div>

                {/* Logo langsung tanpa container kotak */}
                <img
                  src="../../public/img/logo_hmpti.jpg"
                  alt="HMP-TI Logo"
                  className={`
                    w-80 h-80 object-contain transition-all duration-700 ease-out relative z-10
                    ${
                      logoHovered
                        ? "scale-90 brightness-150 saturate-150 contrast-125 drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] rotate-12"
                        : "scale-100 brightness-100 saturate-100 contrast-100 rotate-0"
                    }
                  `}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />
                {/* Fallback icon */}
                <div className="hidden w-80 h-80 items-center justify-center">
                  <Users className="w-48 h-48 text-electric-cyan" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/40" />
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 px-4 scroll-animate opacity-0 translate-y-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Our community continues to grow and achieve remarkable milestones
              together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlassCard
                  key={index}
                  className="p-8 text-center group hover:scale-105 transition-transform duration-300"
                  hover3D
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/60 font-medium">{stat.label}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 scroll-animate opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">
                Our Community
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation First",
                description:
                  "Stay ahead with cutting-edge projects and technology-driven initiatives that shape the future.",
                color: "from-electric-cyan to-blue-400",
              },
              {
                title: "Collaborative Growth",
                description:
                  "Work with like-minded peers on projects that matter and make a real impact in your community.",
                color: "from-neon-purple to-purple-400",
              },
              {
                title: "Leadership Development",
                description:
                  "Develop essential leadership skills through hands-on experience and mentorship programs.",
                color: "from-hot-pink to-red-400",
              },
            ].map((feature, index) => (
              <GlassCard
                key={index}
                className="p-8 group hover:scale-105 transition-all duration-300"
                hover3D
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
