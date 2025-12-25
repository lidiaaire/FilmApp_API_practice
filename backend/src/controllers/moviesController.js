const Movie = require("../models/movieModel");

// POST / movies - Crear una nueva película

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET / movies - Obtener todas las películas

const getAllMovies = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "10", 10), 1);
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      Movie.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      Movie.countDocuments(),
    ]);

    return res.status(200).json({
      status: "success",
      page,
      limit,
      total,
      results: movies.length,
      data: movies,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    return res.status(500).json({
      status: "error",
      message: "Error al obtener las películas",
      error: error.message,
    });
  }
};

// GET / movies / :id - Obtener una película por ID

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Película no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return res.status(400).json({
      status: "error",
      message: "ID no correcto o error al obtener la pelicula",
      error: error.message,
    });
  }
};

// GET / recent movies - Obtener las ultimas 10 por createdAt

const getRecentMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);

    return res.status(200).json({
      status: "success",
      results: movies.length,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener las películas recientes",
      error: error.message,
    });
  }
};

// GET / most popular - Obtener las 10 mas populares por rating

const getMostPopularMovies = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      {
        $addFields: {
          ratingNum: {
            $convert: { input: "$rating", to: "double", onError: 0, onNull: 0 },
          },
        },
      },
      { $sort: { ratingNum: -1 } },
      { $limit: 10 },
      { $project: { ratingNum: 0 } },
    ]);

    return res.status(200).json({
      status: "success",
      results: movies.length,
      data: movies,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener las películas más populares",
      error: error.message,
    });
  }
};

// DELETE /movies/:id - Eliminar una película (solo admin)
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Película no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Película eliminada correctamente",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error al eliminar la película",
      error: error.message,
    });
  }
};

// PATCH /movies/:id - Actualizar una película (solo admin)
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Película no encontrada",
      });
    }

    return res.status(200).json({
      status: "success",
      data: movie,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Error al actualizar la película",
      error: error.message,
    });
  }
};
module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  getRecentMovies,
  getMostPopularMovies,
  deleteMovie,
  updateMovie,
};
