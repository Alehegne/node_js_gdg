const BaseController = require("./Base.Controller");
const jobServices = require("../services/databaseServices/job.services");
const Job = require("../models/job.model");

class JobController extends BaseController {
  constructor() {
    super();

    Object.getOwnPropertyNames(JobController.prototype).forEach((method) => {
      if (this[method] && typeof this[method] === "function") {
        this[method] = this[method].bind(this);
      }
    });
  }

  async postJob(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      const { title, company, description, salary, location, jobType, skills } =
        req.body;
      const result = await jobServices.validateJobData(req.body);
      if (!result.success) {
        return this.errorMessage([result.message, result.error], 400, next);
      }
      const userId = req.user.id;
      const jobData = {
        title,
        company,
        description,
        salary,
        location,
        jobType,
        skills,
        postedBy: userId,
      };
      const job = await jobServices.create(jobData);
      if (!job) {
        return this.errorMessage("job not posted", 400, next);
      }

      return this.successResponse(res, {
        message: "job posted successfully",
        status: 200,
        data: job,
      });
    });
  }
  //fetch jobs, filter by location, job type, salary range, skills,  company, and title, and title

  async fetchJobs(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      console.log("query", req.filter);
      console.log("pagination", req.pagination);
      const { limit, page, skip, sort } = req.pagination;
      const { jobs, analytics } = await jobServices.getJob(
        req.filter,
        req.pagination
      );

      if (jobs.length === 0) return this.successResponse(res, "No Jobs Found");
      if (!jobs) return this.errorMessage("No jobs found", 400, next);

      console.log("analytics", analytics);
      return this.successResponse(res, {
        message: "jobs fetched successfully",
        status: 200,
        data: jobs,
        analytics: {
          totalJobs: analytics.totalJobs,
          totalPages: analytics.totalPages,
          currentPage: analytics.currentPage,
          hasNextPage: analytics.hasNextPage,
          hasPreviousPage: analytics.hasPreviousPage,
        },
      });
    });
  }
}

module.exports = new JobController();
