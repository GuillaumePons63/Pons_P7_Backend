const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
  },
  post: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  altText: {
    type: DataTypes.TEXT("tiny"),
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
