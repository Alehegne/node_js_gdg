const { default: mongoose } = require("mongoose");

const Company = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: String,
  location: String,
  description: String,
  createdBy:[//a company can be created by multiple users,
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  ],
  jobPosted: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Company", Company);
