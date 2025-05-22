"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

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
            className="relative min-w-[140px] sm:min-w-[180px] md:min-w-[220px] cursor-pointer snap-start"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedMovie(movie)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name || "Movie poster"}
              width={220}
              height={330}
              className="rounded-md object-cover"
              loading="lazy"
              unoptimized={false} // optional: you can set to true if you want to skip Next.js optimization
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Dialog for movie details */}
      <Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent className="bg-white text-black max-w-xl p-6 rounded-lg shadow-lg space-y-4 max-h-[80vh] overflow-y-auto">
          {selectedMovie && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMovie.title || selectedMovie.name}</DialogTitle>
                <DialogDescription>{selectedMovie.overview || "No description available."}</DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Close
                </button>
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MovieRow;
