const Volunteer = require("../models/volunteer.model");

// createVolunteer

const createVolunteer = async (data) => {
  const volunteer = new Volunteer(data);
  return await volunteer.save();
};

// findVolunteer (single)

const findVolunteer = async (params) => {
  const volunteer = await Volunteer.findOne(params);
  return volunteer;
};

// deleteVolunteer

const deleteVolunteer = async (params) => {
  const volunteer = await Volunteer.findOneAndDelete(params);
  return volunteer;
};

// getVolunteers
const getVolunteers = async (params) => {
  const volunteers = await Volunteer.find(params);
  return volunteers;
};

// exports

module.exports = {
  createVolunteer,
  findVolunteer,
  deleteVolunteer,
  getVolunteers,
};
