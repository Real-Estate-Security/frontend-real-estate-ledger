import axios from "../utils/axiosInstance";
import type { components } from "@/api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type Representation =
  components["schemas"]["server.RepresentationsWithNullableTime"];

export const requestRepresentation = async (
  username: string,
  startDate: Date,
  endDate?: Date
): Promise<string> => {
  const response = await axios.post<string>(
    `${API_BASE_URL}/agent/request-representation`,
    {
      client_username: username,
      start_date: startDate.toISOString(),
      end_date: endDate?.toISOString(),
    }
  );
  return response.data;
};

export const getRepresentations = async (): Promise<Representation[]> => {
  const response = await axios.get<Representation[]>(
    `${API_BASE_URL}/agent/representations`
  );
  return response.data;
};

export const acceptRepresentation = async (id: number): Promise<string> => {
  const response = await axios.post<string>(
    `${API_BASE_URL}/agent/accept-representation/${id}`
  );
  return response.data;
};

export const declineRepresentation = async (id: number): Promise<string> => {
  const response = await axios.post<string>(
    `${API_BASE_URL}/agent/decline-representation/${id}`
  );
  return response.data;
};
