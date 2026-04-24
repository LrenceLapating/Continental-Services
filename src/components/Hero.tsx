/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MousePointer2, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[800px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070"
          alt="Luxury Car"
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
        <motion.div
          animate={{
            x: ['200%', '-100%'],
            y: ['100%', '0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-[600px] h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-2xl -rotate-12 top-1/4"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        {/* Floating 3D-ish Element */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 10, 0],
            rotateX: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative mb-12"
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64 glass rounded-3xl flex items-center justify-center p-8 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Mirror effect / glass shard look */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-[200%] bg-white/10 rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2072" 
              alt="Floating Part"
              className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            
            {/* Glow dots/particles */}
            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-700" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-display font-bold leading-[1.1] mb-6 tracking-tighter text-white">
            UNREACHABLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">CLARITY.</span> <br />
            PRECISE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">PERFORMANCE.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Luxury glass treatment for architectural wonders and high-performance automotive maintenance. 
            The pinnacle of reflects and engine excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-xl shadow-blue-900/30 tracking-widest uppercase flex items-center gap-3 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-500" />
              Explore Services
              <MousePointer2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 glass text-white font-bold rounded-full transition-all tracking-widest uppercase flex items-center gap-3"
            >
              Browse Parts
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <div className="absolute bottom-12 left-0 right-0 z-10 hidden md:block">
        <div className="container mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { label: 'Transparency', value: '100%', sub: 'Crystal Clear Output' },
            { label: 'Precision', value: 'OEM', sub: 'High-End Certification' },
            { label: 'Durability', value: '12-mo', sub: 'Protective Warranty' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.2) }}
              className="border-t border-white/10 pt-4"
            >
              <div className="text-slate-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-1">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-display font-medium text-white">{stat.value}</span>
                <span className="text-slate-400 text-sm font-light italic">{stat.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>
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
  );
}
