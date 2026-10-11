
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Check whether the backend is running
app.get("/", (req, res) => {
  res.json({ message: "BiteRush API is running!" });
});

// Read product data from the repository
app.get("/products", (req, res) => {
 const filePath = path.join(
    __dirname,
    "..",
    "data",
    "db.json"
  );

  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    res.json(Array.isArray(data) ? data : data.products);
  } catch (error) {
    console.error("Could not load products:", error.message);
    res.status(500).json({
      error: "Could not load product data"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`BiteRush API running on port ${PORT}`);
});
