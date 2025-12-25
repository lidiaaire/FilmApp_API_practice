const express = require("express");
const {
  createMovie,
  getAllMovies,
  getMovieById,
  getRecentMovies,
  getMostPopularMovies,
  deleteMovie,
  updateMovie,
} = require("../controllers/moviesController");

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

const router = express.Router();

// Crear película → solo admin
router.post("/movies", auth, admin, createMovie);

// Listar / ver → usuario logueado
router.get("/movies", auth, getAllMovies);
router.get("/movies/:id", auth, getMovieById);
router.get("/recent_movies", auth, getRecentMovies);
router.get("/most_popular", auth, getMostPopularMovies);

// Eliminar película → solo admin
router.delete("/movies/:id", auth, admin, deleteMovie);

// Actualizar película → solo admin
router.patch("/movies/:id", auth, admin, updateMovie);

module.exports = router;
