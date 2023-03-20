const NGOController = require("../controllers/ngo.controller");
const { Router } = require("express");

const ngoRouter = Router();

ngoRouter.post("/register", NGOController.registerNGO);
ngoRouter.post("/login", NGOController.loginNGO);
ngoRouter.put("/update", NGOController.updateNGO);
ngoRouter.delete("/delete", NGOController.deleteNGO);

module.exports = ngoRouter;
