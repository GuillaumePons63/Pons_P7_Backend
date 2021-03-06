// Déclaration des constantes
const { Sequelize } = require("sequelize");
const Post = require("../models/post");
const User = require("../models/user");
const fs = require("fs");

// Fonctions
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.body);
  Post.create({
    post: postObject.post,
    userId: userIdFromToken,
    title: postObject.title,
    altText: postObject.altText,
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

exports.deletePost = (req, res, next) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Post.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => res.status(201).json({ message: "post supprimé" }))
          .catch((error) => res.status(500).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }))
    .catch((error) => res.status(500).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  Post.update(
    {
      title: req.body.title,
      post: req.body.post,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
