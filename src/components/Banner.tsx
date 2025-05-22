"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchFromTMDB } from "@/lib/tmdb";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  overview?: string;
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

const BANNER_INDEX_KEY = "tmdb-banner-index";

const Banner = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMovies = async () => {
      const data: Movie[] = await fetchFromTMDB("/trending/movie/week");
      if (data.length > 0) {
        setMovies(data);
        const savedIndex = parseInt(localStorage.getItem(BANNER_INDEX_KEY) || "0");
        setIndex(savedIndex < data.length ? savedIndex : 0);
      }
    };
    loadMovies();
  }, []);

  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setIndex((prev) => {
          const newIndex = (prev + 1) % movies.length;
          localStorage.setItem(BANNER_INDEX_KEY, newIndex.toString());
          return newIndex;
        });
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isPaused, movies]);

  const handlePrev = () => {
    const newIndex = index === 0 ? movies.length - 1 : index - 1;
    setIndex(newIndex);
    localStorage.setItem(BANNER_INDEX_KEY, newIndex.toString());
  };

  const handleNext = () => {
    const newIndex = (index + 1) % movies.length;
    setIndex(newIndex);
    localStorage.setItem(BANNER_INDEX_KEY, newIndex.toString());
  };

  const handlePlay = async () => {
    const movieId = movies[index]?.id;
    const res: Video[] = await fetchFromTMDB(`/movie/${movieId}/videos`);
    const trailer = res.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      setShowTrailer(true);
    }
  };

  if (!movies.length) return null;

  const movie = movies[index];
  const imagePath = movie.backdrop_path || movie.poster_path;
  const imageUrl = `https://image.tmdb.org/t/p/original${imagePath}`;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative h-[70vh] md:h-[80vh] w-full text-white overflow-hidden group"
    >
      <AnimatePresence>
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt={movie.title || movie.name || "Banner image"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />

      <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-6 md:px-10 space-y-4 max-w-2xl">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {movie.title || movie.name}
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg max-w-md line-clamp-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {movie.overview}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
          >
            <Play size={16} /> Play Trailer
          </button>
          <button
            onClick={() => setShowInfo(true)}
            className="flex items-center gap-2 bg-gray-700/70 text-white px-6 py-2 rounded font-semibold hover:bg-gray-600 transition text-sm sm:text-base"
          >
            <Info size={16} /> More Info
          </button>
        </motion.div>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-2 rounded-full"
        aria-label="Previous Banner"
      >
        <ChevronLeft size={24} color="white" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 p-2 rounded-full"
        aria-label="Next Banner"
      >
        <ChevronRight size={24} color="white" />
      </button>

      {/* Trailer Dialog */}
      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="bg-black/90 p-0 rounded-lg max-w-4xl aspect-video overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={trailerUrl}
            title="Movie Trailer"
            allow="autoplay; fullscreen"
            allowFullScreen
            frameBorder="0"
          />
          <DialogClose asChild>
            <button className="absolute top-3 right-3 text-white bg-black/50 rounded-full p-1 hover:bg-black/70">
              ✕
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* More Info Dialog */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-white text-black max-w-lg p-6 rounded-lg space-y-4 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{movie.title || movie.name}</DialogTitle>
            <p>{movie.overview}</p>
          </DialogHeader>
          <DialogClose asChild>
            <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Banner;
