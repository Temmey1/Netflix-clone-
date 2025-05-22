'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed text-white top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-6 md:px-10 py-4 flex items-center justify-between"
    >
      <h1 className="text-xl sm:text-2xl font-bold text-netflix">NETFLIX</h1>

      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-4 md:gap-6 text-sm md:text-base">
        <a href="#" className="hover:text-netflix transition">Home</a>
        <a href="#" className="hover:text-netflix transition">TV Shows</a>
        <a href="#" className="hover:text-netflix transition">Movies</a>
        <a href="#" className="hover:text-netflix transition">New & Popular</a>
        <a href="#" className="hover:text-netflix transition">My List</a>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-full left-0 w-full bg-black text-white sm:hidden flex flex-col px-6 py-4 space-y-3 text-sm border-t border-gray-700"
          >
            <a href="#" className="hover:text-netflix transition">Home</a>
            <a href="#" className="hover:text-netflix transition">TV Shows</a>
            <a href="#" className="hover:text-netflix transition">Movies</a>
            <a href="#" className="hover:text-netflix transition">New & Popular</a>
            <a href="#" className="hover:text-netflix transition">My List</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
