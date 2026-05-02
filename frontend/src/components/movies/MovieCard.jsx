import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="group block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-bold">{movie.rating}</span>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{movie.title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genre.map((g) => (
                <span key={g} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded-md">
                  {g}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{movie.language}</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
