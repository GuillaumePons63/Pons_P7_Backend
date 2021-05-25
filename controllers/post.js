const { Sequelize } = require("sequelize");
const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.body);
  Post.create({
    post: postObject.post,
    UserId: userIdFromToken,
    title: postObject.title,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.files[0].filename
    }`,
  })
    .then(() => res.status(201).json({ message: "post crée" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })

    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  Post.findByPk(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.status(201).json({ message: "post supprimé" }))
    .catch((error) => res.status(500).json({ error }));
};
