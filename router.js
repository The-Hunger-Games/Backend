const express = require("express");
const { message } = require("./functions/message");
const { NOT_FOUND, OK } = require("./functions/messageType");

const parentRouter = express.Router();

//routes

// ------------- GENERAL ROUTES ----------------- //
parentRouter.get("/", (req, res) => {
  message(res, OK, "Welcome to the Official Arcade API");
});

// ------------- NON-EXISTENT ROUTES ----------------- //
parentRouter.all("*", (req, res) => {
  message(res, NOT_FOUND, "Route does not exist");
});

module.exports = parentRouter;
