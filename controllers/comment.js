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

exports.getComment = (req, res, next) => {
  Comment.findAll({
    where: {
      postid: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
    ],
    //order: ["createdAt", "DESC"],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};
