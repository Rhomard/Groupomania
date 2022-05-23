const express = require("express");

const app = express();

// On importe le routeur pour les sauces
const postRoutes = require("./routes/post");

app.use(express.json());

// On enregistre les routes pour les posts
app.use("/api/post", postRoutes);

module.exports = app;
