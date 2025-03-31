const express = require("express");
const JobController = require("../controllers/job.controller");
const middleware = require("../middleware/allMiddleware");
const multer = require("multer");

const jobRouter = express.Router();
const upload = multer();
// post a job by employer

jobRouter.post(
  "/post",
  middleware.verifyToken,
  middleware.verifyRole(["employer"]),
  upload.none(),
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

//get jobs by id
jobRouter.get(
  "/job/:id",
  middleware.verifyToken,
  middleware.validateObjectId,
  JobController.getJobById
);

//update job by id by employer
jobRouter.put(
  "/update/:id",
  middleware.verifyToken,
  middleware.verifyRole(["employer"]),
  middleware.validateObjectId,
  upload.none(),
  JobController.updateJobById
);
//delete job by id by employer
jobRouter.delete(
  "/delete/:id",
  middleware.verifyToken,
  middleware.verifyRole(["employer"]),
  middleware.validateObjectId,
  JobController.deleteJobById
);

module.exports = jobRouter;
