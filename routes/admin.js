// Déclaration des constantes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const postCtrl = require("../controllers/post");
const userCtrl = require("../controllers/user");

// Route /api/admin
router.get("/allpost", auth, isAdmin, postCtrl.getAllPost);
router.get("/alluser", auth, isAdmin, userCtrl.getAllUser);
router.delete("/user/:id", auth, isAdmin, userCtrl.deleteUser);

module.exports = router;
