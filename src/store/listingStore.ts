import { create } from "zustand";
import {
  getListingByPropertyID as getListingByPropertyIDApi,
} from "../services/listingService";

export interface ListingFromAPI {
  Id: number;
  PropertyId: number;
  AgentId: number;
  Price: string;
  ListingStatus: string;
  ListingDate: string;
  Description: string;
  AcceptedBidId: number;
}

interface ListingState {
  listingFromAPI: ListingFromAPI | null;
  getListingByPropertyIDApi: (propertyID: number, username: string) => Promise<void>;
}

export const useListingStore = create<ListingState>((set) => ({
  listingFromAPI: null, // Initialize assetFromAPI as null
  getListingByPropertyIDApi: async (propertyID, username) => {
/*    
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
*/    
    // To Be enabled after the integration with backend is working. 
    try {
      const response = await getListingByPropertyIDApi(propertyID, username);

      if (response) {
        // Map the API response to the AssetFromAPI format
        const listingFromAPI: ListingFromAPI = {
          Id: response.ID,
          PropertyId: propertyID,
          AgentId: response.AgentID,
          Price: response.Price,
          ListingStatus: response.ListingStatus,
          ListingDate: response.ListingDate,
          Description: response.Description,
          AcceptedBidId: response.AcceptedBidID
        };
        set({ listingFromAPI }); // Update the state with the mapped asset
        console.log("listingStore:getListingByPropertyIDAPI: listingFromAPI=" + JSON.stringify(listingFromAPI));        
      }
    } catch (error) {
      console.error("Error fetching asset by ID:", error);
    }

  },
}));