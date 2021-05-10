const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("Groupomania", "root", "Alphonse42", {
  dialect: "mysql",
  host: "localhost",
});

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

user
  .sync()
  .then(() => console.log("Utilisateurs créées"))
  .catch((error) => console.log(error));

module.exports = user;
