import React, { useEffect, useRef } from 'react';
import { Users, Target, Lightbulb, Award, Heart, Zap, Github, Linkedin, Twitter } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const AboutPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);

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

  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We push boundaries and embrace cutting-edge technologies to create meaningful solutions.',
      color: 'cyan'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Together we achieve more. Our strength lies in our diverse community working as one.',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from code to leadership.',
      color: 'pink'
    },
    {
      icon: Heart,
      title: 'Impact',
      description: 'We create projects and initiatives that make a positive difference in our community.',
      color: 'cyan'
    }
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: 'President',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Passionate about Web3 technologies and building inclusive communities.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Maria Rodriguez',
      role: 'Vice President',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Expert in blockchain development and decentralized applications.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'David Kim',
      role: 'Tech Lead',
      image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Full-stack developer with expertise in modern web technologies.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    },
    {
      name: 'Sarah Johnson',
      role: 'Events Coordinator',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Creates amazing experiences that bring our community together.',
      social: { github: '#', linkedin: '#', twitter: '#' }
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Members' },
    { number: '3', label: 'Years of Excellence' },
    { number: '50+', label: 'Successful Projects' },
    { number: '25+', label: 'Industry Partners' }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 relative">
      {/* Header Section */}
      <section ref={headerRef} className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-10">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="text-white">
                Our Vision
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12">
              We are a community of forward-thinking students passionate about technology, 
              innovation, and creating positive impact. Together, we're building the future 
              of digital experiences and blockchain technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <GlassCard className="p-12 scroll-animate opacity-0 translate-y-10" hover3D gradient>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Our <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  To empower the next generation of tech leaders by providing a platform for learning, 
                  collaboration, and innovation. We bridge the gap between academic knowledge and 
                  real-world applications in Web3, blockchain, and emerging technologies.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Innovation Driven</h3>
                    <p className="text-white/60">Pushing boundaries in tech education</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-3xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <GlassCard 
                  key={index} 
                  className="p-8 text-center group scroll-animate opacity-0 translate-y-10" 
                  hover3D 
                  interactive
                  glowColor={value.color as any}
                  style={{ animationDelay: `${index * 0.1}s` } as any}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${
                    value.color === 'cyan' ? 'from-electric-cyan to-blue-400' :
                    value.color === 'purple' ? 'from-neon-purple to-purple-400' :
                    'from-hot-pink to-red-400'
                  } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-animate opacity-0 translate-y-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              The passionate individuals driving our community forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <GlassCard 
                key={index} 
                className="p-6 group scroll-animate opacity-0 translate-y-10" 
                hover3D 
                interactive
                style={{ animationDelay: `${index * 0.15}s` } as any}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden ring-4 ring-electric-cyan/20 group-hover:ring-electric-cyan/40 transition-all duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-electric-cyan text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-3">
                    <a href={member.social.github} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors">
                      <Github className="w-4 h-4 text-white" />
                    </a>
                    <a href={member.social.linkedin} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                    <a href={member.social.twitter} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-electric-cyan/20 transition-colors">
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <GlassCard className="p-16 scroll-animate opacity-0 translate-y-10" gradient hover3D>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Join Us?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Be part of a community that's shaping the future of technology and making a real impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-full font-semibold text-white shadow-lg hover:shadow-electric-cyan/40 transition-all duration-300 hover:scale-105 interactive">
                <span className="flex items-center justify-center gap-2">
                  Become a Member
                  <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm interactive">
                Learn More
              </button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;