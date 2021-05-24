const user = require("./user");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const post = sequelize.define("Post", {
  title: {
    type: DataTypes.TEXT("tiny"),
    allowNull: false,
  },
  post: {
    type: DataTypes.TEXT(),
  },
  imageUrl: {
    type: DataTypes.TEXT("tiny"),
  },
});

user.hasMany(post, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

post
  .sync()
  .then(() => console.log("Post créées"))
  .catch((error) => console.log(error));

module.exports = post;
