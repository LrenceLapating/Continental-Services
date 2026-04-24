/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Sparkles, Shield, DollarSign, Clock, Award, Users, Building2, Mail, Phone, MapPin } from 'lucide-react';
import React, { useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  const projects = [
    { name: 'St. Honore – ASEC', location: 'Iloilo City' },
    { name: 'St. Dominique – ASEC', location: 'Iloilo City' },
    { name: 'Tulip Gardens – ASEC', location: 'Laguna City' },
    { name: 'St. Honore Fitness Gym – Megaworld Corp.', location: 'Iloilo City' },
    { name: 'St. Dominique Kids Playground – Megaworld Corp.', location: 'Iloilo City' },
    { name: 'Avida Atria T2 – MDC', location: 'Iloilo City' },
    { name: 'Avida Aspira T2 – MDC', location: 'Cagayan de Oro City' },
    { name: 'Woodridge Residences', location: 'Davao City' },
    { name: 'Hop Inn Hotel – Maximus Innovation Corp.', location: 'Davao City' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070"
            alt="Glass Building"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617]/80 to-transparent" />
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
        </div>

        {/* Animated Light Streaks */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <motion.div
            animate={{
              x: ['-100%', '200%'],
              y: ['0%', '100%'],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-[800px] h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-2xl rotate-45"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-2 glass rounded-full text-cyan-400 font-bold uppercase tracking-wider text-sm mb-4">
                Professional Glass Restoration
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] mb-6 tracking-tighter text-white">
              CONTINENTAL GLASS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                SCRATCH REMOVAL
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              The Ultimate Glass Scratch Repair System. Professional restoration services for residential and commercial properties. 
              Save up to 50% compared to glass replacement.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a 
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-xl shadow-blue-900/30 tracking-widest uppercase flex items-center gap-3 group overflow-hidden relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500" />
                Our Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.button 
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 glass text-white font-bold rounded-full transition-all tracking-widest uppercase flex items-center gap-3 cursor-pointer"
              >
                Get Free Quote
                <Phone className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Do</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We remove minor to heavy scratches on different types of glass surfaces
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, title: 'Windows', desc: 'Homes and buildings' },
              { icon: Sparkles, title: 'Glass Doors', desc: 'Doors and partitions' },
              { icon: Building2, title: 'High-Rise Glass', desc: 'Building exteriors' },
              { icon: Shield, title: 'Construction Glass', desc: 'Construction-affected surfaces' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all group text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Glass Restoration */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Why Choose Glass <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Restoration?</span>
              </h2>
              <div className="space-y-4">
                {[
                  { icon: DollarSign, title: 'Cost-effective', desc: 'Much cheaper than full glass replacement' },
                  { icon: Sparkles, title: 'Eco-friendly', desc: 'Reduces glass waste and landfill impact' },
                  { icon: Clock, title: 'Fast turnaround', desc: 'Faster than replacing glass entirely' },
                  { icon: Shield, title: 'Restores appearance', desc: 'Keeps original glass intact' },
                  { icon: CheckCircle, title: 'Save 25%–50%', desc: 'Of replacement cost' }
                ].map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 glass rounded-xl p-4 border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{benefit.title}</h3>
                        <p className="text-slate-400 text-sm">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                alt="Glass Building"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10 scroll-mt-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              Completed <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Projects</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Trusted by leading construction companies and property developers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-slate-400 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {project.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10 scroll-mt-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
                alt="Our Team"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Expertise</span>
              </h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                We are trusted glass restoration specialists with years of experience, offering industry-standard services at affordable rates. 
                We use a multi-step restoration process with advanced micro-abrasive tools to safely remove scratches.
              </p>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Our team is trained to handle both interior and exterior glass restoration, including hard-to-reach and elevated areas. 
                We work closely with clients to assess damage and provide no-obligation consultations and quotations.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, label: 'Years Experience', value: '10+' },
                  { icon: Users, label: 'Happy Clients', value: '500+' },
                  { icon: Building2, label: 'Projects Done', value: '1000+' },
                  { icon: CheckCircle, label: 'Success Rate', value: '99%' }
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="glass rounded-xl p-4 border border-white/10 text-center">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-2xl font-display font-bold text-cyan-400 mb-1">{stat.value}</div>
                      <div className="text-slate-400 text-xs uppercase tracking-wider">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10 scroll-mt-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Touch</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Request a free consultation and quote for your glass restoration project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, label: 'Phone', value: '+63 12345227', href: 'tel:+6391444444789' },
              { icon: Mail, label: 'Email', value: 'info@continental-glass.com', href: 'mailto:info@continental-glass.com' },
              { icon: MapPin, label: 'Service Areas', value: 'Nationwide Coverage' }
            ].map((info, idx) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 border border-white/10 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {info.label}
                  </h3>
                  {info.href ? (
                    <a href={info.href} className="text-white font-bold hover:text-cyan-400 transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white font-bold">{info.value}</p>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto glass rounded-3xl p-12 border border-white/10"
          >
            <h3 className="text-3xl font-display font-bold mb-8 text-white text-center">
              Request a Free Quote
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white placeholder-slate-500 focus:outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white placeholder-slate-500 focus:outline-none transition-all"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white placeholder-slate-500 focus:outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Service Type
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-6 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white focus:outline-none transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="residential">Residential Glass</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="highrise">High-Rise Glass</option>
                  <option value="construction">Construction Glass</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-3 glass rounded-xl border border-white/10 focus:border-cyan-400/50 text-white placeholder-slate-500 focus:outline-none transition-all resize-none"
                  placeholder="Tell us about your glass restoration needs..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Submit Request
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
