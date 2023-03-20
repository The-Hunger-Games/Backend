const DonatorController = require("../controllers/donator.controller");
const { Router } = require("express");

const donatorRouter = Router();

donatorRouter.post("/register", DonatorController.registerDonator);
donatorRouter.post("/login", DonatorController.loginDonator);
donatorRouter.put("/update", DonatorController.updateDonator);
donatorRouter.delete("/delete", DonatorController.deleteDonator);

module.exports = donatorRouter;
