import { create } from "zustand";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../auth/authService";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    const { token, user } = await loginApi(email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  register: async (name, email, password) => {
    const { token, user } = await registerApi(name, email, password);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token });
  },

  logout: () => {
    logoutApi();
    set({ user: null, token: null });
  },
}));
