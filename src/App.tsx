/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ShopPage from './pages/ShopPage';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}

function BackgroundLayers() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/10 blur-[130px] rounded-full animate-pulse delay-1000" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative bg-[#020617] selection:bg-blue-500/30 selection:text-white min-h-screen">
        <ScrollProgressBar />
        <BackgroundLayers />
        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/shop" element={<ShopPage />} />
          </Routes>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}
