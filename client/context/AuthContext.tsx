import { useSegments, useRouter, useRootNavigationState } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { userDetails } from "../utils/nodeUtils";

type User = {
  userId: string | undefined;
  points: number | undefined;
  userName: string | undefined;
  about: string | undefined;
  address: string | undefined;
  currentChallenge:
    | {
        challengeType: "indoor" | "outdoor" | "explore";
        duration: number;
        difficulty:
          | "very easy"
          | "easy"
          | "medium"
          | "hard"
          | "very hard"
          | "extreme";
        acceptedAt: number;
        place: string | undefined;
        description: string;
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
    //console.log(s);
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      //console.log(inAuthGroup);
      //console.log("here");
      //@ts-ignore
      if (s?.stale === false) {
        //console.log(s);
        router.replace("/login");
      }
    } else if (user && inAuthGroup && segments[1] !== "account") {
      (async function () {
        //console.log(segments);
        //console.log("hhhhhh");
        if (!user.userName) {
          const res = await userDetails(user.address!, null);
          if (res === null) {
            router.replace("/account");
          } else {
            setUser({
              userId: res._id,
              points: res.points,
              address: user.address,
              userName: res.userName,
              about: res.about,
              currentChallenge: res.currentChallenge,
            });
            router.replace("/");
          }
        }
      })();
    } else if (user?.userName && segments[0] === "auth") {
      router.replace("/");
    }
  }, [user, segments, s?.stale]);
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
