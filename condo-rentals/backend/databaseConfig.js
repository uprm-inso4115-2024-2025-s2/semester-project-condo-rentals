require("dotenv").config(); // Ensure .env is loaded before accessing environment variables
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error("Missing Supabase environment variables!");
}

module.exports = supabase;
