const express = require("express");
const dotenv = require("dotenv");
// const MongoConnect = require("./services/connectToDb");
const { userRouter } = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Config = require("./config/allConfig");
const middleware = require("./middleware/allMiddleware");
const { authRouter } = require("./routes/auth.route");
const jobRouter = require("./routes/job.route");
const applicationRouter = require("./routes/application.route");
const companiesRouter = require("./routes/company.route");
const ReviewRouter = require("./routes/review.route");
const MessageRouter = require("./routes/message.route");
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
// app.use(middleware.debug);
//cors
app.use(cors(Config.getCorsConfig()));

//connect to db
// MongoConnect.connectToDb();

//routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/reviews", ReviewRouter);
app.use("/api/messages", MessageRouter);

//error handler middleware// global error handler
app.use(middleware.errorHandler);

//export app
module.exports = app;
