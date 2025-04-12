import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type ListingResponse = components["schemas"]["server.listingResponse"];

// getListingByPropertyID function
export const getListingByPropertyID = async (
  propertyID: number,
  username: string
): Promise<ListingResponse> => {

  const response = await axios.post<ListingResponse>(
    `${API_BASE_URL}/listing/getListingByPropertyID`,
    {
      propertyID,
      username,
    }
  );
  return response.data;
};
