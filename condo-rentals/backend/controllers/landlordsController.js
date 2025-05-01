const supabase = require("../databaseConfig");

exports.getTrustedLandlords = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        // Query all owners
        const { data: owners, error } = await supabase
            .from("landlords")
            .select("id, name, profileImage, is_verified, average_rating, successful_rentals")

        if (error) throw new Error(error.message);

        if (!owners) return res.json([]);

        // Calculate trust score
        const trustedOwners = owners
            .map(owner => {
                const trustScore =
                    (owner.is_verified ? 50 : 0) +   // Verified adds 50 points
                    (owner.average_rating || 0) * 10 + // Rating (out of 5) scaled to 50
                    (owner.successful_rentals || 0);   // +1 point per successful rental

                return {
                    ownerId: owner.id,
                    name: owner.name,
                    profileImage: owner.profileImage,
                    trustScore,
                };
            })
            .sort((a, b) => b.trustScore - a.trustScore) // Sort descending
            .slice(0, limit);  // Limit results

        res.json(trustedOwners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

