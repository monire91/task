import { ProtectedPage } from "./types"


export const authConstant = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  USER: "AUTH_USER",
} as const;

export const protectedPages: ProtectedPage[] = [
  {
    url: '/',
    type: 'exact',
  },
  {
    url: '/dashboard',
    type: 'start',
  },
]
