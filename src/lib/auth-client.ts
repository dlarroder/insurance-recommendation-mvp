import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp } = authClient;

export const useUser = () => {
  const session = useSession();
  return {
    data: session.data?.user,
    isLoading: session.isPending,
  };
};
