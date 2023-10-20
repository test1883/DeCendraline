import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { ChallengeContextProvider } from "../context/ChallengeContext";
import { AuthProvider } from "../context/AuthContext";
import { Text } from "react-native";
import { PostContextProvider } from "../context/PostContext";
import { TreeContextProvider } from "../context/TreeContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-b": require("../assets/fonts/Poppins-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ChallengeContextProvider>
          <TreeContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)/account"
                options={{ title: "Account" }}
              />
              <Stack.Screen
                name="(auth)/login"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(others)/trees" options={{ title: "" }} />
              <Stack.Screen name="(others)/pool" options={{ title: "" }} />
            </Stack>
          </TreeContextProvider>
        </ChallengeContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
}
