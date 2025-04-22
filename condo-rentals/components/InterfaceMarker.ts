export interface CondoMarkerProps {
    condo_id: number;
    title: string;
    description: string;
    address: string;
    city: string;
    state_province: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
    num_bedrooms: number;
    num_bathrooms: number;
    max_guests: number;
    square_footage: number;
    price_per_night: number;
    is_available: boolean;
    status: string;
    host_name: string;
    image_url: string;
}