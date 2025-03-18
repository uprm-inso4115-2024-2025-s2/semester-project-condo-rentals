const express = require("express");
const { getAllProperties, addProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");

const router = express.Router();

router.get("/", getAllProperties);       // List all properties
router.post("/", addProperty);           // Add a new property
router.put("/:id", updateProperty);      // Update property details
router.delete("/:id", deleteProperty);   // Delete a property

module.exports = router;
