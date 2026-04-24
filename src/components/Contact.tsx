/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-[#020617]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Info Side */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1 glass rounded-full mb-6 border-blue-500/20"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-300">Get In Touch</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-10"
            >
              LET'S START <br />
              A <span className="text-blue-500">PROJECT.</span>
            </motion.h2>

            <div className="space-y-10">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@luminex.auto', sub: 'Direct Enquiry' },
                { icon: Phone, label: 'Call Us', value: '+1 (888) LUMINEX', sub: 'Mon-Fri 9am-6pm' },
                { icon: MapPin, label: 'Visit Us', value: '42 Silicon Plaza, Tech District', sub: 'Luxury Showroom' },
              ].map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl glass-dark border-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">{item.sub}</div>
                      <div className="text-white font-bold text-lg mb-1">{item.value}</div>
                      <div className="text-slate-500 text-sm">{item.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 glass p-8 md:p-12 rounded-[40px] border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Glossy Reflection */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            
            <form className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full h-16 glass-dark rounded-2xl px-6 text-white placeholder:text-slate-600 border-white/5 focus:border-blue-500/50 focus:ring-0 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full h-16 glass-dark rounded-2xl px-6 text-white placeholder:text-slate-600 border-white/5 focus:border-blue-500/50 focus:ring-0 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4">Service Type</label>
                <select className="w-full h-16 glass-dark rounded-2xl px-6 text-white border-white/5 focus:border-blue-500/50 focus:ring-0 outline-none transition-all appearance-none">
                  <option className="bg-slate-900">Glass Cleaning Service</option>
                  <option className="bg-slate-900">Purchase Car Parts</option>
                  <option className="bg-slate-900">Custom Engineering</option>
                  <option className="bg-slate-900">Partnership Inquiry</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold px-4">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe your requirements..." 
                  className="w-full glass-dark rounded-3xl p-6 text-white placeholder:text-slate-600 border-white/5 focus:border-blue-500/50 focus:ring-0 outline-none transition-all resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl shadow-blue-900/30 neon-glow transition-all"
                >
                  Send Enquiry
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
