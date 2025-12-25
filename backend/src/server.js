require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

const start = async () => {
  try {
    if (!MONGO_URI) throw new Error("Falta MONGO_URI en .env");

    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err.message);
    process.exit(1);
  }
};

start();
