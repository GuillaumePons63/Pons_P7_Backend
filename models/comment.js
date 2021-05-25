const Post = require("./post");
const User = require("./user");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
  comment: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  PostId: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

Comment.belongsTo(User);

User.hasMany(Comment);

Post.hasMany(Comment);

Comment.belongsTo(Post);

Comment.sync()
  .then(() => console.log("Comment créées"))
  .catch((error) => console.log(error));

module.exports = Comment;
