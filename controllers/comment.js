const { Sequelize } = require("sequelize");
const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
  Comment.create({
    comment: req.body.comment,
    UserId: req.body.userIdFromToken,
    PostId: req.params.id,
  })
    .then(() => res.status(201).json({ message: "commentaire crée" }))
    .catch((error) => res.status(400).json({ error }));
};
