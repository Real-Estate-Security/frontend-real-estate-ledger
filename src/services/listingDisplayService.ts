import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type ListingDisplayResponse =
  components["schemas"]["server.listingDisplayResponse"] & {
    id: number;
    property_id: number;
  };

// Display Listing function
export const getListings = async (): Promise<ListingDisplayResponse[]> => {
  const response = await axios.get<ListingDisplayResponse[]>(
    `${API_BASE_URL}/listing`
  );
  return response.data;
};