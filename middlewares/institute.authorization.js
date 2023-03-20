const jwt = require("jsonwebtoken");
const { findDonator } = require("../services/donator.service");
const { findNGO } = require("../services/ngo.service");
const { UNAUTHORIZED } = require("../functions/messageType");
const { messageError } = require("../functions/message");

// middleware gets a custom input called type
exports.instituteAuth = async (type) => {
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return messageError(res, UNAUTHORIZED, "Authorization Required");
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.accessTokenSecret);
      // serch for donator or ngo
      var institute;
      if (type === "donator") {
        institute = await findDonator({ _id: decoded._id });
        req.donator = institute;
      } else if (type === "ngo") {
        institute = await findNGO({ _id: decoded._id });
        req.ngo = institute;
      } else {
        // both
        institute = await findDonator({ _id: decoded._id });
        if (institute) {
          req.donator = institute;
        } else {
          institute = await findNGO({ _id: decoded._id });
          req.ngo = institute;
        }
      }
      if (!institute) {
        return messageError(res, UNAUTHORIZED, "Authorization Required");
      }
      next();
    } catch (error) {
      return messageError(res, UNAUTHORIZED, "Authorization Required");
    }
  };
};
