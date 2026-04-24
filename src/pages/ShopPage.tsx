/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingCart, Star, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Premium Windshield Glass',
    category: 'windshield',
    price: 450,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'High-quality laminated windshield with UV protection',
    inStock: true
  },
  {
    id: 2,
    name: 'Engine Air Filter',
    category: 'engine',
    price: 85,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'OEM-grade engine air filter for optimal performance',
    inStock: true
  },
  {
    id: 3,
    name: 'Side Window Glass',
    category: 'windshield',
    price: 280,
    rating: 4.7,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Tempered side window glass with tinting option',
    inStock: true
  },
  {
    id: 4,
    name: 'Performance Spark Plugs',
    category: 'engine',
    price: 120,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'High-performance spark plugs for enhanced ignition',
    inStock: true
  },
  {
    id: 5,
    name: 'Rear Window Glass',
    category: 'windshield',
    price: 320,
    rating: 4.5,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Durable rear window glass with defroster option',
    inStock: true
  },
  {
    id: 6,
    name: 'Oil Filter Premium',
    category: 'engine',
    price: 65,
    rating: 4.7,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Premium oil filter for engine protection',
    inStock: true
  },
  {
    id: 7,
    name: 'Chrome Mirror Covers',
    category: 'accessories',
    price: 95,
    rating: 4.4,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Stylish chrome mirror covers for luxury vehicles',
    inStock: true
  },
  {
    id: 8,
    name: 'Brake Pads Set',
    category: 'brakes',
    price: 180,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'High-performance ceramic brake pads',
    inStock: true
  },
  {
    id: 9,
    name: 'Windshield Wipers Set',
    category: 'accessories',
    price: 75,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Premium windshield wipers for clear visibility',
    inStock: true
  },
  {
    id: 10,
    name: 'Headlight Assembly',
    category: 'lights',
    price: 350,
    rating: 4.7,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Complete LED headlight assembly',
    inStock: true
  },
  {
    id: 11,
    name: 'Tail Light Set',
    category: 'lights',
    price: 220,
    rating: 4.5,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'OEM-quality tail light replacement set',
    inStock: true
  },
  {
    id: 12,
    name: 'Battery 12V',
    category: 'electrical',
    price: 280,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'High-capacity maintenance-free battery',
    inStock: true
  }
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryFromUrl);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const categories = ['windshield', 'engine', 'brakes', 'lights', 'electrical', 'accessories'];
  
  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="relative pt-32 pb-20">
      {/* Header */}
      <section className="px-6 mb-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-2 glass rounded-full text-cyan-400 font-bold uppercase tracking-wider text-sm mb-4">
              Quality Auto Parts
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-white">
              Car <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Parts</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              High-quality automotive parts and accessories for all vehicle types. OEM and aftermarket options available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Sorting */}
      <section className="px-6 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCategoryChange(null)}
                className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all text-sm ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'glass text-slate-300 hover:text-white'
                }`}
              >
                All Parts
              </motion.button>
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2 rounded-full font-bold uppercase tracking-wider transition-all capitalize text-sm ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'glass text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-2 glass rounded-full text-white font-bold uppercase tracking-wider border border-white/10 focus:outline-none focus:border-cyan-400/50 transition-all text-sm"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {product.category}
                  </div>
                  {product.inStock && (
                    <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      In Stock
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-display font-bold mb-2 text-white">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-slate-400 mb-4">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-2xl font-bold text-cyan-400">
                      ₱{product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Need Custom Parts?
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Contact us for custom orders, bulk pricing, and specialized automotive components. We can source parts for any vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-wider transition-all shadow-xl shadow-blue-900/30"
              >
                Request Quote
              </motion.a>
              <motion.a
                href="tel:+639123456789"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-4 glass text-white rounded-full font-bold uppercase tracking-wider transition-all border border-white/10 hover:border-cyan-400/50"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
