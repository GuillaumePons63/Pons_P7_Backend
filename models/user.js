const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const comment = require("./comment");
const post = require("./post");

const user = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: "0",
  },
});

comment.belongsTo(user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

post.belongsTo(user);

user
  .sync()
  .then(() => console.log("Utilisateurs créées"))
  .catch((error) => console.log(error));

module.exports = user;
