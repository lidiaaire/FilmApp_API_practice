console.log("✅ app.js CARGADO");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "FilmApp API running" });
});

const moviesRoutes = require("./routes/moviesRoutes");
app.use("/", moviesRoutes);

const usersRoutes = require("./routes/usersRoutes");
app.use("/", usersRoutes);

module.exports = app;
