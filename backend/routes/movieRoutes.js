const express = require('express');
const { getMovies, getMovieById, seedMovies } = require('../controllers/movieController');
const router = express.Router();

router.get('/', getMovies);
router.get('/seed', seedMovies);
router.get('/:id', getMovieById);

module.exports = router;
