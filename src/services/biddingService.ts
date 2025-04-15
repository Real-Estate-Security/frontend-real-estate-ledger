import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type BiddingResponse = components["schemas"]["server.bidResponse"];
export type CreateBidRequest = components["schemas"]["server.createBidRequest"];
export type listLatestBidOnListing = components["schemas"]["server.listBidResponse"];
export type ListBidResponse = components["schemas"]["server.listBidResponse"];

// createBidding function
export const createBidding = async (
  agentId: number,
  amount: string,
  buyerId: number,
  listingId: number,
  previousBidId?: number
): Promise<BiddingResponse> => {
  console.log("biddingService:createBid: createBiddingRequest=" + JSON.stringify(listingId))
  const response = await axios.post<BiddingResponse>(
    `${API_BASE_URL}/bidding/createBid`,
    {
      listingId, 
      buyerId,
      agentId,
      amount,
      previousBidId
    }
  );
  return response.data;
};

// listBids function
export const listBids = async (
  username: string
): Promise<ListBidResponse> => {
  console.log("biddingService:listBids: username =" + username)
  const response = await axios.post<ListBidResponse>(
    `${API_BASE_URL}/bidding/listBids`,
    {
      username
    }
  );
  return response.data;
};

// rejectBid function
export const rejectBid = async (
  ID: number
): Promise<number> => {
  console.log("biddingService:listBids: Bid ID =" + ID)
  const response = await axios.put<number>(
    `${API_BASE_URL}/bidding/rejectBid`,
    {
      ID,
    }
  );
  return response.data;
};

// getLatestBidOnListing function
export const getLatestBidOnListing = async (
  ListingID: number
): Promise<listLatestBidOnListing> => {
  console.log("biddingService:getLatestBidOnListing: Listing ID =" + ListingID)
  const response = await axios.post<listLatestBidOnListing>(
    `${API_BASE_URL}/bidding/listLatestBidOnListing`,
    {
      ListingID
    }
  );
  console.log("biddingService:getLatestBidOnListing: response.data=" + JSON.stringify(response.data))
  return response.data;
};

// updateBidStatus function
export const updateBidStatus = async (
  BidID: number,
  ListingID: number,
  NewStatus: string
): Promise<number> => {
  console.log("biddingService:updateBidStatus: Bid ID =" + BidID + ", newStatus=" + NewStatus)
  const response = await axios.post<number>(
    `${API_BASE_URL}/bidding/updateBidStatus`,
    {
      BidID,
      ListingID,
      NewStatus
    }
  );
  console.log("biddingService:createBid: response.data=" + JSON.stringify(response.data))
  return response.data;
};