// Middleware qui permet l'enregistrement des images dans le dossier image grâce à multer
const multer = require("multer");
const crypto = require("crypto");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(
      null,
      name + crypto.randomBytes(20).toString("hex") + "." + extension
    );
  },
});

module.exports = multer({ storage: storage }).any("image");
