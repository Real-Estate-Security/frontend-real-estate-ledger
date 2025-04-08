import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8080";

export type ListingDisplayResponse = components["schemas"]["server.createListingDisplayRequest"];

// Display Listing function
export const listing = async (
    agentfirstName: string,
    agentlastName: string,
    agentEmail: string,
    address: string,
    description: string,
    bathrooms: number,
    bedrooms: number,
    price: number,
    listing_status: string,
    listing_date: Date,


  ): Promise<ListingDisplayResponse> => {
    const response = await axios.post<ListingDisplayResponse>(
      `${API_BASE_URL}/listing`,
      {
        agentfirstName,
        agentlastName,
        agentEmail,
        address,
        description,
        bathrooms,
        bedrooms,
        price,
        listing_status,
        listing_date
      }
    );
    return response.data;
  };