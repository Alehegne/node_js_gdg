const BaseRepository = require("./BaseRepositoryService");
const Company = require("../../models/company.model");

class CompanyServices extends BaseRepository {
  constructor() {
    super(Company);
  }

  async check() {
    return "functional";
  }
}

module.exports = new CompanyServices();
