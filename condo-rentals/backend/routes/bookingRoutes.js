const express = require("express");
const { createBooking, modifyBooking, cancelBooking, getUserBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.put("/:id", modifyBooking);
router.delete("/:id", cancelBooking);
router.get("/:user_id", getUserBookings);

module.exports = router;
