import React, { useEffect, useRef } from 'react';
import { ArrowRight, Users, Calendar, Trophy, Star, ChevronDown } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '500+', label: 'Active Members', icon: Users },
    { number: '50+', label: 'Events This Year', icon: Calendar },
    { number: '25+', label: 'Achievements', icon: Trophy },
    { number: '4.9/5', label: 'Member Rating', icon: Star },
  ];

  return (
    <div className="relative pt-16">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                  Future
                </span>
                <br />
                <span className="text-white">
                  Leaders
                </span>
                <br />
                <span className="text-white/80">
                  Unite
                </span>
              </h1>
              <p className="text-xl text-white/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Join the most innovative student association where technology meets leadership, 
                and dreams become reality through collaboration and innovation.
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
            <GlassCard className="p-8 hover3D" hover3D gradient>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Community Hub</h3>
                      <p className="text-white/60">Active members online</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <div className="text-2xl font-bold text-electric-cyan">{stat.number}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/40" />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-4 scroll-animate opacity-0 translate-y-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Innovation</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Our community continues to grow and achieve remarkable milestones together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <GlassCard key={index} className="p-8 text-center group hover:scale-105 transition-transform duration-300" hover3D>
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
              Why Choose <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Our Community</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation First',
                description: 'Stay ahead with cutting-edge projects and technology-driven initiatives that shape the future.',
                color: 'from-electric-cyan to-blue-400'
              },
              {
                title: 'Collaborative Growth',
                description: 'Work with like-minded peers on projects that matter and make a real impact in your community.',
                color: 'from-neon-purple to-purple-400'
              },
              {
                title: 'Leadership Development',
                description: 'Develop essential leadership skills through hands-on experience and mentorship programs.',
                color: 'from-hot-pink to-red-400'
              }
            ].map((feature, index) => (
              <GlassCard key={index} className="p-8 group hover:scale-105 transition-all duration-300" hover3D>
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-3 transition-transform duration-300`}>
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;