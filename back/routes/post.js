// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le controller pour les sauces
const postCtrl = require("../controllers/post");

router.get("/", postCtrl.getAllPost);
router.post("/", postCtrl.createPost);

// On exporte le routeur
module.exports = router;
