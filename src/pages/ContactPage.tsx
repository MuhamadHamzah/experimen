import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, ExternalLink } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    // Here you would typically send the data to your backend
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'hello@studentassoc.edu',
      description: 'Send us an email anytime',
      action: 'mailto:hello@studentassoc.edu',
      color: 'cyan'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM',
      action: 'tel:+15551234567',
      color: 'purple'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Tech Building, Room 301',
      description: 'University Campus',
      action: 'https://maps.google.com',
      color: 'pink'
    }
  ];

  const socialLinks = [
    { name: 'Discord', url: '#', color: 'bg-indigo-600' },
    { name: 'Instagram', url: '#', color: 'bg-pink-600' },
    { name: 'LinkedIn', url: '#', color: 'bg-blue-600' },
    { name: 'GitHub', url: '#', color: 'bg-gray-800' },
    { name: 'Twitter', url: '#', color: 'bg-blue-500' },
    { name: 'YouTube', url: '#', color: 'bg-red-600' }
  ];

  const faqItems = [
    {
      question: 'How can I join the student association?',
      answer: 'You can join by attending one of our events or filling out the membership form on our website. Membership is open to all students.'
    },
    {
      question: 'Are there any membership fees?',
      answer: 'No, membership is completely free! We believe in making our community accessible to everyone.'
    },
    {
      question: 'What kind of events do you organize?',
      answer: 'We organize workshops, bootcamps, networking events, conferences, and social activities focused on technology and professional development.'
    },
    {
      question: 'Can I propose a workshop or event?',
      answer: 'Absolutely! We welcome proposals from community members. Contact us with your ideas and we\'ll help you make it happen.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 relative">
      {/* Header Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="scroll-animate opacity-0 translate-y-10">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent">
                Get In
              </span>
              <br />
              <span className="text-white">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Have questions, ideas, or want to collaborate? We'd love to hear from you. 
              Reach out and let's build something amazing together.
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
                <GlassCard 
                  key={index} 
                  className="p-8 text-center group scroll-animate opacity-0 translate-y-10" 
                  hover3D
                  interactive
                  glowColor={info.color as any}
                  style={{ animationDelay: `${index * 0.1}s` } as any}
                >
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${
                    info.color === 'cyan' ? 'from-electric-cyan to-blue-400' :
                    info.color === 'purple' ? 'from-neon-purple to-purple-400' :
                    'from-hot-pink to-red-400'
                  } rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{info.title}</h3>
                  <p className="text-xl text-electric-cyan mb-2">{info.value}</p>
                  <p className="text-white/60 mb-4">{info.description}</p>
                  
                  <a 
                    href={info.action}
                    target={info.action.startsWith('http') ? '_blank' : undefined}
                    rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-white/80 hover:text-electric-cyan transition-colors"
                  >
                    Contact Now
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </GlassCard>
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
              <GlassCard className="p-8" gradient hover3D>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Send us a <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Message</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                        placeholder="Your full name"
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
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm"
                    >
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="event">Event Proposal</option>
                      <option value="partnership">Partnership</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-electric-cyan focus:outline-none transition-colors backdrop-blur-sm resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-electric-cyan to-neon-purple rounded-xl font-semibold text-white shadow-lg hover:shadow-electric-cyan/40 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed interactive"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
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
              <div className="scroll-animate opacity-0 translate-y-10" style={{ animationDelay: '0.2s' } as any}>
                <GlassCard className="p-8" hover3D>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-electric-cyan" />
                    Office Hours
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Monday - Friday</span>
                      <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/10">
                      <span className="text-white/70">Saturday</span>
                      <span className="text-white">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white/70">Sunday</span>
                      <span className="text-white/60">Closed</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Social Links */}
              <div className="scroll-animate opacity-0 translate-y-10" style={{ animationDelay: '0.3s' } as any}>
                <GlassCard className="p-8" hover3D>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-neon-purple" />
                    Connect With Us
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} p-4 rounded-xl text-white text-center font-medium hover:scale-105 transition-all duration-300 hover:shadow-lg interactive`}
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
              Frequently Asked <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Quick answers to common questions about our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <GlassCard 
                key={index} 
                className="p-8 scroll-animate opacity-0 translate-y-10" 
                hover3D
                style={{ animationDelay: `${index * 0.1}s` } as any}
              >
                <h3 className="text-xl font-bold text-white mb-4">{faq.question}</h3>
                <p className="text-white/70 leading-relaxed">{faq.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;