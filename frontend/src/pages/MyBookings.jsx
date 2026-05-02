import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Ticket, Calendar, Clock, Loader2 } from 'lucide-react';
import { fetchMyBookings } from '../store/slices/bookingSlice';

const MyBookings = () => {
  const dispatch = useDispatch();
  const { history, loading } = useSelector((state) => state.booking);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyBookings());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-full min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Bookings</h1>

      {loading && history.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-lg border border-gray-100 dark:border-gray-700">
          <Ticket className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Bookings Yet!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Looks like you haven't booked any movie tickets yet.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row"
            >
              <div className="md:w-48 shrink-0">
                <img 
                  src={booking.movie.poster} 
                  alt={booking.movie.title} 
                  className="w-full h-full object-cover aspect-[16/9] md:aspect-[2/3]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{booking.movie.title}</h2>
                     <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">Booking ID: {booking._id}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                    Confirmed
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm flex items-center text-gray-500 dark:text-gray-400"><Calendar className="w-4 h-4 mr-1" />Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm flex items-center text-gray-500 dark:text-gray-400"><Clock className="w-4 h-4 mr-1" />Time</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.showTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Seats ({booking.seats.length})</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{booking.seats.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
                    <p className="font-semibold text-primary">₹{booking.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

