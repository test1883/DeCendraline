import { useSegments, useRouter, useRootNavigationState } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "../utils/nodeUtils";

type User = {
  userName: string | undefined;
  about: string | undefined;
  address: string | undefined;
  currentChallenge:
    | {
        challengeType: "indoor" | "outdoor" | "exploration" | undefined;
        duration: number | undefined;
        difficulty:
          | "very easy"
          | "easy"
          | "medium"
          | "hard"
          | "very hard"
          | "extreme"
          | undefined;
        acceptedAt: number | undefined;
        place: string | undefined;
      }
    | undefined;
};

type AuthType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

function useProtectedRoute(user: User | null, setUser: any) {
  const segments = useSegments();
  const router = useRouter();
  const s = useRootNavigationState();

  useEffect(() => {
    console.log(s);
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      console.log("here");
      if (s !== undefined) {
        if (s.stale === false) {
          console.log(s);
          router.replace("/login");
        }
      }
    } else if (user && inAuthGroup) {
      (async function () {
        console.log("hhhhhh");
        if (!user.userName) {
          const res = await userDetails(user.address!);
          if (res === null) {
            router.replace("/account");
          } else {
            setUser({
              address: user.address,
              userName: res.userName,
              about: res.about,
              currentChallenge: res.currentChallenge,
            });
            router.replace("/");
          }
        }
      })();
    }
  }, [user, segments, s]);
}

export function AuthProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  useProtectedRoute(user, setUser);

  const authContext: AuthType = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
