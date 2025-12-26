const Comment = require("../models/commentModel");
const Movie = require("../models/movieModel");

// POST /movies/:id/comments
const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({
        status: "error",
        message: "El comentario es obligatorio",
      });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Película no encontrada",
      });
    }

    const comment = await Comment.create({
      user: userId,
      movie: id,
      text,
    });

    return res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al crear el comentario",
      error: error.message,
    });
  }
};

// GET /movies/:id/comments
const getCommentsByMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ movie: id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      results: comments.length,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener los comentarios",
      error: error.message,
    });
  }
};

module.exports = {
  createComment,
  getCommentsByMovie,
};
