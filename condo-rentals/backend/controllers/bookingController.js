const supabase = require("../databaseConfig");

exports.createBooking = async (req, res) => {
    try {
        const { renter_id, property_id, check_in_date, check_out_date, status = "pending" } = req.body;

        const { data, error } = await supabase
            .from("bookings")
            .insert([{ renter_id, property_id, check_in_date, check_out_date, status }])
            .select();

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.modifyBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from("bookings")
            .update(updates)
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("bookings")
            .update({ status: "cancelled" }) // Instead of deleting, update the status
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);
        res.json({ message: "Booking cancelled successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const { renter_id } = req.params;

        const { data, error } = await supabase
            .from("bookings")
            .select("*")
            .eq("renter_id", renter_id);

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
