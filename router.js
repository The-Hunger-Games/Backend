const express = require("express");
const { message } = require("./functions/message");
const { NOT_FOUND, OK } = require("./functions/messageType");

const parentRouter = express.Router();

//routes

// ------------- GENERAL ROUTES ----------------- //
parentRouter.get("/", (req, res) => {
  message(res, OK, "Welcome to the Official Hunger Games API");
});

// ------------- DONATOR ROUTES ----------------- //
const donatorRouter = require("./routes/donator.routes");
parentRouter.use("/donator", donatorRouter);

// ------------- NGO ROUTES ----------------- //
const ngoRouter = require("./routes/ngo.routes");
parentRouter.use("/ngo", ngoRouter);

// ------------- INVENTORY ROUTES ----------------- //
const inventoryRouter = require("./routes/inventory.routes");
parentRouter.use("/inventory", inventoryRouter);

// ------------- VOLUNTEER ROUTES ----------------- //
const volunteerRouter = require("./routes/volunteer.routes");
parentRouter.use("/volunteer", volunteerRouter);

// ------------- NON-EXISTENT ROUTES ----------------- //
parentRouter.all("*", (req, res) => {
  message(res, NOT_FOUND, "Route does not exist");
});

module.exports = parentRouter;
