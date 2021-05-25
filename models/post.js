const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  post: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

Post.sync()
  .then(() => console.log("Post créées"))
  .catch((error) => console.log(error));

module.exports = Post;
