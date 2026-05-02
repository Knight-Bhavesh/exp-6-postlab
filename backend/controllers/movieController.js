const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Seed movies helper
const seedMovies = async (req, res) => {
  const movies = [
    {
      title: 'Inception',
      poster: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
      rating: 8.8,
      genre: ['Sci-Fi', 'Action'],
      language: 'English',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
      cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
      duration: '2h 28m',
      showTimes: ['10:00 AM', '01:30 PM', '05:00 PM', '09:00 PM'],
      trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0'
    },
    {
      title: 'The Dark Knight',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop',
      rating: 9.0,
      genre: ['Action', 'Crime'],
      language: 'English',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      duration: '2h 32m',
      showTimes: ['11:00 AM', '02:30 PM', '06:00 PM', '10:00 PM'],
      trailerUrl: 'https://www.youtube.com/embed/EXeTwQWrcwY'
    },
    {
      title: 'Interstellar',
      poster: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2011&auto=format&fit=crop',
      rating: 8.6,
      genre: ['Sci-Fi', 'Adventure'],
      language: 'English',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      duration: '2h 49m',
      showTimes: ['09:30 AM', '01:00 PM', '04:30 PM', '08:30 PM'],
      trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
    },
    {
      title: 'Dune: Part Two',
      poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1974&auto=format&fit=crop',
      rating: 8.8,
      genre: ['Sci-Fi', 'Action'],
      language: 'English',
      description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
      cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
      duration: '2h 46m',
      showTimes: ['10:30 AM', '02:00 PM', '05:30 PM', '09:30 PM'],
      trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w'
    },
    {
      title: 'Spider-Man: Across the Spider-Verse',
      poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1974&auto=format&fit=crop',
      rating: 8.7,
      genre: ['Animation', 'Action'],
      language: 'English',
      description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
      cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac'],
      duration: '2h 20m',
      showTimes: ['11:30 AM', '03:00 PM', '06:30 PM', '10:30 PM'],
      trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0'
    },
    {
      title: 'Avengers: Endgame',
      poster: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?q=80&w=1974&auto=format&fit=crop',
      rating: 8.4,
      genre: ['Action', 'Sci-Fi'],
      language: 'English',
      description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
      duration: '3h 1m',
      showTimes: ['10:00 AM', '02:00 PM', '06:00 PM', '10:00 PM'],
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
    }
  ];

  try {
    await Movie.deleteMany({});
    const createdMovies = await Movie.insertMany(movies);
    res.json(createdMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMovies, getMovieById, seedMovies };
