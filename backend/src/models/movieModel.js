const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es obligatorio"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true,
    },
    category: {
      type: [String],
      required: [true, "La categoría es obligatoria"],
      enum: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Adventure",
        "Animation",
        "Fantasy",
        "Crime",
        "Documentary",
        "Family",
        "Mystery",
      ],
      default: [],
    },
    director: {
      type: String,
      required: [true, "El director es obligatorio"],
      trim: true,
    },
    rating: {
      type: String,
      required: [true, "La valoracion es obligatoria"],
      trim: true,
    },
    posterUrl: {
      type: String,
      required: [true, "La portada (posterUrl) es obligatoria"],
      trim: true,
    },
    trailerUrl: {
      type: String,
      required: [true, "El trailer (trailerUrl) es obligatorio"],
      trim: true,
    },

    year: {
      type: String,
      required: [true, "El año es obligatorio"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
