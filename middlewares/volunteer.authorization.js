const jwt = require("jsonwebtoken");
const { findVolunteer } = require("../services/volunteer.service");
const { UNAUTHORIZED } = require("../functions/messageType");
const { messageError } = require("../functions/message");

// middleware gets a custom input called type
exports.volunteerAuth = (type) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        return messageError(res, UNAUTHORIZED, "Authorization Required");
      } else {
        try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.accessTokenSecret);
          // serch for donator or ngo
          var volunteer;
          if (type === "donator") {
            volunteer = await findVolunteer({
              _id: decoded._id,
              for: "Donator",
            });
          } else if (type === "ngo") {
            volunteer = await findVolunteer({ _id: decoded._id, for: "NGO" });
          }
          if (!volunteer) {
            return messageError(res, UNAUTHORIZED, "Authorization Required");
          }
          req.volunteer = volunteer;
          next();
        } catch (error) {
          throw {
            statusObj: UNAUTHORIZED,
            name: "Expired or invalid token",
            type: "JWTError",
          };
        }
      }
    } catch (error) {
      return messageError(res, UNAUTHORIZED, "Authorization Required");
    }
  };
};
