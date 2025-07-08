import { ReactNode } from "react";

export type ProtectedPage = { url: string; type: "start" | "exact" };

export type SetToken = (arg0: string) => void;
export interface User {
  firstName: string;
  lastName: string;
  id: string;
}
export type AuthProps = {
  isAuthenticated: boolean;
  setToken: SetToken;
  accessToken?: string;
  user: User | null;
  setUser: (user: User | null) => void;
};

export type AuthProviderProps = {
  children?: ReactNode;
  accessToken?: string;
};
