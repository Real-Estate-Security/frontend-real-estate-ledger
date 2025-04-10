import axios from "../utils/axiosInstance";
import { components } from "../api/types/api-types";

const API_BASE_URL = "http://localhost:8000";

export type LoginResponse = components["schemas"]["server.loginUserResponse"];
export type UserResponse = components["schemas"]["server.userResponse"];

// Login function
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_BASE_URL}/user/login`,
    {
      username,
      password,
    }
  );
  return response.data;
};

// Register function
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string,
  role: "user" | "agent",
  dateOfBirth: Date
): Promise<UserResponse> => {
  const response = await axios.post<UserResponse>(
    `${API_BASE_URL}/user/signup`,
    {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      username,
      role,
      dob: dateOfBirth.toISOString(),
    }
  );
  return response.data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
