const cron = require("node-cron");
const { DonatorInventory, NgoInventory } = require("../models/inventory.model");

// Define a function that updates the inventory collection by decrementing the daysToExpire field by 1
async function updateInventoryDaysToExpire(model) {
  try {
    await model.updateMany({}, { $inc: { daysToExpire: -1 } });
  } catch (error) {
    console.error(error);
  }
}

// Define a cron job that runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  // Update the daysToExpire field for the DonatorInventory and NgoInventory collections
  await Promise.all([
    updateInventoryDaysToExpire(DonatorInventory),
    updateInventoryDaysToExpire(NgoInventory),
  ]);
});
