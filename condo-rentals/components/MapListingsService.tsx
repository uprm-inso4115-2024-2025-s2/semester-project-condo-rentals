import { CondoMarkerProps } from "./InterfaceMarker";

export class MapListingsService {

    listings: CondoMarkerProps[] = [];

    constructor(data: CondoMarkerProps[]) {
        this.listings = data      


    }
    get listing() {
        return this.listings;
    }

    addListing(listing: CondoMarkerProps) {
        this.listings.push(listing);
    }
    setListing(listing: CondoMarkerProps[]){
        this.listings = listing
    }
}