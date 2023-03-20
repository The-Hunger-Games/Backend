require("dotenv").config();
const bcrypt = require("bcrypt");
const { createToken } = require("../functions/crypto.js");
const VolunteerServices = require("../services/volunteer.service.js");
const { messageCustom } = require("../functions/message.js");
const { handleError } = require("../functions/handleError.js");
const { OK, CREATED, BAD_REQUEST } = require("../functions/messageType");
const id = require("../functions/id.js");

// volunteer create controller with random id as userid and password

const createVolunteer = async (req, res) => {
  try {
    const userid = id(6);
    const password = id(8);
    var newVolunteer = {};
    if (req.donator) {
      newVolunteer = await VolunteerServices.createVolunteer({
        userid,
        password: await bcrypt.hash(password, 10),
        for: "Donator",
        institudeID: req.donator._id,
      });
    } else {
      newVolunteer = await VolunteerServices.createVolunteer({
        userid,
        password: await bcrypt.hash(password, 10),
        for: "NGO",
        institudeID: req.ngo._id,
      });
    }
    const token = createToken({
      id: newVolunteer._id,
      userid: newVolunteer.userid,
      for: newVolunteer.for,
      institudeID: newVolunteer.institudeID,
    });

    const createdData = {
      token,
      data: {
        userid: newVolunteer.userid,
        password: password,
        for: newVolunteer.for,
      },
    };
    messageCustom(res, CREATED, "Volunteer created successfully", createdData);
  } catch (err) {
    handleError(req, res, err);
  }
};
// volunteer login controller

const loginVolunteer = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const volunteer = await VolunteerServices.findVolunteer({ userid });
    if (!volunteer) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Email or Password doesn't match.",
      };
      throw err;
    }
    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Email or Password doesn't match.",
      };
      throw err;
    }
    const token = createToken({
      id: volunteer._id,
      userid: volunteer.userid,
      for: volunteer.for,
      institudeID: volunteer.institudeID,
    });
    const data = {
      token,
      data: {
        userid: volunteer.userid,
        for: volunteer.for,
      },
    };
    messageCustom(res, OK, "Volunteer logged in successfully", data);
  } catch (err) {
    handleError(req, res, err);
  }
};

// volunteer delete controller

const deleteVolunteer = async (req, res) => {
  try {
    const { userid } = req.params;
    const volunteer = await VolunteerServices.findVolunteer({ userid });
    if (!volunteer) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Volunteer doesn't exist.",
      };
      throw err;
    }
    await VolunteerServices.deleteVolunteer({ userid });
    messageCustom(res, OK, "Volunteer deleted successfully");
  } catch (err) {
    handleError(req, res, err);
  }
};

// get all volunteers for NGO or Donator

const getAllVolunteers = async (req, res) => {
  try {
    const institudeID = req.ngo ? req.ngo._id : req.donator._id;
    const volunteers = await VolunteerServices.getVolunteers({
      institudeID,
    });
    messageCustom(res, OK, "Volunteers fetched successfully", volunteers);
  } catch (err) {
    handleError(req, res, err);
  }
};

// exports

module.exports = {
  createVolunteer,
  loginVolunteer,
  deleteVolunteer,
  getAllVolunteers,
};
