const express = require("express");
const JobController = require("../controllers/job.controller");
const middleware = require("../middleware/allMiddleware");

const jobRouter = express.Router();

// post a job by employer

jobRouter.post(
  "/post",
  middleware.verifyToken,
  middleware.verifyRole(["employer"]),
  JobController.postJob
);
//fetch jobs, filter by location, job type, and salary range
/*
-allow users to filter jobs by location, job type, salary range, skills, company, and title
-allow users to search jobs by title
-allow users to sort jobs by date posted, salary, and company name
-allow users to paginate jobs by page number and limit
-allow users to view all jobs posted by a specific company
*/
jobRouter.get(
  "/fetch",
  middleware.verifyToken,
  middleware.verifyRole(["employer", "jobseeker", "admin"]),
  middleware.queryFilter([
    "location",
    "jobType",
    "salary",
    "skills",
    "company",
    "title",
  ]),
  JobController.fetchJobs
);

module.exports = jobRouter;
