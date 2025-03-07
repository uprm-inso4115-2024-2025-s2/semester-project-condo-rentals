import { CondoMarkerProps } from "./InterfaceMarker";

export class MapListingsService {

    listings: CondoMarkerProps[];


    constructor() {



        this.listings = [
            {
                id: 1,
                name: "Condo Name",
                description: "Condo Description",
                location: {
                  latitude: 18.2106,
                  longitude: -67.1396,
                }
            },
            {
                id: 2,
                name: "Condo 2",
                description: "Condo Description",
                location: {
                  latitude: 18.2006,
                  longitude: -67.1396,
                }
            },
            {
                id: 3,
                name: "Condo 3",
                description: "Condo Description",
                location: {
                  latitude: 18.2106,
                  longitude: -67.1496,
                }
            },
            {
                id: 4,
                name: "Condo 4",
                description: "Condo Description",
                location: {
                  latitude: 18.2116,
                  longitude: -67.1396,
                }
            }
        ];
    }


    get listing() {
        return this.listings;
    }

    addListing(listing: CondoMarkerProps) {
        this.listings.push(listing);
    }
}