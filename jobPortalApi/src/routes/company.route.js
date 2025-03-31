const express = require("express");
const middleware = require("../middleware/allMiddleware");
const CompanyController = require("../controllers/company.controller");
const multer = require("multer");

const companiesRouter = express.Router();
const upload = multer();
console.log("Companies router loaded");
// Create a new company
companiesRouter.post(
  "/new",
  middleware.verifyToken,
  middleware.verifyRole(["admin", "employer"]),
  upload.none(),
  CompanyController.newCompany
);

module.exports = companiesRouter;
