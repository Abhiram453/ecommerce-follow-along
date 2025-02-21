let multer = require("multer");
let path = require("path");

console.log(path.join(__dirname, "../upload"), "****");

// General storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png");
  }
});

// Product-specific storage configuration
const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploadproducts"));
    console.log(path.join(__dirname, "../uploadproducts"), "+++++++++++++++++++++++++");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png");
  }
});

const upload = multer({ storage: storage });
const productUpload = multer({ storage: productStorage });

module.exports = { upload, productUpload };