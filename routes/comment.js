const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const ownerComment = require("../middleware/ownerComment");
const commentCtrl = require("../controllers/comment");

router.post("/:id/newComment", auth, commentCtrl.createComment);
router.get("/:id/comment", auth, commentCtrl.getComment);
router.delete("/comment/:id", auth, ownerComment, commentCtrl.deleteComment);
router.put("/comment/:id", auth, ownerComment, commentCtrl.modifyComment);

module.exports = router;
