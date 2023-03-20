const NGOController = require("../controllers/ngo.controller");
const { Router } = require("express");
const { instituteAuth } = require("../middlewares/institute.authorization");

const ngoRouter = Router();

ngoRouter.post("/register", NGOController.registerNGO);
ngoRouter.post("/login", NGOController.loginNGO);
ngoRouter.put("/update", instituteAuth("ngo"), NGOController.updateNGO);
ngoRouter.delete("/delete", instituteAuth("ngo"), NGOController.deleteNGO);

module.exports = ngoRouter;
