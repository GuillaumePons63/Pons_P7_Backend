const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

router.post("/newPost", auth, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPost);

module.exports = router;
