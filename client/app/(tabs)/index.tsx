import { StyleSheet } from "react-native";

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

export default function TabOneScreen() {
  // This state would determine if the drawer sheet is visible or no
  return (
    <View style={styles.container}>
      <View style={styles.challenge}></View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View style={styles.totalTrees}></View>
        <View style={styles.yourTrees}></View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View style={styles.pool}></View>
        <View style={styles.points}></View>
      </View>
      <ChallengeModal />
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
    height: 200,
    width: "90%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  totalTrees: {
    height: 150,
    width: "40%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  yourTrees: {
    height: 150,
    width: "50%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  pool: {
    height: 120,
    width: "60%",
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  points: {
    height: 120,
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
