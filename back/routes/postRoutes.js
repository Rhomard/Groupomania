// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le controller pour les sauces
const postCtrl = require("../controllers/postController");

router.get("/", postCtrl.getAllPost);
router.get("/:id", postCtrl.getOnePost);
router.post("/", postCtrl.createPost);
router.put("/:id", postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);

// On exporte le routeur
module.exports = router;
