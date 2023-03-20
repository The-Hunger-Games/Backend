const InventoryController = require("../controllers/inventory.controller");
const { Router } = require("express");

const inventoryRouter = Router();

inventoryRouter.post(
  "/donator/create",
  InventoryController.createDonatorInventoryItem,
);
inventoryRouter.get(
  "/donator/get",
  InventoryController.getDonatorInventoryItems,
);
inventoryRouter.get(
  "/donator/expiring",
  InventoryController.getDonatorInventoryItemsWithDaysToExpireLessThanThree,
);
inventoryRouter.put(
  "/donator/update",
  InventoryController.updateDonatorInventoryItem,
);
inventoryRouter.delete(
  "/donator/delete",
  InventoryController.deleteDonatorInventoryItem,
);
inventoryRouter.post(
  "/donator/donate",
  InventoryController.donateDonatorInventoryItemToNgoInventory,
);
inventoryRouter.put("/ngo/update", InventoryController.updateNgoInventoryItem);
inventoryRouter.get("/ngo/get", InventoryController.getNgoInventoryItems);
inventoryRouter.delete(
  "/ngo/donate",
  InventoryController.donateNgoInventoryItem,
);

module.exports = inventoryRouter;
