const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to get all bookings
router.get("/", bookingController.getBookings);

// Route to insert a new booking
router.post("/", bookingController.insertBooking);

// Router to update a booking
router.put("/:id", bookingController.updateBooking);

// Router to delete booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
