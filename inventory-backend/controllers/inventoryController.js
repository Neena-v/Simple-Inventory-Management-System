const inventory = require("../model/inventoryData");

const getInventory = (req, res, next) => {
  try {
    let results = [...inventory];
    const { category, search, minQuantity } = req.query;

    if (category) {
      results = results.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (minQuantity) {
      const minQ = parseInt(minQuantity, 10);
      if (!isNaN(minQ)) {
        results = results.filter((item) => item.quantity >= minQ);
      }
    }

    if (search) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    next(error);
  }
};

const getItemById = (req, res, next) => {
  try {
    const item = inventory.find((i) => i.id === req.params.id);
    if (!item) {
      const error = new Error(`Item with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    next(error);
  }
};

const createItem = (req, res, next) => {
  try {
    const { name, category, price, quantity } = req.body;

    const newItem = {
      id: Date.now().toString(),
      name,
      category,
      price,
      quantity
    };

    inventory.push(newItem);

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: newItem
    });
  } catch (error) {
    next(error);
  }
};

const updateItem = (req, res, next) => {
  try {
    const index = inventory.findIndex((i) => i.id === req.params.id);
    if (index === -1) {
      const error = new Error(`Item with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    const { name, category, price, quantity } = req.body;

    inventory[index] = {
      ...inventory[index],
      name: name !== undefined ? name : inventory[index].name,
      category: category !== undefined ? category : inventory[index].category,
      price: price !== undefined ? price : inventory[index].price,
      quantity: quantity !== undefined ? quantity : inventory[index].quantity
    };

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: inventory[index]
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = (req, res, next) => {
  try {
    const index = inventory.findIndex((i) => i.id === req.params.id);
    if (index === -1) {
      const error = new Error(`Item with ID ${req.params.id} not found`);
      error.statusCode = 404;
      return next(error);
    }

    const deletedItem = inventory.splice(index, 1)[0];

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: deletedItem
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInventory,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};