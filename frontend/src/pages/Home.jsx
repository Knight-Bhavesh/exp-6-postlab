import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, fetchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/movies/MovieCard';

const Home = () => {
  const dispatch = useDispatch();
  const { movies, searchTerm, filters, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  // Extract unique genres and languages for filter options
  const genres = useMemo(() => {
    const allGenres = new Set(['All']);
    movies.forEach(m => m.genre.forEach(g => allGenres.add(g)));
    return Array.from(allGenres);
  }, [movies]);

  const languages = useMemo(() => {
    const allLangs = new Set(['All']);
    movies.forEach(m => allLangs.add(m.language));
    return Array.from(allLangs);
  }, [movies]);

  // Optimized filtering using useMemo
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = filters.genre === 'All' || movie.genre.includes(filters.genre);
      const matchLanguage = filters.language === 'All' || movie.language === filters.language;
      return matchSearch && matchGenre && matchLanguage;
    });
  }, [movies, searchTerm, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Now Showing</h1>
        
        <div className="flex space-x-4 w-full md:w-auto">
          <select 
            value={filters.genre}
            onChange={(e) => dispatch(setFilter({ type: 'genre', value: e.target.value }))}
            className="flex-1 md:flex-none p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
          >
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          
          <select 
            value={filters.language}
            onChange={(e) => dispatch(setFilter({ type: 'language', value: e.target.value }))}
            className="flex-1 md:flex-none p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none cursor-pointer"
          >
            {languages.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 animate-pulse">Fetching latest movies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl max-w-md mx-auto border border-red-100 dark:border-red-800">
            <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
            <p className="mb-6">{error}</p>
            <button 
              onClick={() => dispatch(fetchMovies())}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <div className="mb-6 opacity-20">
             <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
             </svg>
          </div>
          <p className="text-2xl font-bold text-gray-400">No movies found matching your criteria.</p>
          <p className="mt-2">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

