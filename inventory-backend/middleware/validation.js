const validateInventoryItem = (req, res, next) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    const error = new Error("Missing required fields: name, category, price, and quantity are required.");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof price !== "number" || price < 0) {
    const error = new Error("Price must be a valid non-negative number.");
    error.statusCode = 400;
    return next(error);
  }

  if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 0) {
    const error = new Error("Quantity must be a valid non-negative integer.");
    error.statusCode = 400;
    return next(error);
  }

  next();
};

module.exports = { validateInventoryItem };