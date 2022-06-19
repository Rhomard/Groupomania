// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware d'authentification pour les users
const userAuth = require("../middleware/userAuth");

// On importe le middleware d'authentification pour les tokens
const tokenAuth = require("../middleware/tokenAuth");

// On importe le controller pour les sauces
const postCtrl = require("../controllers/postController");

router.get("/", postCtrl.getAllPost);
router.get("/:id", userAuth, postCtrl.getOnePost);
router.post("/", userAuth, postCtrl.createPost);
router.put("/:id", userAuth, tokenAuth, postCtrl.modifyPost);
router.delete("/:id", userAuth, tokenAuth, postCtrl.deletePost);

// On exporte le routeur
module.exports = router;
