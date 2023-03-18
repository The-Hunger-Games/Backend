// donator inventory and ngo inventory
// -----------------------------------
// ----------------
// donator inventory
// ----------------
// name : string
// company : string
// lot number : string
// serial number : string
// days to expire : number
// ----------------
// ngo inventory
// ----------------
// name : string
// description : string
// calories : number
// protein : number
// fat : number
// carbohydrates : number
// days to expire : number

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donatorInventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  lotNumber: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  daysToExpire: {
    type: Number,
    required: true,
  },
});

const ngoInventorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  daysToExpire: {
    type: Number,
    required: true,
  },
});

const DonatorInventory = mongoose.model(
  "DonatorInventory",
  donatorInventorySchema,
);
const NgoInventory = mongoose.model("NgoInventory", ngoInventorySchema);

module.exports = {
  DonatorInventory,
  NgoInventory,
};
