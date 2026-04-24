/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="text-2xl font-display font-bold tracking-tighter text-white">LUMINEX</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              The pinnacle of clarity and performance. Professional glass restoration and elite automotive components for the modern world.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i}
                  href="#" 
                  whileHover={{ y: -3, color: '#3b82f6' }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-slate-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'Car Parts', 'About', 'Contact', 'Terms of Service'].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Specialties</h4>
            <ul className="space-y-4">
              {['Building Glass', 'Luxury Detailing', 'Engine Blocks', 'Nano-Coating', 'Custom Shards', 'Racing Kits'].map(link => (
                <li key={link}>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-6">Receive elite updates and technical specs directly.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="w-full h-14 glass-dark rounded-xl px-6 text-white text-sm outline-none border border-white/5 focus:border-blue-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 h-10 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
            © 2026 Luminex Glass & Auto. Engineered for Excellence.
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white shadow-2xl group"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
