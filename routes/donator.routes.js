const DonatorController = require("../controllers/donator.controller");
const { Router } = require("express");
const { instituteAuth } = require("../middlewares/institute.authorization");

const donatorRouter = Router();

donatorRouter.post("/register", DonatorController.registerDonator);
donatorRouter.post("/login", DonatorController.loginDonator);
donatorRouter.put(
  "/update",
  instituteAuth("donator"),
  DonatorController.updateDonator,
);
donatorRouter.delete(
  "/delete",
  instituteAuth("donator"),
  DonatorController.deleteDonator,
);

module.exports = donatorRouter;
