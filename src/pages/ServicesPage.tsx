/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, Shield, Zap, Droplets, Wind, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Sparkles,
    title: 'Scratch Removal',
    description: 'Professional removal of minor to heavy scratches on all types of glass surfaces using advanced micro-abrasive tools.',
    features: ['Minor scratches', 'Heavy damage', 'All glass types', 'Professional tools'],
    applications: ['Windows', 'Glass doors', 'Partitions', 'Building facades']
  },
  {
    icon: Shield,
    title: 'Glass Restoration',
    description: 'Complete restoration process for damaged glass surfaces, bringing them back to original clarity and appearance.',
    features: ['Multi-step process', 'Original clarity', 'Cost-effective', 'Fast turnaround'],
    applications: ['Residential', 'Commercial', 'High-rise', 'Construction sites']
  },
  {
    icon: Wrench,
    title: 'Construction Glass Repair',
    description: 'Specialized repair for glass damaged during construction, including scratches from tools, cement, and other materials.',
    features: ['Tool damage repair', 'Cement removal', 'Slurry cleaning', 'Welding burn repair'],
    applications: ['New buildings', 'Renovations', 'Construction sites', 'Developer projects']
  },
  {
    icon: Wind,
    title: 'High-Rise Glass Service',
    description: 'Expert service for elevated and hard-to-reach glass surfaces on high-rise buildings and commercial structures.',
    features: ['Elevated access', 'Safety certified', 'Professional team', 'Exterior work'],
    applications: ['Office buildings', 'Condominiums', 'Hotels', 'Commercial towers']
  },
  {
    icon: Droplets,
    title: 'Graffiti & Vandalism Removal',
    description: 'Complete removal of graffiti, vandalism marks, and intentional damage from glass surfaces.',
    features: ['Graffiti removal', 'Scratch repair', 'Chemical damage', 'Acid etching'],
    applications: ['Storefronts', 'Public buildings', 'Transit stations', 'Commercial properties']
  },
  {
    icon: Zap,
    title: 'Environmental Damage Repair',
    description: 'Restoration of glass damaged by environmental factors including acid rain, water stains, and weathering.',
    features: ['Acid rain damage', 'Water stains', 'Weathering', 'Mineral deposits'],
    applications: ['Building exteriors', 'Windows', 'Glass facades', 'Skylights']
  }
];

const damageTypes = [
  { icon: Wrench, title: 'Construction Tools', desc: 'Scrapers, sanding, carbide scribes' },
  { icon: Droplets, title: 'Cement & Concrete', desc: 'Slurry exposure and residue' },
  { icon: Zap, title: 'Welding Burns', desc: 'Metal sparks and heat damage' },
  { icon: AlertTriangle, title: 'Harsh Chemicals', desc: 'Acids and corrosive materials' },
  { icon: Sparkles, title: 'Graffiti', desc: 'Vandalism and intentional damage' },
  { icon: Wind, title: 'Environmental', desc: 'Acid rain and water stains' }
];

const processSteps = [
  {
    step: '01',
    title: 'Assessment',
    description: 'Free consultation and damage evaluation to determine the best restoration approach.'
  },
  {
    step: '02',
    title: 'Preparation',
    description: 'Surface cleaning and preparation using specialized solutions and techniques.'
  },
  {
    step: '03',
    title: 'Restoration',
    description: 'Multi-step micro-abrasive process to safely remove scratches and restore clarity.'
  },
  {
    step: '04',
    title: 'Polishing',
    description: 'Final polishing and quality check to ensure perfect transparency and finish.'
  }
];

export default function ServicesPage() {
  return (
    <div className="relative pt-32 pb-20">
      {/* Header */}
      <section className="px-6 mb-20">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2 glass rounded-full text-cyan-400 font-bold uppercase tracking-wider text-sm mb-4">
              Professional Glass Restoration
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Services</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive glass scratch removal and restoration services for residential and commercial properties. 
              Save up to 50% compared to glass replacement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="glass rounded-2xl p-8 border border-white/10 hover:border-cyan-400/30 transition-all group"
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6 space-y-2">
                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-3">Features:</h4>
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Applications:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.applications.map((app) => (
                        <span key={app} className="px-3 py-1 glass rounded-full text-xs text-slate-300 border border-white/10">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Damage Types We Handle */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Damage Types We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Handle</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Our advanced restoration process can repair glass damaged by various causes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {damageTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{type.title}</h3>
                      <p className="text-slate-400 text-sm">{type.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Restoration Process */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Process</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Multi-step restoration process using advanced micro-abrasive tools
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((process, idx) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-8 border border-white/10 relative overflow-hidden group"
              >
                <div className="absolute top-4 right-4 text-6xl font-display font-bold text-white/5 group-hover:text-cyan-400/10 transition-colors">
                  {process.step}
                </div>
                <div className="relative z-10">
                  <div className="text-3xl font-display font-bold text-cyan-400 mb-4">{process.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{process.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{process.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <div className="glass rounded-3xl p-12 md:p-16 border border-white/10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
                  Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Us?</span>
                </h2>
                <div className="space-y-4">
                  {[
                    'Industry-standard services at affordable rates',
                    'Years of experience in glass restoration',
                    'Trained team for interior and exterior work',
                    'Hard-to-reach and elevated area specialists',
                    'No-obligation consultations and quotations',
                    'Trusted by construction companies and developers',
                    'Cost-effective alternative to replacement',
                    'Eco-friendly solution reducing glass waste'
                  ].map((point, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <div className="text-5xl font-display font-bold text-cyan-400 mb-2">25-50%</div>
                  <p className="text-slate-300 text-lg">Cost savings vs. replacement</p>
                </div>
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <div className="text-5xl font-display font-bold text-cyan-400 mb-2">100%</div>
                  <p className="text-slate-300 text-lg">Original glass preserved</p>
                </div>
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <div className="text-5xl font-display font-bold text-cyan-400 mb-2">Fast</div>
                  <p className="text-slate-300 text-lg">Turnaround time</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 md:p-16 border border-white/10 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              Ready to Restore Your Glass?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Contact us today for a free consultation and no-obligation quotation. Our team is ready to assess your glass restoration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-900/30"
              >
                Get Free Quote
              </motion.a>
              <motion.a
                href="tel:+639123456789"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-4 glass text-white rounded-full font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-cyan-400/50"
              >
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
