'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      {/* Banner Content */}
      <div className="h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 space-y-4 md:space-y-5 max-w-2xl">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          The Batman
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          In his second year of fighting crime, Batman uncovers corruption in Gotham that connects to his own family while facing the serial killer Riddler.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm sm:text-base">
            ▶ Play
          </button>
          <button className="bg-gray-700/70 text-white px-6 py-2 rounded font-semibold hover:bg-gray-600 transition text-sm sm:text-base">
            ℹ More Info
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
