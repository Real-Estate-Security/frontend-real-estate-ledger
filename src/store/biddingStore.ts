import { create } from "zustand";
import {
  createBidding as createBiddingAPI,
} from "../services/biddingService";

export interface CreateBiddingRequestForAPI {
  AgentId: number;
  Amount: string;
  BuyerId: number;
  ListingId: number;
  PreviousBidId?: number;
}

export interface CreateBiddingResponseFromAPI {
  AgentId: number;
  Amount: string;
  BuyerId: number;
  ListingId: number;
  PreviousBidId?: number;
}

interface CreateBiddingState {
  createBiddingRequestForAPI: CreateBiddingRequestForAPI | null;
  createBiddingResponseFromAPI: CreateBiddingResponseFromAPI | null;
  createBiddingAPI: (agentId: number, amount: string, buyerId: number, listingId:number, previousBidId?:number) => Promise<void>;
}

export const useBiddingStore = create<CreateBiddingState>((set) => ({
  createBiddingRequestForAPI: null, // Initialize assetFromAPI as null
  createBiddingResponseFromAPI: null, // Initialize assetFromAPI as null
  createBiddingAPI: async (agentId, amount, buyerId, listingId, previousBidId) => {
    // To Be enabled after the integration with backend is working. 
    try {
      const response = await createBiddingAPI(agentId, amount, buyerId, listingId, previousBidId);

      if (response) {
        const createBiddingResponseFromAPI: CreateBiddingResponseFromAPI = {
          AgentId: response.AgentID,
          Amount: response.Amount,
          BuyerId: response.BuyerID,
          ListingId: response.ListingID,
          PreviousBidId: response.PreviousBidID
        };
        set({ createBiddingResponseFromAPI }); // Update the state with the mapped asset
        console.log("biddingStore:createBiddingAPI: createBiddingResponseFromAPI=" + JSON.stringify(createBiddingResponseFromAPI));        
      }
    } catch (error) {
      console.error("Error creating bid:", error);
    }

  },
}));