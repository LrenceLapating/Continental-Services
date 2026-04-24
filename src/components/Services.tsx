/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Building2, CarFront, Home, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    title: 'Architectural Glazing',
    desc: 'Bespoke cleaning and maintenance for skyscrapers and modern luxury homes. We reach where others cannot.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=2070',
    tags: ['Building', 'Home', 'Maintenance']
  },
  {
    title: 'Automotive Detailing',
    desc: 'Nano-coating and hydrophobic treatments for premium vehicle glass. Unmatched clarity in any weather condition.',
    icon: CarFront,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070',
    tags: ['Luxury', 'Protection', 'Clarity']
  },
  {
    title: 'Precision Restoration',
    desc: 'Removing oxidation and minor scratches from vintage car windshields and architectural heritage glass.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=2070',
    tags: ['Restoration', 'Precision', 'Vintage']
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 bg-[#020617] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-cyan-900/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-[2px] bg-blue-600" />
              <span className="text-blue-500 uppercase tracking-[0.3em] text-xs font-bold">Solutions</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
              GLASS CLEANING <span className="text-slate-500 underline decoration-blue-600/50 underline-offset-8">EXCELLENCE.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg font-light leading-relaxed"
            >
              We don't just clean; we restore the fundamental brilliance of your environment. 
              Our proprietary methods ensure surfaces stay cleaner, longer.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex gap-4"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2 pt-8">
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-cyan-400">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500">Fast</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden glass-dark border-white/10"
            >
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center mb-6 border-white/20 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500 shadow-2xl">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-[0.2em] group/btn"
                >
                  View Details
                  <div className="w-8 h-[2px] bg-blue-600 group-hover/btn:w-12 transition-all" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
