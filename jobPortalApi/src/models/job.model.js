const mongoose = require("mongoose");

const Job = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: String,
  description: String,
  salary: Number || String,
  location: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobType: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship"],
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  skills: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Job", Job);
