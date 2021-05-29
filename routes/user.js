// Déclaration des constance
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

// Routes /api/auth
router.post("/signup", userCtrl.createUser);
router.post("/login", userCtrl.connectUser);

module.exports = router;
