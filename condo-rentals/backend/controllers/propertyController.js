const supabase = require("../databaseConfig");

exports.getAllProperties = async (req, res) => {
    try {
        const { data, error } = await supabase.from("properties").select("*");
        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addProperty = async (req, res) => {
    try {
        const { owner_id, title, description, price, location, is_available = true } = req.body;

        const { data, error } = await supabase
            .from("properties")
            .insert([{ owner_id, title, description, price, location, is_available }])
            .select();

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const { data, error } = await supabase
            .from("properties")
            .update(updates)
            .eq("id", id)
            .select();

        if (error) throw new Error(error.message);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("properties")
            .delete()
            .eq("id", id);

        if (error) throw new Error(error.message);
        res.json({ message: "Property deleted successfully", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getNewListings = async (req, res) => {
    try {
        const { area, limit = 10 } = req.query;

        if (!area) {
            return res.status(400).json({ error: "Area is required" });
        }

        const { data, error } = await supabase
            .from("properties")
            .select("id, title, price, location, image_url, owner_id, created_at") // select only needed fields
            .eq("location", area)
            .eq("is_available", true)
            .order("created_at", { ascending: false })
            .limit(parseInt(limit));  // prevent over-fetching

        if (error) throw new Error(error.message);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

