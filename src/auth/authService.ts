import axios from "../utils/axiosInstance";

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

// Login function
export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

// Register function
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/auth/register", {
    name,
    email,
    password,
  });
  return response.data;
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
