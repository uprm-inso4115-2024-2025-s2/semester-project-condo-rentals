import { supabase } from "../supabaseClient";

export interface Listing {
  landlordName: string;
  landlordDescription: string;
  location: string;
  condoFeatures: string;
  price: string;
  images: string[];
}

export const fetchListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from("condos") // Supabase table name
    .select("*");

  if (error) {
    console.error("Error fetching listings:", error);
    return [];
  }

  const mappedListings: Listing[] = data.map((listing: any) => ({
    landlordName: listing.host_name ?? "Unknown Host",
    landlordDescription: listing.description ?? "",
    location: `${listing.city ?? "Unknown City"} - ${listing.area ?? "Unknown Area"}`,
    condoFeatures: listing.title ?? "",
    price: listing.price_per_night
      ? `$${listing.price_per_night} per night`
      : "Price not available",
    images: [listing.image].filter(Boolean), // makes sure there's no undefined
  }));

  return mappedListings;
};
 