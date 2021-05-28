const User = require("../models/user");

module.exports = (req, res, next) => {
  User.findOne({
    where: { id: userIdFromToken },
  })
    .then((user) => {
      if (user.isAdmin) {
        next();
      } else {
        res.status(401).json({ error });
      }
    })
    .catch((error) => res.status(401).json({ error }));
};
