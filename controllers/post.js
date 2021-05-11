const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  Post.create({
    post: req.body.post,
    UserId: req.body.userIdFromToken,
  })
    .then(() => res.status(201).json({ message: "post crée" }))
    .catch((error) => res.status(400).json({ error }));
};
