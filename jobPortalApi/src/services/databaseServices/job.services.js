const Job = require("../../models/job.model");
const BaseRepository = require("./BaseRepositoryService");
const Joi = require("joi");

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
    const jobs = await Job.find(queries)
      .sort(page.sort)
      .skip(page.skip)
      .limit(page.limit)
      .populate("postedBy")
      .populate("applicants")
      .exec();
    const totalJobs = await Job.countDocuments(queries);
    const totalPages = Math.ceil(totalJobs / page.limit);
    const currentPage = page.page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
    const analytics = {
      totalJobs,
      totalPages,
      currentPage,
      hasNextPage,
      hasPreviousPage,
    };

    return {
      jobs,
      analytics,
    };
  }
}

module.exports = new JobServices();

// const Joi = require('joi');

// const schema = Joi.object({
//     username: Joi.string()
//         .alphanum()
//         .min(3)
//         .max(30)
//         .required(),

//     password: Joi.string()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

//     repeat_password: Joi.ref('password'),

//     access_token: [
//         Joi.string(),
//         Joi.number()
//     ],

//     birth_year: Joi.number()
//         .integer()
//         .min(1900)
//         .max(2013),

//     email: Joi.string()
//         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
// })
//     .with('username', 'birth_year')
//     .xor('password', 'access_token')
//     .with('password', 'repeat_password');

// schema.validate({ username: 'abc', birth_year: 1994 });
// // -> { value: { username: 'abc', birth_year: 1994 } }

// schema.validate({});
// // -> { value: {}, error: '"username" is required' }

// // Also -

// try {
//     const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
// }
// catch (err) { }
