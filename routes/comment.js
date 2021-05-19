const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comment");

router.post("/:id/newComment", auth, commentCtrl.createComment);
router.get("/:id/comment", auth, commentCtrl.getComment);

module.exports = router;
