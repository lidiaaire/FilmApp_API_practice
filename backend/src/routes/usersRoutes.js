const express = require("express");
const {
  singup,
  login,
  genereToken,
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/userController");

const auth = require("../middlewares/auth");

const router = express.Router();

// Rutas de usuario
router.post("/signup", singup);
router.post("/login", login);
router.get("/genereToken", genereToken);

// FAVORITOS
router.get("/user/:id/favorite", auth, getFavorites);
router.post("/user/:id/favorite", auth, addFavorite);
router.delete("/user/:id/favorite", auth, removeFavorite);

module.exports = router;
