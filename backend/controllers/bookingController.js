const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { movie, seats, showTime, totalPrice } = req.body;
    const booking = await Booking.create({
      user: req.user._id,
      movie,
      seats,
      showTime,
      totalPrice
    });
    
    const populatedBooking = await Booking.findById(booking._id).populate('movie');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('movie');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookedSeats = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { showTime } = req.query;
    
    const bookings = await Booking.find({ movie: movieId, showTime });
    const bookedSeats = bookings.reduce((acc, booking) => [...acc, ...booking.seats], []);
    
    res.json(bookedSeats);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookedSeats
};

module.exports = { createBooking, getMyBookings, getBookedSeats };

