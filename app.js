// Déclaration des constantes
const express = require("express");
const mysql = require("mysql2/promise");
const helmet = require("helmet");
const app = express();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");
const path = require("path");
const morgan = require("morgan");
const fs = require("fs");

// Permet la création des logs
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

// Connection à la base mySql
mysql
  .createConnection({
    user: process.env.userDb,
    password: process.env.passwordDb,
  })
  .then((connection) => {
    connection
      .query("CREATE DATABASE IF NOT EXISTS groupomania;")
      .then(() => {
        const User = require("./models/user");
        const Post = require("./models/post");
        const Comment = require("./models/comment");
        try {
          User.sync();
          Post.sync();
          Comment.sync();
        } catch {
          throw error;
        }
      })
      .catch((error) => console.log({ message: "erreur base de données" }));
  });

//API de sécurisation
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,*"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

//déclaration des routes de l'API
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post", commentRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
