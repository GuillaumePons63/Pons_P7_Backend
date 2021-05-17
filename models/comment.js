const user = require("./user");
const post = require("./post");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});

user.hasMany(comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
post.hasMany(comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

comment
  .sync()
  .then(() => console.log("Comment créées"))
  .catch((error) => console.log(error));

module.exports = comment;
