// this will create volunteers for either NGO or Donator

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // for NGO or Donator
    for: {
      type: String,
      enum: ["NGO", "Donator"],
      required: true,
    },
    // id of the NGO or Donator
    institudeID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Volunteers = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteers;
