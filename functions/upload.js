const cloudinary = require("cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// configure cloudinary uploader

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});
module.exports = { cloudinary, upload };
