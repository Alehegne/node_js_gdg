const express = require("express");
const mongoose = require("mongoose");
const { connectMongo } = require("./lib/connectMongo");
const { User } = require("./model/model");
const multer = require("multer");

const app = express();

app.use(express.json());
const upload = multer();

connectMongo()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", upload.none(), (req, res) => {
  console.log("hitted");
  console.log(req.body);
  const { name, email } = req.body;

  const user = new User({
    name,
    email,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ message: "Error creating user", error });
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
