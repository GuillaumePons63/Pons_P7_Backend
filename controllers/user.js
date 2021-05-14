const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HmacSHA256 = require("crypto-js/hmac-sha256");

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
            id: user.id,
            token: jwt.sign({ id: user.id }, process.env.tokenKey, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
