require("dotenv").config();
const bcrypt = require("bcrypt");
const { createToken } = require("../functions/crypto.js");
const NGOServices = require("../services/ngo.service.js");
const { messageCustom } = require("../functions/message.js");
const { handleError } = require("../functions/handleError.js");
const { OK, CREATED, BAD_REQUEST } = require("../functions/messageType");

// ngo registration controller

const registerNGO = async (req, res) => {
  try {
    const { name, phoneCode, phone, latitude, longitude, email, password } =
      req.body;
    const newNGO = await NGOServices.createNGO({
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
      id: newNGO._id,
      email: newNGO.email,
      latitude: newNGO.latitude,
      longitude: newNGO.longitude,
    });
    // response
    const createdData = {
      token,
      data: {
        id: newNGO._id,
        name: newNGO.name,
        phoneCode: newNGO.phoneCode,
        phone: newNGO.phone,
        latitude: newNGO.latitude,
        longitude: newNGO.longitude,
        email: newNGO.email,
      },
    };
    messageCustom(res, CREATED, "NGO created successfully", createdData);
  } catch (err) {
    handleError(req, res, err);
  }
};

// ngo login controller

const loginNGO = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ngo = await NGOServices.findNGO(email);
    if (!ngo) {
      const err = {
        statusObj: BAD_REQUEST,
        type: "AuthenticationError",
        name: "Email or Password doesn't match.",
      };
      throw err;
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, ngo.password);
      if (!isPasswordCorrect) {
        const err = {
          statusObj: BAD_REQUEST,
          type: "AuthenticationError",
          name: "Email or Password doesn't match.",
        };
        throw err;
      } else {
        const token = createToken({
          id: ngo._id,
          email: ngo.email,
          latitude: ngo.latitude,
          longitude: ngo.longitude,
        });
        const loginData = {
          token,
          data: {
            id: ngo._id,
            name: ngo.name,
            phoneCode: ngo.phoneCode,
            phone: ngo.phone,
            latitude: ngo.latitude,
            longitude: ngo.longitude,
            email: ngo.email,
          },
        };
        messageCustom(res, OK, "NGO logged in successfully", loginData);
      }
    }
  } catch (err) {
    handleError(req, res, err);
  }
};

// ngo update controller

const updateNGO = async (req, res) => {
  try {
    const ngo = await NGOServices.updateNGO(req.ngo.id, req.body);

    const updatedData = {
      id: ngo._id,
      name: ngo.name,
      phoneCode: ngo.phoneCode,
      phone: ngo.phone,
      latitude: ngo.latitude,
      longitude: ngo.longitude,
      email: ngo.email,
    };
    messageCustom(res, OK, "NGO updated successfully", updatedData);
  } catch (err) {
    handleError(req, res, err);
  }
};

// ngo delete controller

const deleteNGO = async (req, res) => {
  try {
    await NGOServices.deleteNGO(req.ngo.id);
    messageCustom(res, OK, "NGO deleted successfully");
  } catch (err) {
    handleError(req, res, err);
  }
};

// export

module.exports = {
  registerNGO,
  loginNGO,
  updateNGO,
  deleteNGO,
};
