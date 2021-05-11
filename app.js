const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();

const sequelize = new Sequelize("Groupomania", "root", "Alphonse42", {
  dialect: "mysql",
  host: "localhost",
});

try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
  sequelize.query("CREATE DATABASE IF NOT EXISTS `Groupomania` ;");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
