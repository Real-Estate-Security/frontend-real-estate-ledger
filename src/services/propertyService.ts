import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type PropertyResponse = components["schemas"]["server.propertyResponse"];

// getPropertyByID function
export const getPropertyByID = async (
  propertyID: number,
  username: string
): Promise<PropertyResponse> => {

  const response = await axios.post<PropertyResponse>(
    `${API_BASE_URL}/property/getPropertyByID`,
    {
      propertyID,
      username,
    }
  );
  return response.data;
};
