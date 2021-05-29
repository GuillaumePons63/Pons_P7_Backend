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
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altText: {
    type: DataTypes.TEXT("tiny"),
    allowNull: false,
  },
});

// Pour la création des foreign Key
Post.belongsTo(User, { onDelete: "cascade" });

User.hasMany(Post, { onDelete: "cascade" });

module.exports = Post;
