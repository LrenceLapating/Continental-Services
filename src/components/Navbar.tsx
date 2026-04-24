/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShoppingCart, Search } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#services' },
  { 
    name: 'Car Parts', 
    href: '#shop',
    dropdown: [
      { name: 'All Parts', href: '#shop' },
      { name: 'Windshield', href: '#shop?cat=windshield' },
      { name: 'Engine', href: '#shop?cat=engine' },
      { name: 'Accessories', href: '#shop?cat=accessories' },
    ]
  },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">L</span>
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white">
            LUMINEX
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <div 
              key={item.name}
              className="relative group h-full"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.a
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest py-2"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
              </motion.a>

              {/* Dropdown */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 w-48 mt-2 glass-dark rounded-xl overflow-hidden shadow-2xl"
                  >
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-6 py-3 text-xs text-slate-300 hover:bg-white/10 hover:text-cyan-300 transition-all uppercase tracking-wider"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-slate-300 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-slate-300 hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-white/5 relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all tracking-widest uppercase neon-glow">
            Enquire Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-dark border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col gap-4">
                  <a 
                    href={item.href}
                    className="text-lg font-display font-medium text-white uppercase tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="pl-4 flex flex-col gap-3 border-l border-white/10">
                      {item.dropdown.map((sub) => (
                        <a 
                          key={sub.name}
                          href={sub.href}
                          className="text-sm text-slate-400 hover:text-cyan-400"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="border-white/10" />
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest">
                Enquire Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
