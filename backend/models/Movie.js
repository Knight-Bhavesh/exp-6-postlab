const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster: { type: String, required: true },
  rating: { type: Number, default: 0 },
  genre: [{ type: String }],
  language: { type: String, required: true },
  description: { type: String },
  cast: [{ type: String }],
  duration: { type: String },
  showTimes: [{ type: String }],
  trailerUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
