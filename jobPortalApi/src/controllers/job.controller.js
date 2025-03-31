const BaseController = require("./Base.Controller");
const jobServices = require("../services/databaseServices/job.services");
const userServices = require("../services/databaseServices/user.services");
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
      //update the user model  to add the job id to the posted jobs array
      const user = await userServices.update(userId, {
        $push: { postedJobs: job._id },
      });
      if (!user) {
        return this.errorMessage(
          "please, register first to post a job",
          400,
          next
        );
      }
      console.log("user", user);
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

  async getJobById(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      const { id } = req.params;
      console.log("id job:", id);
      const job = await jobServices.findById(id);
      if (!job) return this.errorMessage("job not found", 400, next);
      return this.successResponse(res, {
        message: "job fetched successfully",
        status: 200,
        data: job,
      });
    });
  }
  /*
  LOGIC:
  -check if the user is the employer who posted the job
  -if yes, update the job
    */
  async updateJobById(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      const { id } = req.params;
      const newJobData = req.body;
      // console.log(req.user.id)
      const job = await Job.findById(id).where({ postedBy: req.user.id });
      if (!job) {
        return this.errorMessage(
          "job not found or you are not authorized",
          400,
          next
        );
      }
      const updatedJob = await jobServices.update(id, newJobData);
      if (!updatedJob) {
        return this.errorMessage("job not updated", 400, next);
      }
      return this.successResponse(res, {
        message: "job updated successfully",
        status: 200,
        data: updatedJob,
      });
    });
  }

  async deleteJobById(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      const { id } = req.params;
      const job = await Job.findById(id).where({ postedBy: req.user.id });
      if (!job)
        return this.errorMessage(
          "job not found or you are not authorized",
          400,
          next
        );
      const deletedJob = await jobServices.delete(id);
      if (!deletedJob) return this.errorMessage("job not deleted", 400, next);
      //remove the job id from the user model postedJobs array

      const user = await userServices.update(req.user.id, {
        $pull: { postedJobs: id },
      });
      if (!user) return this.errorMessage("user not found", 400, next);
      return this.successResponse(res, {
        message: "job deleted successfully",
        status: 200,
        data: deletedJob,
      });
    });
  }
}

module.exports = new JobController();
