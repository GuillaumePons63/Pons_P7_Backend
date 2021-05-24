const post = require("./post");
const user = require("./user");
const sequelize = require("../config/sequelize");
const { DataTypes } = require("sequelize");

const comment = sequelize.define("Comment", {
  comment: {
    type: DataTypes.TEXT(),
    allowNull: false,
  },
});

post.hasMany(comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

user.hasMany(comment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

comment
  .sync()
  .then(() => console.log("Comment créées"))
  .catch((error) => console.log(error));

module.exports = comment;
