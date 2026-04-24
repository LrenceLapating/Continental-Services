/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <Logo />
              </div>
              <div>
                <div className="text-lg font-display font-bold tracking-tighter text-white leading-tight">
                  CONTINENTAL
                </div>
                <div className="text-[9px] text-cyan-400 uppercase tracking-wider font-bold">
                  Construction Services
                </div>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Professional glass scratch removal and restoration services plus quality automotive parts. 
              Serving residential and commercial properties nationwide.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Instagram, href: '#' }
              ].map(({ Icon, href }, i) => (
                <motion.a 
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'Car Parts', href: '/shop' },
                { name: 'About Us', href: '/#about' },
                { name: 'Projects', href: '/#projects' },
                { name: 'Contact', href: '/#contact' }
              ].map(link => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Our Services</h4>
            <ul className="space-y-4">
              {[
                'Glass Scratch Removal',
                'Glass Restoration',
                'Construction Glass Repair',
                'High-Rise Glass Service',
                'Graffiti Removal',
                'Auto Parts Sales'
              ].map(service => (
                <li key={service}>
                  <a href="/services" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+639123456789" className="text-slate-400 hover:text-white text-sm transition-colors">
                    +63 912 345 6789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="mailto:info@continental-glass.com" className="text-slate-400 hover:text-white text-sm transition-colors">
                    info@continental-glass.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-400 text-sm">
                    Nationwide Service Coverage<br />
                    Philippines
                  </p>
                </div>
              </li>
            </ul>
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-all tracking-widest uppercase"
            >
              Get Free Quote
            </motion.a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-slate-600 text-[10px] uppercase tracking-widest font-bold text-center md:text-left">
            © {currentYear} Continental Construction Services. All Rights Reserved.
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
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
