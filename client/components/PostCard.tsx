import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { userDetails } from "../utils/nodeUtils";
import Colors from "../constants/Colors";

export default function PostCard(props: {
  title: string;
  description: string;
  challengeDesc: string;
  createdAt: number;
  isApproved: boolean;
  points: number;
  treeId: string | undefined;
  userId: string;
  images: string[];
  likes: string[];
}) {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    (async () => {
      if (props.userId) {
        const res = await userDetails(null, props.userId);
        //console.log(props.images[0]);
        if (props.images[0].trim().length >= 0)
          await Image.prefetch(props.images[0]);

        setUser(res);
      }
    })();
  }, [props.userId]);
  return (
    <>
      {user ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={{
                flexDirection: "row",
                gap: 7,
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/user.png")}
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <View>
                <Text
                  style={{
                    fontFamily: "Poppins-b",
                    color: Colors.primary,
                  }}
                >
                  {user.userName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Poppins",
                  }}
                >
                  {props.title}
                </Text>
              </View>
            </View>
            <Text>{props.points}</Text>
          </View>
          {props.images[0].length >= 0 && (
            <Image
              source={{ uri: props.images[0] }}
              resizeMethod="scale"
              resizeMode="center"
              style={{
                height: 300,
                width: "100%",
              }}
            />
          )}
          {/* <Text>{props.images[0]}</Text> */}
          <View style={styles.separator} />
        </View>
      ) : (
        ""
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: 400,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 30,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomColor: "rgba(0,0,0,0.4)",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
