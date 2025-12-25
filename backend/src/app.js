console.log("🔥 APP.JS DEFINITIVO CARGADO");

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const moviesRoutes = require("./routes/moviesRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Health
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "FilmApp API running" });
});

// Test
app.get("/test", (req, res) => {
  res.send("TEST ROUTE OK");
});

// Swagger
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));

// API routes
app.use("/movies", moviesRoutes);
app.use("/users", usersRoutes);

module.exports = app;
