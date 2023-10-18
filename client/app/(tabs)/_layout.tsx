import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable, View, Image, Text } from "react-native";

import { ChallengeContext } from "../../context/ChallengeContext";
import { useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Svg } from "react-native-svg";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function AddModalComponent() {
  return null;
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size: number;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { dispatch } = useContext(ChallengeContext);
  const { user } = useAuth();
  useEffect(() => {
    if (user?.address !== undefined && user?.userName === undefined) {
      router.replace("/account");
    }
  });
  return (
    <Tabs
      safeAreaInsets={{
        bottom: 12,
      }}
      screenOptions={{
        title: "",
        tabBarActiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          width: "80%",
          marginTop: 0,
          marginBottom: 20,
          borderRadius: 20,
          marginRight: "auto",
          marginLeft: "auto",
          padding: 15,
          backgroundColor: Colors.primary,
        },
        // tabBarBackground: () => {
        //   return (
        //     <LinearGradient
        //       colors={[Colors.primary]}
        //       locations={[1]}
        //       style={{
        //         height: "100%",
        //         borderRadius: 20,
        //       }}
        //     />
        //   );
        // },
        headerShown: true,
        headerLeft: () => (
          <Image
            source={require("../../assets/images/DeCendraline.png")}
            style={{
              transform: [{ scale: 0.9 }],
            }}
          />
        ),
        headerRight: () => (
          <Link href="(auth)/account" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="user"
                  size={25}
                  color={Colors.primary}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "",
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color }) => (
            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 100,
                height: 45,
                width: 45,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={(e) => {
                e.preventDefault();
                dispatch({ type: "OPEN_MODAL" });
              }}
            >
              <Text>
                <TabBarIcon name="plus" color={Colors.primary} size={20} />;
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
