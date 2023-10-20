import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, router } from "expo-router";
import { Pressable, View, Image, Text } from "react-native";

import { useContext, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";
import { PostContext } from "../../context/PostContext";

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
  const { dispatch } = useContext(PostContext);
  const { user } = useAuth();
  useEffect(() => {
    //console.log("here");
    if (user?.address !== undefined && user?.userName === undefined) {
      router.replace("/account");
    }
  }, [user]);
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
          // <View
          //   style={{
          //     width: 100,
          //     height: 100,
          //   }}
          // >
          <Link href="(auth)/account" asChild>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 7,
                      borderWidth: 0.5,
                      borderRadius: 100,
                      padding: 5,
                      borderColor: Colors.primary,
                    }}
                  >
                    <Image
                      source={require("../../assets/images/coin.png")}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Poppins-b",
                        fontSize: 10,
                        color: Colors.primary,
                      }}
                    >
                      {user?.points}
                    </Text>
                  </View>
                  <FontAwesome
                    name="user"
                    size={25}
                    color={Colors.primary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                </View>
              )}
            </Pressable>
          </Link>
          // </View>
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
                dispatch({ type: "OPEN_MODAL", payload: "random" });
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
