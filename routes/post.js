const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../config/multer");

const postCtrl = require("../controllers/post");

router.post("/newPost", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);
router.get("/:id", auth, postCtrl.getOnePost);

module.exports = router;
