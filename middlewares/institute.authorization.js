const jwt = require("jsonwebtoken");
const { findDonator } = require("../services/donator.service");
const { findNGO } = require("../services/ngo.service");
const {
  FORBIDDEN,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require("../functions/messageType");
const { handleError } = require("../functions/handleError");

// middleware gets a custom input called type
exports.instituteAuth = (type) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throw {
          statusObj: BAD_REQUEST,
          name: "No authorization token found",
          type: "AuthenticationError",
        };
      } else {
        try {
          const token = req.headers.authorization.split(" ")[1];
          if (token[0] !== "Bearer") {
            throw {
              statusObj: BAD_REQUEST,
              name: "We don't accept any token other than Bearer",
              type: "ValidationError",
            };
          }
          const decoded = jwt.verify(token, process.env.accessTokenSecret);
          // search for donator or ngo
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
            throw {
              statusObj: FORBIDDEN,
              name: "Not Authorized",
              type: "AuthorizationError",
            };
          }
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
      handleError(req, res, error);
    }
  };
};
