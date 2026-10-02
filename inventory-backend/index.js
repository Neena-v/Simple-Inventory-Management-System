const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventoryRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Simple Inventory Management API" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});