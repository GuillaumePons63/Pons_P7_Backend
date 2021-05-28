const User = require("./user");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");
const Post = require("./post");

const Comment = sequelize.define("comment", {
  comment: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});

Comment.belongsTo(User);

User.hasMany(Comment, { onDelete: "cascade" });

Post.hasMany(Comment, { onDelete: "cascade" });

Comment.belongsTo(Post);

// Comment.sync()
//   .then(() => console.log("Comment créées"))
//   .catch((error) => console.log(error));

module.exports = Comment;
