import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSeat } from '../store/slices/bookingSlice';
import api from '../api/axios';
import { Loader2 } from 'lucide-react';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = 8;

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { movies, loading } = useSelector((state) => state.movies);
  const movie = movies.find(m => m._id === id);
  const { selectedSeats, showTime, totalPrice } = useSelector((state) => state.booking);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [fetchingSeats, setFetchingSeats] = useState(false);

  useEffect(() => {
    const fetchSeats = async () => {
      if (id && showTime) {
        setFetchingSeats(true);
        try {
          const response = await api.get(`/bookings/booked/${id}?showTime=${showTime}`);
          setBookedSeats(response.data);
        } catch (error) {
          console.error('Failed to fetch booked seats', error);
        } finally {
          setFetchingSeats(false);
        }
      }
    };
    fetchSeats();
  }, [id, showTime]);

  useEffect(() => {
    if (!loading && (!movie || !showTime)) {
      navigate(movie ? `/movie/${movie._id}` : '/');
    }
  }, [movie, showTime, navigate, loading]);

  if (loading || fetchingSeats) {

    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!movie || !showTime) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-full min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Seat Booking</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 font-medium">
        {movie.title} • {showTime}
      </p>

      {/* Screen area */}
      <div className="relative mb-16">
        <div className="h-2 w-4/5 mx-auto bg-gray-300 dark:bg-gray-600 rounded-t-[50%] blur-[1px]"></div>
        <div className="h-10 w-4/5 mx-auto bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 opacity-50"></div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 tracking-widest uppercase">Screen</p>
      </div>

      {/* Seating Grid */}
      <div className="flex flex-col items-center space-y-4 mb-16 overflow-x-auto pb-4">
        {ROWS.map((row) => (
          <div key={row} className="flex items-center space-x-2 sm:space-x-4">
            <span className="w-6 text-center font-bold text-gray-500 dark:text-gray-400">{row}</span>
            <div className="flex space-x-2 sm:space-x-4">
              {Array.from({ length: COLS }, (_, i) => {
                const seatId = `${row}${i + 1}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    disabled={isBooked}
                    onClick={() => dispatch(toggleSeat(seatId))}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-sm border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer ${
                      isBooked
                        ? 'bg-gray-300 border-gray-300 text-transparent cursor-not-allowed dark:bg-gray-700 dark:border-gray-700 shadow-inner'
                        : isSelected
                        ? 'bg-primary border-primary text-white shadow-md transform scale-110'
                        : 'bg-white border-primary text-primary hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-gray-700'
                    }`}
                  >
                    {!isBooked && (i + 1)}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-center font-bold text-gray-500 dark:text-gray-400">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend & Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl sticky bottom-4 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center"><div className="w-5 h-5 bg-white border-2 border-primary rounded-t shrink-0"></div><span className="ml-2 dark:text-gray-300 font-medium">Available</span></div>
            <div className="flex items-center"><div className="w-5 h-5 bg-primary border-2 border-primary rounded-t shrink-0 shadow-sm"></div><span className="ml-2 dark:text-gray-300 font-medium">Selected</span></div>
            <div className="flex items-center"><div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 border-2 border-transparent rounded-t shrink-0"></div><span className="ml-2 dark:text-gray-300 font-medium">Booked</span></div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalPrice}</p>
            </div>
            <button
              disabled={selectedSeats.length === 0}
              onClick={() => navigate('/checkout')}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedSeats.length > 0 
                  ? 'bg-primary text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'
              }`}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

