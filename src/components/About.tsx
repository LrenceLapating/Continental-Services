/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Trophy, Users, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Geometric Background */}
            <div className="absolute -top-10 -left-10 w-64 h-64 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute -bottom-10 -right-10 w-96 h-96 border-2 border-cyan-500/10 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            
            <div className="relative glass p-4 rounded-[40px] rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=2070" 
                alt="Workshop"
                className="w-full aspect-[4/5] object-cover rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 glass-dark p-8 rounded-3xl shadow-2xl max-w-[240px]">
                <div className="text-4xl font-bold text-blue-500 mb-1">15+</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Years of Master Craftsmanship</div>
              </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-8 h-[2px] bg-blue-600" />
              <span className="text-blue-500 uppercase tracking-[0.3em] text-xs font-bold">Our Legacy</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-[1.1]"
            >
              DRIVEN BY PRECISION. <br />
              DEFINED BY <span className="text-cyan-400">QUALITY.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg font-light leading-relaxed mb-10"
            >
              Luminex was born from a singular obsession: the perfection of surfaces and mechanical harmony. 
              What started as a boutique car glass restoration studio has evolved into a global provider of 
              luxury architectural glass maintenance and elite performance automotive parts.
            </motion.p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { icon: Award, label: 'Standard', sub: 'Certificated OEM' },
                { icon: Trophy, label: 'Quality', sub: 'Elite Materials' },
                { icon: Users, label: 'Trust', sub: 'Global Clientele' },
                { icon: CheckCircle2, label: 'Service', sub: 'Lifetime Support' },
              ].map((item, idx) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm uppercase tracking-wider">{item.label}</div>
                    <div className="text-slate-500 text-xs">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-900/40"
            >
              Read Our Full Story
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
