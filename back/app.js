const express = require("express");

const app = express();

// On importe le routeur pour les sauces
const postRoutes = require("./routes/post");

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

module.exports = app;
