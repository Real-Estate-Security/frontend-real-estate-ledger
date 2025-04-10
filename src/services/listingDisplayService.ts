import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type ListingDisplayResponse = components["schemas"]["server.listingDisplayResponse"];

// Display Listing function
export const listing = async (): Promise<ListingDisplayResponse> => {
    const response = await axios.get<ListingDisplayResponse[](
      `${API_BASE_URL}/listing`
    );
    return response.data;
  };


//   export const getRepresentations = async (): Promise<Representation[]> => {
//     const response = await axios.get<Representation[]>(
//       `${API_BASE_URL}/agent/representation`
//     );
//     return response.data;
//   };