require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const propertiesRoutes = require("./routes/propertyRoutes");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/properties", propertiesRoutes);

app.get("/", (req, res) => {
    res.send("Condo Rental API is running.");
});

// Start server only if not in test mode
if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export app for testing
module.exports = app;
