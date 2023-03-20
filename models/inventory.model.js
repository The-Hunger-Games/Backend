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
  donator: {
    type: Schema.Types.ObjectId,
    ref: "Donator",
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
    unique: true,
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
  NGO: {
    type: Schema.Types.ObjectId,
    ref: "NGO",
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

const Donator = mongoose.model("DonatorInventory", donatorInventorySchema);
const NGO = mongoose.model("NgoInventory", ngoInventorySchema);

module.exports = {
  Donator,
  NGO,
};
