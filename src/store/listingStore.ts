import { create } from "zustand";
/* To Be enabled after the integration with backend is working. 
import {
  getPropertyByID as getPropertyByIDApi,
} from "../services/propertyService";
*/

export interface ListingFromAPI {
  Id: number;
  PropertyId: number;
  AgentId: number;
  Price: number;
  ListingStatus: string;
  ListingDate: string;
  Description: string;
  AcceptedBidId: number;
}

interface ListingState {
  listingFromAPI: ListingFromAPI | null;
  getListingByPropertyIDAPI: (propertyID: number, username: string) => Promise<void>;
}

export const useListingStore = create<ListingState>((set) => ({
  listingFromAPI: null, // Initialize assetFromAPI as null
  getListingByPropertyIDAPI: async (propertyID, username) => {
    //Mock the backend call with hard code response. 
    //To Be disabled after the integration with backend is working. 
    console.log("listingStore:getListingByPropertyIDAPI: propertyID=" + propertyID + ", username=" + username)
    const listingFromAPI: ListingFromAPI = {
      Id: 3,
      PropertyId: 3,
      AgentId: 3,
      Price: 500000,
      ListingStatus: "Active",
      ListingDate: "Mar 1 2025",
      Description: "Great Location and schools v2",
      AcceptedBidId: 3,    
    }
    set({ listingFromAPI }); // Update the state with the mapped asset
    console.log("listingStore:getListingByPropertyIDAPI: listingFromAPI=" + JSON.stringify(listingFromAPI));
    /* To Be enabled after the integration with backend is working. 
    try {
      const response = await getPropertyByIDApi(propertyID, username);

      if (response) {
        // Map the API response to the AssetFromAPI format
        const propertyFromAPI: PropertyFromAPI = {
          Id: response.ID,
          OwnerId: response.Owner,
          Address: response.Address,
          City: response.City,
          State: response.State,
          ZipCode: response.ZipCode,
          NumOfBedrooms: response.NumOfBedrooms,
          NumOfBathrooms: response.NumOfBathrooms
        };
        set({ propertyFromAPI }); // Update the state with the mapped asset
      }
    } catch (error) {
      console.error("Error fetching asset by ID:", error);
    }
    */
  },
}));