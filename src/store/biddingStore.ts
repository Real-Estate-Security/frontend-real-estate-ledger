import { create } from "zustand";
import {
  createBidding as createBiddingAPI,
  listBids,
  rejectBid,
} from "../services/biddingService";

export interface BiddingListResponseFromAPI {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

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

export interface ListBidsResponseFromAPI {
  ID: number;
  AgentId: number;
  Amount: string;
  BuyerId: number;
  ListingId: number;
  PreviousBidId?: number;
  Status: string;
}


interface CreateBiddingState {
  createBiddingRequestForAPI: CreateBiddingRequestForAPI | null;
  createBiddingResponseFromAPI: CreateBiddingResponseFromAPI | null;
  biddingListResponseFromAPI: BiddingListResponseFromAPI[] | null;
  listBidsResponseFromAPI: ListBidsResponseFromAPI[] | null;

  rejectBidAPI: (ID: number) => Promise<number>;
  createBiddingAPI: (agentId: number, amount: string, buyerId: number, listingId:number, previousBidId?:number) => Promise<void>;
  getBidingListByBuyerIdAPI: (buyerId:number) => Promise<void>;
  updateBiddingStatusAPI: (biddingId:number, newBiddingStatus: string) => Promise<void>;
}

export const useBiddingStore = create<CreateBiddingState>((set) => ({
  createBiddingRequestForAPI: null, // Initialize assetFromAPI as null
  createBiddingResponseFromAPI: null, // Initialize assetFromAPI as null
  biddingListResponseFromAPI: null,
  listBidsResponseFromAPI: null,

  updateBiddingStatusAPI: async(biddingId, newBiddingStatus) => {
    console.log("biddingStore:updateBiddingStatusAPI: buyerId=" + biddingId, ",newBiddingStatus=", newBiddingStatus);    
  },

  getBidingListByBuyerIdAPI: async(buyerId) => {
    console.log("biddingStore:getBidingListByBuyerIdAPI: buyerId=" + buyerId);    

    try {
      const response = await listBids(1, "test123");
      if (response) {

        if (Array.isArray(response)) {
          const listBidsResponseFromAPI = response.map((item) => ({
            ID: item.ID,
            AgentId: item.AgentID,
            Amount: item.Amount,
            BuyerId: item.BuyerID,
            ListingId: item.ListingID,
            PreviousBidId: item.PreviousBidID,
            Status: item.Status
          }));
          set({ listBidsResponseFromAPI });
          console.log("biddingStore:getBidingListByBuyerIdAPI: listBidsResponseFromAPI - array=" + JSON.stringify(listBidsResponseFromAPI));
        } else {
          const listBidsResponseFromAPI: ListBidsResponseFromAPI[] = [{
            ID: response.ID,
            AgentId: response.AgentID,
            Amount: response.Amount,
            BuyerId: response.BuyerID,
            ListingId: response.ListingID,
            PreviousBidId: response.PreviousBidID,
            Status: response.Status
          }];
          set({ listBidsResponseFromAPI });
          console.log("biddingStore:getBidingListByBuyerIdAPI: listBidsResponseFromAPI - single=" + JSON.stringify(listBidsResponseFromAPI));
        }
      }
    } catch (error) {
      console.error("Error listing bid:", error);
    }

    
  },

  createBiddingAPI: async (agentId, amount, buyerId, listingId, previousBidId) => {
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
  rejectBidAPI: async (ID) => {
    try {
      const response = await rejectBid(ID);
      if (response) {
        console.log("biddingStore:rejectBidAPI response= " + response.toString());
        return response; // Ensure the response is returned as a number
      }
      throw new Error("No response received from rejectBid");
    } catch (error) {
      console.error("Error rejecting bid:", error);
      throw error; // Re-throw the error to maintain the Promise<number> contract
    }
  }
}));