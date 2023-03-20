require("dotenv").config();
const bcrypt = require("bcrypt");
const { createToken } = require("../functions/crypto.js");
const DonatorServices = require("../services/donator.service.js");
const { messageCustom } = require("../functions/message.js");
const { handleError } = require("../functions/handleError.js");
const { OK, CREATED, BAD_REQUEST } = require("../functions/messageType");

// donator registration controller

const registerDonator = async (req, res) => {
  // fields include name, phoneCode, phone, latitude, longitude, email, password

  try {
    const { name, phoneCode, phone, latitude, longitude, email, password } =
      req.body;

    const newDonator = await DonatorServices.createDonator({
      name,
      phoneCode,
      phone,
      latitude,
      longitude,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // create token

    const token = createToken({
      id: newDonator._id,
      email: newDonator.email,
    });

    // response
    const createdData = {
      token,
      data: {
        id: newDonator._id,
        name: newDonator.name,
        phoneCode: newDonator.phoneCode,
        phone: newDonator.phone,
        latitude: newDonator.latitude,
        longitude: newDonator.longitude,
        email: newDonator.email,
      },
    };
    messageCustom(res, CREATED, "Donator created successfully", createdData);
  } catch (err) {
    handleError(req, res, err);
  }
};

// donator login controller

const loginDonator = async (req, res) => {
  // fields include email, password

  try {
    const { email, password } = req.body;

    const donator = await DonatorServices.findDonator({ email });

    if (!donator) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Email or Password doesn't match.",
      };
      throw err;
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        donator.password,
      );

      if (!isPasswordCorrect) {
        const err = {
          statusObj: BAD_REQUEST,
          type: "AuthenticationError",
          name: "Email or Password doesn't match.",
        };
        throw err;
      } else {
        // create token

        const token = createToken({
          id: donator._id,
          email: donator.email,
        });

        // response
        const loginData = {
          token,
          data: {
            id: donator._id,
            name: donator.name,
            phoneCode: donator.phoneCode,
            phone: donator.phone,
            latitude: donator.latitude,
            longitude: donator.longitude,
            email: donator.email,
          },
        };
        messageCustom(res, OK, "Donator logged in successfully", loginData);
      }
    }
  } catch (err) {
    handleError(req, res, err);
  }
};

// donator update controller

const updateDonator = async (req, res) => {
  // fields include name, phoneCode, phone, latitude, longitude, email, password
  // we may get partial data

  try {
    const donator = await DonatorServices.updateDonator(
      req.donator.id,
      req.body,
    );

    // response
    const updatedData = {
      id: donator._id,
      name: donator.name,
      phoneCode: donator.phoneCode,
      phone: donator.phone,
      latitude: donator.latitude,
      longitude: donator.longitude,
      email: donator.email,
    };
    messageCustom(res, OK, "Donator updated successfully", updatedData);
  } catch (err) {
    handleError(req, res, err);
  }
};

// donator delete controller

const deleteDonator = async (req, res) => {
  // get id from req.donator.id and delete donator
  try {
    const donator = await DonatorServices.deleteDonator(req.donator.id);
    messageCustom(res, OK, "Donator deleted successfully", donator);
  } catch (err) {
    handleError(req, res, err);
  }
};

//export
module.exports = {
  registerDonator,
  loginDonator,
  updateDonator,
  deleteDonator,
};
