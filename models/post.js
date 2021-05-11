const { Sequelize, DataTypes } = require("sequelize");
const user = require("./user");
const sequelize = new Sequelize("Groupomania", "root", "Alphonse42", {
  dialect: "mysql",
  host: "localhost",
});

const post = sequelize.define("Post", {
  post: {
    type: DataTypes.TEXT,
  },
});

post.belongsTo(user, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });

post
  .sync()
  .then(() => console.log("Post créées"))
  .catch((error) => console.log(error));

module.exports = post;
