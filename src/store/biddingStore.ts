import { create } from "zustand";
import {
  createBidding as createBiddingAPI,
  getLatestBidOnListing,
  updateBidStatus,
  listBids,
  rejectBid,
} from "../services/biddingService";
import {getCurrentLoginUser} from "../services/authService"
import { components } from "../api/types/api-types";

export type UserResponse = components["schemas"]["server.userResponse"];

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

export interface LatestBidsResponseFromAPI {
  ID: number;
  AgentId: number;
  Amount: string;
  BuyerId: number;
  ListingId: number;
  PreviousBidId?: number;
  Status: string;
}


interface CreateBiddingState {
  previousBidID: number | null;
  createBiddingRequestForAPI: CreateBiddingRequestForAPI | null;
  createBiddingResponseFromAPI: CreateBiddingResponseFromAPI | null;
  listBidsResponseFromAPI: ListBidsResponseFromAPI[] | null;
  latestBidsResponseFromAPI: LatestBidsResponseFromAPI | null;

  rejectBidAPI: (ID: number) => Promise<number>;
  getLatestBidonListingAPI: (ID: number) => Promise<void>;
  createBiddingAPI: (agentId: number, amount: string, buyerId: number, listingId:number, previousBidId?:number) => Promise<void>;
  getBidingListByBuyerIdAPI: (buyerId:number) => Promise<void>;
  updateBidStatusAPI: (biddingId:number, newBiddingStatus: string) => Promise<number>;
}

export const useBiddingStore = create<CreateBiddingState>((set) => ({
  createBiddingRequestForAPI: null, 
  createBiddingResponseFromAPI: null,
  listBidsResponseFromAPI: null,
  latestBidsResponseFromAPI: null,
  previousBidID: null,

  getBidingListByBuyerIdAPI: async(buyerId) => {
    console.log("biddingStore:getBidingListByBuyerIdAPI: buyerId=" + buyerId);    

    try {
      const currentLoginUser = await getCurrentLoginUser();
      if(currentLoginUser) {
        const response = await listBids(currentLoginUser.username);
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
        set({ createBiddingResponseFromAPI }); 
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
        return response; 
      }
      throw new Error("No response received from rejectBid");
    } catch (error) {
      console.error("Error rejecting bid:", error);
      throw error; 
    }
  },
  getLatestBidonListingAPI: async (ID) => {  
    try {
      const response = await getLatestBidOnListing(ID);
      if (response) {
        const latestBidsResponseFromAPI: LatestBidsResponseFromAPI = {
          ID: response.ID,
          AgentId: response.AgentID,
          Amount: response.Amount,
          BuyerId: response.BuyerID,
          ListingId: response.ListingID,
          PreviousBidId: response.PreviousBidID,
          Status: response.Status
        };
        set({ latestBidsResponseFromAPI });

        // Set the previousBidID
        set({ previousBidID: response.ID });
        console.log("biddingStore:PreviousBidID Set response= " + response.ID.toString());
        console.log("biddingStore:getLatestBidonListing response= " + JSON.stringify(response));
      }
    } catch (error) {
      console.error("Error getting latest bid:", error);
    }    
  }, 
  updateBidStatusAPI: async (biddingId, newBiddingStatus) => {
    try {
      const response = await updateBidStatus(biddingId, newBiddingStatus);
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