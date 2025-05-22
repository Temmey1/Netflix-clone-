'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from 'react-modal';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview?: string;
}

interface Props {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<Props> = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (!movies || movies.length === 0) return null;

  return (
    <section className="mb-8 px-4 sm:px-6 md:px-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">{title}</h2>

      <motion.div
        className="flex overflow-x-auto scrollbar-hide space-x-3 snap-x snap-mandatory"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="relative snap-start shrink-0 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setSelectedMovie(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              loading="lazy"
              className="h-44 sm:h-56 md:h-64 w-auto rounded-md object-cover transition duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 rounded-md flex items-center justify-center text-white text-sm font-semibold">
              Tap for Info
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Info Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <Modal
            isOpen={!!selectedMovie}
            onRequestClose={() => setSelectedMovie(null)}
            contentLabel="Movie Info"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            overlayClassName="fixed inset-0 z-40 bg-black bg-opacity-70"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white text-black max-w-md w-full p-6 rounded-lg shadow-lg space-y-4 relative"
            >
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-2 right-2 text-black hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
              <h3 className="text-xl font-bold">
                {selectedMovie.title || selectedMovie.name}
              </h3>
              <p className="text-sm text-gray-800">{selectedMovie.overview || 'No overview available.'}</p>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MovieRow;
