const Post = require("./post");
const User = require("./user");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
  comment: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});

Comment.sync()
  .then(() => console.log("Comment créées"))
  .catch((error) => console.log(error));

module.exports = Comment;
