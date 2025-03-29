import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8080";

export type PropertyResponse = components["schemas"]["server.propertyResponse"];

// getPriorityByID function
export const getPriorityByID = async (
  propertyID: number,
  username: string
): Promise<PropertyResponse> => {

  const response = await axios.post<PropertyResponse>(
    `${API_BASE_URL}/property/getPriorityByID`,
    {
      propertyID,
      username,
    }
  );
  return response.data;
};
