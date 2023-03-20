require("dotenv").config();
const InventoryServices = require("../services/inventory.service.js");
const NGOServices = require("../services/ngo.service.js");
const { messageCustom } = require("../functions/message.js");
const { handleError } = require("../functions/handleError.js");
const { OK, CREATED, BAD_REQUEST } = require("../functions/messageType");

// donator controllers

// create donator inventor item

const createDonatorInventoryItem = async (req, res) => {
  try {
    const { name, company, lotNumber, serialNumber, daysToExpire } = req.body;
    const donatorInventoryItem =
      await InventoryServices.createDonatorInventoryItem({
        name,
        donator: req.donator._id,
        company,
        lotNumber,
        serialNumber,
        daysToExpire,
      });
    if (donatorInventoryItem) {
      messageCustom(
        res,
        CREATED,
        "Donator inventory item created successfully",
        donatorInventoryItem,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// delete donator inventory item

const deleteDonatorInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const donatorInventoryItem =
      await InventoryServices.deleteDonatorInventoryItem({
        _id: id,
      });
    if (donatorInventoryItem) {
      messageCustom(
        res,
        OK,
        "Donator inventory item deleted successfully",
        donatorInventoryItem,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// update donator inventory item

const updateDonatorInventoryItem = async (req, res) => {
  try {
    if (!req.body.serialNumber) {
      const error = {
        statusObj: BAD_REQUEST,
        type: "BAD_REQUEST",
        message: "Serial number is required",
      };
      throw error;
    }

    const updatedData = await InventoryServices.updateDonatorInventoryItem(
      req.body,
    );
    if (updatedData) {
      messageCustom(
        res,
        OK,
        "Donator inventory item updated successfully",
        updatedData,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// get donator inventory items

const getDonatorInventoryItems = async (req, res) => {
  try {
    const donatorInventoryItems =
      await InventoryServices.getDonatorInventoryItems({
        donator: req.donator._id,
      });
    if (donatorInventoryItems) {
      messageCustom(
        res,
        OK,
        "Donator inventory items fetched successfully",
        donatorInventoryItems,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// get donator inventory items with daysToExpire < 3

const getDonatorInventoryItemsWithDaysToExpireLessThanThree = async (
  req,
  res,
) => {
  try {
    const donatorInventoryItems =
      await InventoryServices.getDonatorInventoryItems({
        donator: req.donator._id,
        daysToExpire: { $lt: 3 },
      });
    if (donatorInventoryItems) {
      messageCustom(
        res,
        OK,
        "Donator inventory items fetched successfully",
        donatorInventoryItems,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// donate donator inventory item to ngo inventory (QR)

// this will take only id from req.body and take multiple other inputs and
// create a new ngo inventory item while also deleting the donator inventory item

const donateDonatorInventoryItemToNgoInventory = async (req, res) => {
  try {
    // we will use name, latitude and longitude to find the ngo
    const { name, latitude, longitude } = req.body;
    const ngo = await NGOServices.findNGO({
      name,
      latitude,
      longitude,
    });

    if (!ngo) {
      const error = {
        statusObj: BAD_REQUEST,
        type: "BAD_REQUEST",
        message: "NGO not found",
      };
      throw error;
    }

    // we will reuse the _id, name and daysToExpire of the item from donator inventory
    const { _id } = req.body;
    const donatorInventoryItem =
      await InventoryServices.findDonatorInventoryItem({
        _id,
      });

    if (!donatorInventoryItem) {
      const error = {
        statusObj: BAD_REQUEST,
        type: "BAD_REQUEST",
        message: "Donator inventory item not found",
      };
      throw error;
    }

    // we will create a new ngo inventory item
    const item = {
      _id: donatorInventoryItem._id,
      name: donatorInventoryItem.name,
      NGO: ngo._id,
      description: req.body.description,
      calories: req.body.calories,
      protein: req.body.protein,
      fat: req.body.fat,
      carbohydrates: req.body.carbohydrates,
      daysToExpire: donatorInventoryItem.daysToExpire,
    };

    const ngoInventoryItem = await InventoryServices.createNgoInventoryItem(
      item,
    );

    if (ngoInventoryItem) {
      messageCustom(
        res,
        CREATED,
        "NGO inventory item created successfully",
        ngoInventoryItem,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// ngo controllers

// update ngo inventory item

const updateNgoInventoryItem = async (req, res) => {
  try {
    if (!req.body._id) {
      const error = {
        statusObj: BAD_REQUEST,
        type: "BAD_REQUEST",
        message: "ID is required",
      };
      throw error;
    }

    const updatedData = await InventoryServices.updateNgoInventoryItem(
      req.body,
    );
    if (updatedData) {
      messageCustom(
        res,
        OK,
        "NGO inventory item updated successfully",
        updatedData,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// get ngo inventory items

const getNgoInventoryItems = async (req, res) => {
  try {
    const ngoInventoryItems = await InventoryServices.getNgoInventoryItems({
      NGO: req.ngo._id,
    });
    if (ngoInventoryItems) {
      messageCustom(
        res,
        OK,
        "NGO inventory items fetched successfully",
        ngoInventoryItems,
      );
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// donate ngo inventory item

// this will take only id from req.body and delete the ngo inventory item while using a service
// to increase the ngo amountDonated by one

const donateNgoInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const ngoInventoryItem = await InventoryServices.deleteNgoInventoryItem({
      _id: id,
    });

    if (ngoInventoryItem) {
      const ngo = await NGOServices.increaseNgoAmountDonated({
        _id: ngoInventoryItem.NGO,
      });
      if (ngo) {
        messageCustom(
          res,
          OK,
          "NGO inventory item donated successfully",
          ngoInventoryItem,
        );
      }
    }
  } catch (error) {
    handleError(req, res, error);
  }
};

// get balanced food clusters

// under construction

// export
module.exports = {
  createDonatorInventoryItem,
  updateDonatorInventoryItem,
  deleteDonatorInventoryItem,
  getDonatorInventoryItems,
  getDonatorInventoryItemsWithDaysToExpireLessThanThree,
  donateDonatorInventoryItemToNgoInventory,
  updateNgoInventoryItem,
  getNgoInventoryItems,
  donateNgoInventoryItem,
};
