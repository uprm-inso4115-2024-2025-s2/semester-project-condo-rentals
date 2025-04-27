import { supabase } from "../supabaseClient";

const limit: number = 10;

export async function getNewestCondos() {
    const { data, error } = await supabase
        .from('condos')
        .select('condo_id, title, image, city')
        .order('created_at', { ascending: true })
        .limit(limit);

    if (error) throw new Error(error.message);

    return data;
}