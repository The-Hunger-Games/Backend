const Donator = require("../models/donator.model");

// donator creation service

const createDonator = async (donator) => {
  const newDonator = new Donator(donator);
  await newDonator.save();
  return newDonator;
};

// donator find service

const findDonator = async (params) => {
  const donator = await Donator.findOne(params);
  return donator;
};

// donator update service

const updateDonator = async (donatorId, donator) => {
  const updatedDonator = await Donator.updateMany(
    { _id: donatorId },
    { $set: donator },
    { new: true },
  );
  return updatedDonator;
};

// donator delete service
const deleteDonator = async (params) => {
  const deletedDonator = await Donator.deleteOne(params);
  return deletedDonator;
};

module.exports = {
  createDonator,
  findDonator,
  updateDonator,
  deleteDonator,
};
