"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { request } from "@/src/utils/request";
import {
  AuthProps,
  AuthProviderProps,
  ProtectedPage,
  SetToken,
  User,
} from "./types";
import { authConstant, protectedPages } from "./const";
import { LoadingPage } from "@/src/components/loading";

export const AuthContext = createContext<AuthProps>({} as AuthProps);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!accessToken;

  const setToken: SetToken = (token) => {
    setAccessToken(token);
    if (token) {
      localStorage.setItem(authConstant.ACCESS_TOKEN, token);
    } else {
      localStorage.removeItem(authConstant.ACCESS_TOKEN);
    }
  };

  const setUserAndStore = (user: User | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem(authConstant.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(authConstant.USER);
    }
  };

  const isProtectedPage = useMemo(
    () =>
      protectedPages?.some((i: ProtectedPage) =>
        i?.type === "start" ? pathname?.startsWith(i?.url) : i?.url === pathname
      ),
    [pathname]
  );

  // Load token and user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(authConstant.ACCESS_TOKEN) || undefined;
    setAccessToken(token);

    const storedUser = localStorage.getItem(authConstant.USER);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
        setUser(null);
      }
    }

    setIsMounted(true);
  }, [searchParams]);

  // Attach token to all requests
  useEffect(() => {
    if (accessToken) {
      request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete request.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  // Redirect to login if not authenticated and on protected page
  useEffect(() => {
    if (isMounted && isProtectedPage && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isMounted, isProtectedPage, isAuthenticated, router]);

  if (!isMounted) return <LoadingPage />;
  if (isProtectedPage && !isAuthenticated) return <LoadingPage />;

  const value: AuthProps = {
    isAuthenticated,
    setToken,
    setUser: setUserAndStore, // replace original setUser with persistent version
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
