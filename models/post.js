const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Post = sequelize.define("post", {
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
});

Post.belongsTo(User);

User.hasMany(Post);

// Post.sync()
//   .then(() => console.log("Post créées"))
//   .catch((error) => console.log(error));

module.exports = Post;
