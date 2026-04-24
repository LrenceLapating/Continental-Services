/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Settings, Shield, Zap, Wind, Plus, ShoppingCart } from 'lucide-react';

const categories = ['All Parts', 'Windshield', 'Engine', 'Accessories'];

const products = [
  { id: 1, name: 'Quantum V1 Windshield', category: 'Windshield', price: '899.00', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070', icon: Wind },
  { id: 2, name: 'Titan-X Engine Block', category: 'Engine', price: '4,250.00', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2072', icon: Settings },
  { id: 3, name: 'Cyber-Flow Air Intake', category: 'Accessories', price: '349.99', image: 'https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&q=80&w=2070', icon: Zap },
  { id: 4, name: 'Sentinel Glass Polish', category: 'Accessories', price: '45.00', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=2070', icon: Shield },
  { id: 5, name: 'Vortex Fuel Injectors', category: 'Engine', price: '1,120.00', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2072', icon: Zap },
  { id: 6, name: 'Aero-Dynamic Side Mirrors', category: 'Accessories', price: '299.00', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2070', icon: Wind },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All Parts');

  const filteredProducts = activeCategory === 'All Parts' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="shop" className="relative py-32 bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 glass rounded-full mb-6 border-blue-500/20"
          >
            <Settings className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-blue-300">Premium Marketplace</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-8"
          >
            HIGH-PERFORMANCE <span className="text-blue-500">COMPONENTS.</span>
          </motion.h2>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white neon-glow' 
                    : 'glass text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group glass-dark rounded-3xl overflow-hidden border-white/5 hover:border-blue-500/30 transition-all duration-500"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 glass rounded-lg text-[10px] text-white font-bold uppercase tracking-widest">
                    {product.category}
                  </div>

                  {/* Add to Cart Quick Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl"
                    >
                      <Plus className="w-8 h-8" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <product.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Industrial Grade</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-2xl font-display font-medium text-white">
                      <span className="text-sm text-blue-500 mr-1">$</span>
                      {product.price}
                    </span>
                    <button className="flex items-center gap-2 text-xs text-blue-400 uppercase tracking-widest font-bold border-b border-blue-500/0 hover:border-blue-500 transition-all py-1">
                      View Source
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-12 py-5 border border-white/10 glass rounded-full text-white font-bold uppercase tracking-widest flex items-center gap-4 mx-auto"
          >
            View Entire Catalog
            <ShoppingCart className="w-5 h-5 text-blue-400" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
