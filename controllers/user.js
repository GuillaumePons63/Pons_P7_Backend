const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HmacSHA256 = require("crypto-js/hmac-sha256");
const Post = require("../models/post");
const fs = require("fs");

exports.createUser = (req, res, next) => {
  let mail = HmacSHA256(req.body.email, process.env.hmacKey).toString();
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: mail,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        job: req.body.job,
        isAdmin: req.body.isAdmin,
      })
        .then(() => res.status(201).json({ message: "utilisateur crée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.connectUser = (req, res, next) => {
  let mail = HmacSHA256(req.body.email, process.env.hmacKey).toString();
  User.findOne({
    where: {
      email: mail,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign({ id: user.id }, process.env.tokenKey, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUser = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  Post.findAll({
    where: { userId: req.params.id },
  })
    .then((post) => {
      for (let i = 0; i < post.length; i++) {
        let filename = post[i].imageUrl.split("/images/")[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, () => {
          console.log("supprimé");
        });
      }
      User.destroy({
        where: { id: req.params.id },
      })
        .then(() => res.status(201).json({ message: "utilisateur supprimé" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
