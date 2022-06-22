// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification pour les users
const userAuth = require("../middleware/userAuth");

// On importe le middleware d'authentification pour les tokens
const tokenAuth = require("../middleware/tokenAuth");

// On importe le controller pour les likes
const postCtrl = require("../controllers/likeControllers");

router.get("/:id", userAuth,postCtrl.getLike);
router.post("/", userAuth, postCtrl.like);
router.delete("/:id", userAuth, postCtrl.deleteLike);

// On exporte le routeur
module.exports = router;