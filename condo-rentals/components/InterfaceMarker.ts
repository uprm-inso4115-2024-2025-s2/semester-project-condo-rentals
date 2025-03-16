export interface CondoMarkerProps {
    id: number;
    name: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    }
}