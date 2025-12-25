const {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const bycrypt = require("bcrypt");
const User = require("../models/userModel");
const Movie = require("../models/movieModel");

// Controlador para registrar un nuevo usuario
const singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "El email ya existe",
      });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "No se pudo registrar el usuario",
      error: error.message,
    });
  }
};

// Controlador para el login de un usuario

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    const ok = await bycrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales incorrectas",
      });
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al hacer login",
      error: error.message,
    });
  }
};

// Controlador para generar un nuevo token usando el refresh tokens

const genereToken = async (req, res) => {
  try {
    const { refreshToken } = req.headers;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token requerido" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    const newToken = generateToken(user);

    return res.status(200).json({
      status: "success",
      token: newToken,
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Refresh token inválido o expirado",
    });
  }
};

// Controladores para gestionar favoritos

// GET /user/:id/favorite
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");

    return res.status(200).json({
      status: "success",
      results: user.favorites.length,
      data: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener favoritos",
      error: error.message,
    });
  }
};

// Añadir favoritos
// POST /user/:id/favorite
const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        status: "error",
        message: "Película no encontrada",
      });
    }

    const user = await User.findById(userId);

    if (user.favorites.includes(movieId)) {
      return res.status(400).json({
        status: "error",
        message: "La película ya está en favoritos",
      });
    }

    user.favorites.push(movieId);
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Película añadida a favoritos",
      data: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al añadir favorito",
      error: error.message,
    });
  }
};

// Eliminar favoritos
// DELETE /user/:id/favorite
const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { movieId } = req.body;

    const user = await User.findById(userId);

    user.favorites = user.favorites.filter((fav) => fav.toString() !== movieId);

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Película eliminada de favoritos",
      data: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar favorito",
      error: error.message,
    });
  }
};
module.exports = {
  singup,
  login,
  genereToken,
  getFavorites,
  addFavorite,
  removeFavorite,
};
