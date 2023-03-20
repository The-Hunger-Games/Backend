// donator model
// ----------------
// name : string
// phone code : number
// phone : number
// latitude : number
// longitude : number
// email : string
// password : string

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donatorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneCode: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  numDonated: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Donator", donatorSchema);
