import { Pressable, StyleSheet } from "react-native";

import {
  Image,
  Modal,
  Button,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import ChallengeModal from "../../components/ChallengeModal";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ChallengeContext } from "../../context/ChallengeContext";
import PostModal from "../../components/PostModal";
import { PostContext } from "../../context/PostContext";
import { Link } from "expo-router";
import TreesModal from "../../components/TreesModal";
import { TreeContext } from "../../context/TreeContext";

export default function TabOneScreen() {
  const { user, setUser } = useAuth();
  const { dispatch } = useContext(ChallengeContext);
  const { state: posts, dispatch: postDispatch } = useContext(PostContext);
  const { state: trees, dispatch: treeDispatch } = useContext(TreeContext);
  const [timer, setTimer] = useState<string>("");
  // This state would determine if the drawer sheet is visible or no
  useEffect(() => {
    if (user?.currentChallenge) {
      let time =
        user.currentChallenge.duration * 3600000 +
        user.currentChallenge.acceptedAt -
        Date.now();
      if (time <= 0) {
        setUser({ ...user, currentChallenge: undefined });
      }
      const interval = setInterval(() => {
        let milli = time;
        let seconds = Math.floor((milli / 1000) % 60);
        let minutes = Math.floor((milli / (60 * 1000)) % 60);
        let hours = Math.floor((milli / (60 * 60 * 1000)) % 24);

        setTimer(hours + ":" + minutes + ":" + seconds);
        time -= 1000;
        if (time <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <Pressable
        onPress={(e) => {
          e.preventDefault();
          if (user?.currentChallenge) {
            postDispatch({ type: "OPEN_MODAL", payload: "current challenge" });
          } else {
            dispatch({ type: "OPEN_MODAL" });
          }
        }}
        style={styles.challenge}
      >
        <View>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              textAlign: "left",
              fontFamily: "Poppins-b",
            }}
          >
            {user?.currentChallenge?.description
              ? "Current Challenge"
              : "New Challenge"}
          </Text>
          {user?.currentChallenge && (
            <View>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "Poppins-b",
                  fontSize: 30,
                }}
              >
                {timer}
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  width: "70%",
                  fontFamily: "Poppins",
                  fontSize: 13,
                }}
              >
                {user.currentChallenge.description.substring(0, 60) + "..."}
              </Text>
            </View>
          )}
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              width: "50%",
              fontFamily: "Poppins",
              fontSize: 13,
            }}
          >
            {!user?.currentChallenge &&
              "Embark on thrilling adventures using our AI"}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Link href="(others)/trees" asChild>
          <Pressable style={styles.totalTrees}>
            <View>
              <Text
                style={{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Poppins-b",
                  fontSize: 20,
                }}
              >
                Trees Planted
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  textAlign: "left",
                  fontFamily: "Poppins-b",
                }}
              >
                {
                  posts?.posts?.filter(
                    (post) => post.title === "Planted a tree"
                  ).length
                }
              </Text>
            </View>
          </Pressable>
        </Link>
        <Pressable
          style={styles.yourTrees}
          onPress={() => {
            treeDispatch({ type: "OPEN_MODAL" });
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                textAlign: "left",
                fontFamily: "Poppins-b",
              }}
            >
              Your Trees -{"> "}
              {
                posts?.posts?.filter(
                  (post) =>
                    post.title === "Planted a tree" &&
                    post.userId === user?.userId
                ).length
              }
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontFamily: "Poppins",
                fontSize: 15,
              }}
            >
              Water your trees daily to earn rewards!
            </Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Link href="(others)/pool" asChild>
          <Pressable style={styles.pool}>
            <View>
              <Text
                style={{
                  color: "rgb(255, 255, 255)",
                  fontFamily: "Poppins-b",
                  fontSize: 20,
                }}
              >
                Current Prize Pool
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 27,
                  textAlign: "left",
                  fontFamily: "Poppins-b",
                }}
              >
                0 MAT
              </Text>
            </View>
          </Pressable>
        </Link>

        <Pressable style={styles.points}>
          <View>
            <Text
              style={{
                color: "rgb(255, 255, 255)",
                fontFamily: "Poppins-b",
                fontSize: 20,
              }}
            >
              Your Points
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 27,
                textAlign: "left",
                fontFamily: "Poppins-b",
              }}
            >
              {user?.points}
            </Text>
          </View>
        </Pressable>
      </View>
      <ChallengeModal />
      <PostModal />
      <TreesModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  challenge: {
    padding: 20,
    height: 200,
    width: "90%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  totalTrees: {
    padding: 20,
    height: 150,
    width: "40%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  yourTrees: {
    padding: 20,
    height: 150,
    width: "50%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  pool: {
    padding: 20,
    height: 140,
    width: "60%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  points: {
    alignItems: "center",
    justifyContent: "center",
    height: 140,
    width: "30%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "red",
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
