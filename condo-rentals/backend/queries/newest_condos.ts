import { supabase } from "../supabaseClient";

const limit: number = 10;

export async function getNewestCondos() {
    const { data, error } = await supabase
        .from('condos')
        .select('condo_id, title, image, city, num_bedrooms, num_bathrooms, has_parking, is_pet_friendly, price_per_night')
        .order('created_at', { ascending: true })
        .limit(limit);

    if (error) throw new Error(error.message);

    return data;
}
