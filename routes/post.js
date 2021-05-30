// Déclaration des contantes
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../config/multer");
const ownerPost = require("../middleware/ownerPost");
const postCtrl = require("../controllers/post");

//route /api/post
router.post("/newPost", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);
router.delete("/:id", auth, ownerPost, postCtrl.deletePost);
router.put("/:id", auth, ownerPost, postCtrl.modifyPost);

module.exports = router;
