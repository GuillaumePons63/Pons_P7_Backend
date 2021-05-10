const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HmacSHA256 = require("crypto-js/hmac-sha256");

exports.createUser = (req, res, next) => {
  let mail = HmacSHA256(req.body.email, "1234").toString();
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
