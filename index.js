const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 8700;
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "sample",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({ status: 200, message: 'Success' });
});

app.listen(PORT, () => {
  console.log("Server is now running on port " + PORT);
});
