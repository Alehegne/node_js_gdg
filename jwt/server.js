const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth.routes"));

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
