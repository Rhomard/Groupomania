const express = require("express");

const app = express();

// On importe le routeur pour les sauces
const postRoutes = require("./routes/postRoutes");

// On importe le routeur pour les users
const userRoutes = require("./routes/userRoutes");

// On importe le routeur pour les likes
const likesRoutes = require("./routes/likeRoutes");

app.use(express.json());

// Middleware qui résout les erreurs de CORS
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      next();
});

// On enregistre les routes pour les posts
app.use("/api/post", postRoutes);

// On enregistre les routes pour les users
app.use("/api/auth", userRoutes);

// On enregistre les routes pour les users
app.use("/api/like", likesRoutes);

module.exports = app;
