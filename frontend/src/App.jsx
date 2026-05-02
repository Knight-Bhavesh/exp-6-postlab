import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initTheme } from './store/slices/themeSlice';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Booking from './pages/Booking';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  return (
    <Router>
      <Toaster/>
      <div className="min-h-screen flex flex-col font-sans transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
