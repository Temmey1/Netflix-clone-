import Banner from '@/components/Banner';
import MovieRow from '@/components/MovieRow';
import { fetchFromTMDB } from '@/lib/tmdb';

export default async function Home() {
  
  const [trending, topRated, action] = await Promise.all([
    fetchFromTMDB('/trending/all/week'),
    fetchFromTMDB('/movie/top_rated'),
    fetchFromTMDB('/discover/movie', { with_genres: '28' }),
  ]);

  return (
    <main className="pt-20 pb-10 bg-black min-h-screen text-white">
      <Banner />
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Action Movies" movies={action} />
    </main>
  );
}
