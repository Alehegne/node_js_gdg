const express = require("express");
const dotenv = require("dotenv");
const MongoConnect = require("./src/services/connectToDb");
const { userRouter } = require("./src/routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Config = require("./src/config/allConfig");
const middleware = require("./src/middleware/allMiddleware");
const { authRouter } = require("./src/routes/auth.route");
const jobRouter = require("./src/routes/job.route");
const applicationRouter = require("./src/routes/application.route");
const companiesRouter = require("./src/routes/company.route");
dotenv.config();
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//debug middleware
app.use(middleware.debug);
//cors
app.use(cors(Config.getCorsConfig()));

//connect to db
MongoConnect.connectToDb();

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/companies", companiesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API");
});

//error handler middleware// global error handler
app.use(middleware.errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
