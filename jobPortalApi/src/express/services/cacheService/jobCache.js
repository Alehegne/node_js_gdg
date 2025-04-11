const { cacheService } = require("./cacheService");
const JobServices = require("../../services/databaseServices/job.services");
const Job = require("../../models/job.model");

class JobCache {
  constructor() {
    this.cache_key = "jobCache";
  }

  async getAllJobs(queries, page) {
    return await cacheService.getOrSet(
      this.cache_key,
      async function () {
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

        console.log("jobs now>>.", jobs);
        console.log("analytics", analytics);
        return {
          jobs,
          analytics,
        };
      },
      3600 // 1 hour
    );
  }

  async getJobById(id) {
    const key = `job_${id}`;
    return await cacheService.getOrSet(
      key,
      function () {
        const job = JobServices.findById(id);
        return job;
      },
      2 * 60 // 2 minutes
    );
  }
  invalidateAllJobs() {
    cacheService.del(this.cache_key);
  }
  invalidateJobById(id) {
    const key = `job_${id}`;
    cacheService.del(key);
  }
  async recommendJobs(args, recommend_Key) {
    return await cacheService.getOrSet(
      recommend_Key,
      async function () {
        const recommendedJobs = await Job.aggregate([
          {
            $addFields: {
              totalSkills: {
                $size: "$skills",
              },
              skillMatches: {
                $size: {
                  $setIntersection: ["$skills", args.skills], // "requiredSkills" from Job model
                },
              },
              skillMatchScore: {
                $cond: {
                  if: {
                    $gt: [
                      { $size: { $setIntersection: ["$skills", args.skills] } },
                      0,
                    ],
                  },
                  then: {
                    $divide: [
                      { $size: { $setIntersection: ["$skills", args.skills] } },
                      { $size: "$skills" },
                    ],
                  },
                  else: 0,

                  // [
                  //   {
                  //     $gt: [
                  //       { $size: { $setIntersection: ["$skills", args.skills] } },
                  //       0,
                  //     ],
                  //   },
                  //   {
                  //     $divide: [
                  //       { $size: { $setIntersection: ["$skills", args.skills] } },
                  //       { $size: "$skills" },
                  //     ],
                  //   },
                  //   0,

                  // ],
                },
              },
              experianceMatches: {
                $cond: [
                  { $eq: ["$experianceLevel", args.experianceLevel] },
                  1,
                  0,
                ],
              },
              locationMatches: {
                $cond: [
                  {
                    $or: [
                      { $eq: ["$location", args.location] },
                      { $eq: ["$location", args.preferredLocation] },
                    ],
                  },
                  1,
                  0,
                ],
              },
              jobTypeMatches: {
                $cond: {
                  if: { $eq: ["$jobType", args.prefferedJobType] },
                  then: 1,
                  else: 0,
                },
              },
            },
          },
          {
            $addFields: {
              totalScore: {
                $add: [
                  {
                    $multiply: ["$skillMatchScore", 0.5],
                  },
                  {
                    $multiply: ["$experianceMatches", 0.2],
                  },
                  {
                    $multiply: ["$locationMatches", 0.2],
                  },
                  {
                    $multiply: ["$jobTypeMatches", 0.1],
                  },
                ],
              },
            },
          },
          {
            $match: {
              totalScore: { $gt: 0 },
            },
          },
          { $sort: { totalScore: -1 } },
          { $skip: args.skip },
          { $limit: args.limit },
        ]);
        console.log("still fine till here", recommendedJobs);
        //analysis
        const totalJobs = recommendedJobs.length;
        const totalPages = Math.ceil(totalJobs / args.limit);
        const hasNextPage = args.page < totalPages;
        const hasPreviousPage = args.page > 1;
        const analysis = {
          totalJobs,
          totalPages,
          currentPage: args.page,
          hasNextPage,
          hasPreviousPage,
        };

        return {
          recommendedJobs,
          analysis,
        };
      },
      2 * 60 //2minutes
    );
  }
}

module.exports = new JobCache();
