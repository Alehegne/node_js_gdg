const Job = require("../../models/job.model");
const BaseRepository = require("./BaseRepositoryService");
const Joi = require("joi");
const JobCache = require("../cacheService/jobCache");

class JobServices extends BaseRepository {
  constructor() {
    super(Job);
  }

  async validateJobData(data) {
    const jobSchema = Joi.object({
      title: Joi.string().required(),
      company: Joi.string().required(),
      description: Joi.string().required(),
      salary: Joi.alternatives().try(Joi.number(), Joi.string()),
      location: Joi.string().required(),
      jobType: Joi.string()
        .valid("full-time", "part-time", "contract", "internship")
        .required(),
      skills: Joi.array().items(Joi.string()).required(),
      experianceLevel: Joi.string(),
    });

    const { error } = jobSchema.validate(data, { abortEarly: false });
    if (error) {
      return {
        success: false,
        message: `validation failed`,
        error: error.details.map((error) => error.message),
      };
    }
    return {
      success: true,
      message: "validation success",
    };
  }
  async getJob(queries, page) {
    console.log("getting jobs<..");
    let jobs = await JobCache.getAllJobs(queries, page);
    if (typeof jobs === "string") {
      jobs = JSON.parse(jobs);
    }
    return jobs;
  }
  /**
   *RECOMMENDATION ALGORITHM
   * @param {args} args
   * @param {Array} args.skills - array of skills
   * @param {String} args.experianceLevel - experiance level of the user and so on
   * will recommend jobs based on the skills, experiance level, location, and job type
   * this is a weigthed recommendation system
   * 50% for skills, 20% for experiance level, 20% for location, and 10% for job type
   *
   * @returns {Array} recommendedJobs - array of recommended jobs
   */

  async getRecommendedJobs(args, key) {
    console.log("args:", args);
    let recommendedJobs = await JobCache.recommendJobs(args, key);
    if (typeof recommendedJobs === "string") {
      recommendedJobs = JSON.parse(recommendedJobs);
    }
    return recommendedJobs;
  }
}

module.exports = new JobServices();
