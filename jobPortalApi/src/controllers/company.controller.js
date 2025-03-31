const BaseController = require("./Base.Controller");
const CompanyServices = require("../services/databaseServices/company.services");

class CompanyController extends BaseController {
  constructor() {
    super();

    Object.getOwnPropertyNames(CompanyController.prototype).forEach(
      (method) => {
        if (method !== "constructor" && typeof this[method] === "function") {
          this[method] = this[method].bind(this);
        }
      }
    );
  }

  async newCompany(req, res, next) {
    return this.handleRequest(req, res, next, async (req, res) => {
      console.log("create company controller:");
      const newCData = req.body;
      console.log("new c:", newCData);
      const companies = await CompanyServices.check();
      console.log("companies:", companies);
      return this.successResponse(res, {
        message: "Company created successfully",
        data: newCData,
        status: 201,
      });
    });
  }
}

module.exports = new CompanyController();
