/*

  simple crud app
*/

import express from "express";
import multer from "multer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();
const user = [
  {
    id: "1",
    name: "user1",
    age: 23,
    gender: "male",
  },
  {
    id: "2",
    name: "user1",
    age: 23,
    gender: "male",
  },
  {
    id: "3",
    name: "user1",
    age: 23,
    gender: "male",
  },
];

app.get("/user", (req, res) => {
  return res.json(user);
});
app.post("/add", upload.none(), (req, res) => {
  const newUser = req.body;
  user.push(newUser);
  res.status(200).json({ message: "user created", users: user });
});
app.put("/update", upload.none(), (req, res) => {
  console.log("updating...");
  const id = req.body.id;
  user.forEach((each, index) => {
    if (each.id == id) {
      console.log("equel");
      return { ...req.body };
    } else {
      return each;
    }
  });
  return res.json(user);
});

app.listen(5000, () => {
  console.log("server running on port,", 5000);
});
