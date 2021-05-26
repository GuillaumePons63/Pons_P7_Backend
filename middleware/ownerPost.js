// utilisation du modèle sequelize présent dans models/post.js
const Post = require("../models/post");

module.exports = (req, res, next) => {
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      // userIdFromToken est créé dans le middleware auth
      if (userIdFromToken === post.UserId) {
        next();
      } else {
        res.status(401).json({ error });
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
