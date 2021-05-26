// utilisation du modèle sequelize présent dans models/post.js
const Comment = require("../models/comment");

module.exports = (req, res, next) => {
  Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      // userIdFromToken est créé dans le middleware auth
      if (userIdFromToken === comment.userId) {
        next();
      } else {
        res.status(401).json({ error });
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
