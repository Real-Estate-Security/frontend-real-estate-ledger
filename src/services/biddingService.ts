import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type BiddingResponse = components["schemas"]["server.bidResponse"];
export type CreateBidRequest = components["schemas"]["server.createBidRequest"];

// createBidding function
export const createBidding = async (
  agentId: number,
  amount: string,
  buyerId: number,
  listingId: number,
  previousBidId?: number
): Promise<BiddingResponse> => {
  // const createBidRequest: CreateBidRequest = {
  //   agent_id: agentId,
  //   amount: amount,
  //   buyer_id: buyerId,
  //   listing_id: listingId,
  //   previous_bid_id: undefined
  // };
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
