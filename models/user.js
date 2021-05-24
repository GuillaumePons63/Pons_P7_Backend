const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Post = require("./post");

const User = sequelize.define("user", {
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

Post.belongsTo(User);

User.hasMany(Post);

User.sync()
  .then(() => console.log("Utilisateurs créées"))
  .catch((error) => console.log(error));

module.exports = User;
