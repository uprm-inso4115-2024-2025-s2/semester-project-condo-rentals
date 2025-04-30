import {supabase} from "../supabaseClient"

const limit: number = 10;

export async function getTrustedLandlords() {
  const { data, error } = await supabase
  .from("landlords")
  .select("id, name, profileImage, is_verified, average_rating, successful_rentals")

  if (error) {
    console.error("Supabase error:", error.message);
    return;
  }
  return data
}

