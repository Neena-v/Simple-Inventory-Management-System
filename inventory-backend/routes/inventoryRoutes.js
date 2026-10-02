const express = require("express");
const router = express.Router();
const {
  getInventory,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require("../controllers/inventoryController");
const { validateInventoryItem } = require("../middleware/validation");

router.route("/")
  .get(getInventory)
  .post(validateInventoryItem, createItem);

router.route("/:id")
  .get(getItemById)
  .put(validateInventoryItem, updateItem)
  .delete(deleteItem);

module.exports = router;