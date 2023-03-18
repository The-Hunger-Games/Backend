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
    type: Number,
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
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Donator", donatorSchema);
