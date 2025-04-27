import { supabase } from "../supabaseClient";

// Used so that a condo image can be used for the area.
interface Condo {
    area: string;
    image_url: string;
}


const getAreas = async (): Promise<Condo[]> => {
    try {
        const { data, error } = await supabase
            .rpc('fetch_condos_distinct_area');

        console.log("DATA = " + data);
        console.log("AREA[0] = " + data[0].area);
        if (error) throw error;
        return data as Condo[];
    } catch (error) {
        console.error('Error fetching condos: ', error);
        return [];
    }
};;

export default getAreas;