import { create } from "zustand";
import {
  getListingByPropertyID as getListingByPropertyIDApi,
  updateAcceptedBidIdByListingId as updateAcceptedBidIdByListingIdAPI
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
  updateAcceptedBidIdByListingIdAPI: (AcceptedBidId: number, ListId: number) => Promise<number | undefined>;
}

export const useListingStore = create<ListingState>((set) => ({
  listingFromAPI: null, 
  updateAcceptedBidIdByListingIdAPI: async (AcceptedBidId, ListId) => {
    try {
      const response = await updateAcceptedBidIdByListingIdAPI(AcceptedBidId, ListId);

      if (response) {
        console.log("listingStore:getListingByPropertyIDAPI: listingFromAPI=" + JSON.stringify(response));
        return response;
      }
      return undefined;
    } catch (error) {
      console.error("Error fetching asset by ID:", error);
    }
  },

  getListingByPropertyIDApi: async (propertyID, username) => {
    try {
      const response = await getListingByPropertyIDApi(propertyID, username);

      if (response) {
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