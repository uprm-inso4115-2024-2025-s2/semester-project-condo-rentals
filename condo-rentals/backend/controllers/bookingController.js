const supabase = require("../databaseConfig");

// Controller to get all bookings
exports.getBookings = async (req, res) => {
    try {
        const { data, error } = await supabase.from("bookings").select("*");

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.insertBooking = async (req, res) => {
    try {
        const { renter_id, property_id, check_in_date, check_out_date, status } = req.body;

        const { data, error } = await supabase
            .from("bookings")
            .insert([
                { renter_id, property_id, check_in_date, check_out_date, status }
            ])
            .select(); // Fetch the newly created row

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: "Booking created successfully", booking: data[0] }); // 🔹 Return the new booking
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to update booking
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Fields to update

        const { data, error } = await supabase
            .from("bookings")
            .update(updates)
            .eq("id", id)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: "Booking updated successfully", updated_booking: data });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the booking from the database
        const { error } = await supabase
            .from("bookings")
            .delete()
            .eq("id", id)
            .select();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};