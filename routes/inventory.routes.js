const InventoryController = require("../controllers/inventory.controller");
const { Router } = require("express");
const { instituteAuth } = require("../middlewares/institute.authorization");
const { volunteerAuth } = require("../middlewares/volunteer.authorization");

const inventoryRouter = Router();

inventoryRouter.post(
  "/donator/create",
  volunteerAuth("donator"),
  InventoryController.createDonatorInventoryItem,
);
inventoryRouter.get(
  "/donator/get",
  instituteAuth("donator"),
  InventoryController.getDonatorInventoryItems,
);
inventoryRouter.get(
  "/donator/expiring",
  instituteAuth("donator"),
  InventoryController.getDonatorInventoryItemsWithDaysToExpireLessThanThree,
);
inventoryRouter.put(
  "/donator/update",
  instituteAuth("donator"),
  InventoryController.updateDonatorInventoryItem,
);
inventoryRouter.delete(
  "/donator/delete",
  instituteAuth("donator"),
  InventoryController.deleteDonatorInventoryItem,
);
inventoryRouter.post(
  "/donator/donate",
  volunteerAuth("donator"),
  InventoryController.donateDonatorInventoryItemToNgoInventory,
);
inventoryRouter.put(
  "/ngo/update",
  instituteAuth("ngo"),
  InventoryController.updateNgoInventoryItem,
);
inventoryRouter.get(
  "/ngo/get",
  instituteAuth("ngo"),
  InventoryController.getNgoInventoryItems,
);
inventoryRouter.delete(
  "/ngo/donate",
  volunteerAuth("ngo"),
  InventoryController.donateNgoInventoryItem,
);

module.exports = inventoryRouter;
