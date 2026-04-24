/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { 
    name: 'Car Parts', 
    href: '/shop',
    dropdown: [
      { name: 'All Parts', href: '/shop' },
      { name: 'Windshield', href: '/shop?category=windshield' },
      { name: 'Engine Parts', href: '/shop?category=engine' },
      { name: 'Brakes', href: '/shop?category=brakes' },
      { name: 'Lights', href: '/shop?category=lights' },
      { name: 'Electrical', href: '/shop?category=electrical' },
      { name: 'Accessories', href: '/shop?category=accessories' },
    ]
  },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4 glass shadow-2xl' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 group-hover:scale-110 transition-transform duration-300">
              <Logo />
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-display font-bold tracking-tighter text-white leading-tight">
                CONTINENTAL
              </div>
              <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                Construction Services
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <div 
              key={item.name} 
              className="relative group h-full"
              onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.href.startsWith('/#') ? (
                <motion.button
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest py-2 cursor-pointer"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                </motion.button>
              ) : (
                <Link to={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest py-2"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                  </motion.div>
                </Link>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {item.dropdown && activeDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-56 mt-2 glass-dark rounded-xl overflow-hidden shadow-2xl border border-white/10"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-6 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-cyan-300 transition-all uppercase tracking-wider border-b border-white/5 last:border-b-0"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="tel:+639123456789" className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="text-sm font-bold">+63 912 345 6789</span>
          </a>
          <button 
            onClick={() => handleNavClick('/#contact')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all tracking-widest uppercase neon-glow cursor-pointer"
          >
            Get Quote
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
                  {item.href.startsWith('/#') ? (
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-lg font-display font-medium text-white uppercase tracking-widest text-left"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link 
                      to={item.href}
                      className="text-lg font-display font-medium text-white uppercase tracking-widest"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <div className="pl-4 flex flex-col gap-3 border-l border-white/10">
                      {item.dropdown.map((sub) => (
                        <Link 
                          key={sub.name}
                          to={sub.href}
                          className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="border-white/10" />
              <button 
                onClick={() => handleNavClick('/#contact')}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
