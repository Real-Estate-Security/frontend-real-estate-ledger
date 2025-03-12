import { create } from "zustand";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../services/authService";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "agent";
  dob: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string,
    role: "user" | "agent",
    dateOfBirth: Date
  ) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,

  login: async (username, password) => {
    const response = await loginApi(username, password);
    if (response.access_token && response.user) {
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      set({ user: response.user, token: response.access_token });
    }
  },

  register: async (
    firstName,
    lastName,
    email,
    password,
    username,
    role,
    dateOfBirth
  ) => {
    await registerApi(
      firstName,
      lastName,
      email,
      password,
      username,
      role,
      dateOfBirth
    );
    // After successful registration, we need to login to get the token
    const loginResponse = await loginApi(username, password);
    if (loginResponse.access_token && loginResponse.user) {
      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("user", JSON.stringify(loginResponse.user));
      set({ user: loginResponse.user, token: loginResponse.access_token });
    }
  },

  logout: () => {
    logoutApi();
    set({ user: null, token: null });
  },
}));
