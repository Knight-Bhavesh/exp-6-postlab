import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearBooking, confirmBookingAsync } from '../store/slices/bookingSlice';
import { CheckCircle2, ArrowLeft, Ticket, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { selectedSeats, showTime, totalPrice, movieId, loading, error } = useSelector((state) => state.booking);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const movie = useSelector((state) => 
    movieId ? state.movies.movies.find(m => m._id === movieId) : null
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    if (!movie && !isSuccess) {
      navigate('/');
    }
  }, [movie, navigate, isSuccess]);

  const handleConfirm = async () => {
    try {
      const resultAction = await dispatch(confirmBookingAsync({
        movie: movie._id,
        showTime,
        seats: selectedSeats,
        totalPrice: totalPrice + (selectedSeats.length * 30)
      }));
      
      if (confirmBookingAsync.fulfilled.match(resultAction)) {
        setIsSuccess(true);
        toast.success('Booking Successful!');
      } else {
        toast.error(resultAction.payload || 'Booking failed');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    }
  };

  if (!movie && !isSuccess) return null;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 text-center">Booking Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 text-center">
          Your tickets have been sent to your email.
        </p>
        <button
          onClick={() => navigate('/my-bookings')}
          className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
        >
          View My Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 h-full min-h-screen">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300 border border-gray-100 dark:border-gray-700">
        <div className="p-8 sm:p-12 border-b border-gray-200 dark:border-gray-700 border-dashed relative">
           
          {/* Ticket styling cutouts */}
          <div className="absolute left-0 bottom-0 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-tr-full transform translate-y-1/2"></div>
          <div className="absolute right-0 bottom-0 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-tl-full transform translate-y-1/2"></div>
           
          <div className="flex flex-col md:flex-row gap-8">
            <img 
              src={movie.poster} 
              alt={movie.title} 
              className="w-32 md:w-40 rounded-xl shadow-md object-cover aspect-[2/3]"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h1>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{movie.language} • {movie.genre.join(', ')}</p>
                </div>
                <Ticket className="w-8 h-8 text-primary opacity-20" />
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-semibold text-gray-900 dark:text-white">Today</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{showTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Seats ({selectedSeats.length})</p>
                  <p className="font-semibold text-gray-900 dark:text-white break-words">{selectedSeats.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8 sm:p-12 relative">
           {/* Ticket styling cutouts */}
          <div className="absolute left-0 top-0 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-br-full transform -translate-y-1/2"></div>
          <div className="absolute right-0 top-0 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-bl-full transform -translate-y-1/2"></div>
          
          <div className="flex justify-between items-center mb-4 text-gray-600 dark:text-gray-400">
            <span>Ticket Price ({selectedSeats.length} × ₹250)</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center mb-6 text-gray-600 dark:text-gray-400">
            <span>Convenience Fee</span>
            <span>₹{selectedSeats.length * 30}</span>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Total Amount</span>
            <span className="text-3xl font-bold text-primary">₹{totalPrice + (selectedSeats.length * 30)}</span>
          </div>
          
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="w-full mt-8 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:bg-red-700 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm & Pay'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

