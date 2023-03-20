const Inventory = require("../models/inventory.model");

// Donator services

// createDonatorInventoryItem
const createDonatorInventoryItem = async (params) => {
  const donatorInventory = new Inventory.Donator(params);
  return await donatorInventory.save();
};

// deleteDonatorInventoryItem
const deleteDonatorInventoryItem = async (params) => {
  return await Inventory.Donator.findOneAndDelete(params);
};

// updateDonatorInventoryItem
const updateDonatorInventoryItem = async (params) => {
  return await Inventory.Donator.findOneAndUpdate(
    { _id: params._id },
    { $set: params },
    { new: true },
  );
};

// getDonatorInventoryItems (multiple)
const getDonatorInventoryItems = async (params) => {
  return await Inventory.Donator.find(params);
};

// findDonatorInventoryItem (single)
const findDonatorInventoryItem = async (params) => {
  return await Inventory.Donator.findOne(params);
};

// NGO services

// createNgoInventoryItem
const createNgoInventoryItem = async (params) => {
  const ngoInventory = new Inventory.NGO(params);
  return await ngoInventory.save();
};

// updateNgoInventoryItem
const updateNgoInventoryItem = async (params) => {
  return await Inventory.NGO.findOneAndUpdate(
    { _id: params._id },
    { $set: params },
    { new: true },
  );
};

// getNgoInventoryItems
const getNgoInventoryItems = async (params) => {
  return await Inventory.NGO.find(params);
};

// deleteNgoInventoryItem
const deleteNgoInventoryItem = async (params) => {
  return await Inventory.NGO.findOneAndDelete(params);
};

// export services
module.exports = {
  createDonatorInventoryItem,
  deleteDonatorInventoryItem,
  updateDonatorInventoryItem,
  getDonatorInventoryItems,
  findDonatorInventoryItem,
  createNgoInventoryItem,
  updateNgoInventoryItem,
  getNgoInventoryItems,
  deleteNgoInventoryItem,
};
