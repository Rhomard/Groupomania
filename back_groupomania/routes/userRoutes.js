// On importe express
const express = require("express");

// On créé un routeur avec express
const router = express.Router();

// On importe le middleware multer
const multerUser = require('../middleware/multer-config-user');

// On importe le middleware d'authentification pour les users
const userAuth = require("../middleware/userAuth");

// On importe le middleware d'authentification pour les tokens
const tokenAuth = require("../middleware/tokenAuth");

// On importe le controller pour les users
const userCtrl = require("../controllers/userController");

router.get("/users", userAuth, userCtrl.users)
router.put("/:id", userAuth, multerUser, userCtrl.modifyUser)
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// On exporte le routeur
module.exports = router;
