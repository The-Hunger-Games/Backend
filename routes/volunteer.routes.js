const VolunteerController = require("../controllers/volunteer.controller");
const { Router } = require("express");

const volunteerRouter = Router();

volunteerRouter.post("/register", VolunteerController.createVolunteer);
volunteerRouter.post("/login", VolunteerController.loginVolunteer);
volunteerRouter.delete("/delete", VolunteerController.deleteVolunteer);
volunteerRouter.get("/get", VolunteerController.getAllVolunteers);

module.exports = volunteerRouter;
