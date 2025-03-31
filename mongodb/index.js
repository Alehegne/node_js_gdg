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
//get all users
app.get("/user", async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//get user by id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //check if the id is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    //find the user by id
    const user = await User.findById(id);
    //check if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //return the user
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//delete user by id
app.delete("/user", async (req, res) => {
  const id = req.query.id;
  try {
    //check if the id is a valid mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    //find the user by id and delete it
    const deletedUser = await User.findByIdAndDelete(id);
    //check if the user is not found
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//update user by id
app.patch("/user/:id", upload.none(), async (req, res) => {
  console.log("updating...");
  const { id } = req.params;
  const { name, email } = req.body;
  //check if the id is a valid mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  //update

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  ); //{new:true} will return the updated user
  //check if the user is not found
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  //return updated user
  return res.status(200).json(updatedUser);
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
