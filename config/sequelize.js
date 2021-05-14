const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.nameDb,
  process.env.userDb,
  process.env.passwordDb,
  {
    dialect: "mysql",
    host: "localhost",
  }
);
