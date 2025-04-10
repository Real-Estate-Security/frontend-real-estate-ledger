import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type BiddingResponse = components["schemas"]["server.bidResponse"];
export type CreateBidRequest = components["schemas"]["server.createBidRequest"];
//export type ListBidsRequest = components["schemas"]["server.listBidsRequest"];
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
  buyerId: number,
  username: string
): Promise<ListBidResponse> => {
  console.log("biddingService:listBids: Buyer ID =" + buyerId)
  const response = await axios.post<ListBidResponse>(
    `${API_BASE_URL}/bidding/listBids`,
    {
      buyerId,
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