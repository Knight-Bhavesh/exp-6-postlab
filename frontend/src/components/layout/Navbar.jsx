import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Film, Search, Moon, Sun, User } from 'lucide-react';
import { setSearchTerm } from '../../store/slices/moviesSlice';
import { toggleTheme } from '../../store/slices/themeSlice';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [localSearch, setLocalSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <Film size={32} strokeWidth={2.5} />
            <span className="font-bold text-xl hidden sm:block text-gray-900 dark:text-white">TicketFlix</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl px-4 sm:px-12">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search movies..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-full leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300 shadow-sm"
              />
            </div>
          </form>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="relative group flex items-center space-x-2 pl-2">
                 <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer hover:bg-red-700 transition-colors">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                 </div>
                 <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                   <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                     <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Hello, {user?.name || 'User'}!</p>
                   </div>
                   <Link 
                     to="/my-bookings" 
                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors font-medium"
                   >
                     My Bookings
                   </Link>
                   <button 
                     onClick={() => dispatch(logout())}
                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-500 transition-colors font-medium"
                   >
                     Sign Out
                   </button>
                 </div>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none rounded-full transition-colors hidden sm:flex cursor-pointer"
              >
                <User size={18} />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
