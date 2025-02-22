require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// Import route files
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase connection
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Test route
app.get("/", (req, res) => {
    res.send("Condo Rental API is running...");
});

// Register API routes
app.use("/auth", authRoutes);
app.use("/properties", propertyRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
