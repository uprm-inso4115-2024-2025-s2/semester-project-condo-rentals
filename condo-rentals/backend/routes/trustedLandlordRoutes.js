const express = require("express");
const { getTrustedLandlords } = require("../controllers/landlordsController");

const router = express.Router();

// Updated route
router.get("/trusted-owners", getTrustedLandlords);

module.exports = router;

