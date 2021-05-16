const { Sequelize } = require("sequelize");
const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = (req, res, next) => {
  Post.create({
    post: req.body.post,
    UserId: req.body.userIdFromToken,
    title: req.body.title,
  })
    .then(() => res.status(201).json({ message: "post crée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: User,
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
