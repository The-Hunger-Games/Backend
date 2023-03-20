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
  );
  return updatedDonator;
};

// donator delete service
const deleteDonator = async (donatorId) => {
  const deletedDonator = await Donator.deleteOne({ _id: donatorId });
  return deletedDonator;
};

module.exports = {
  createDonator,
  findDonator,
  updateDonator,
  deleteDonator,
};
