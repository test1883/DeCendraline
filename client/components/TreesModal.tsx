import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import { Modal, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { newChallenge as newChallengeDjango } from "../utils/djangoUtils";
import { useContext, useState } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import { newChallenge } from "../utils/nodeUtils";
import { useAuth } from "../context/AuthContext";
import { TreeContext } from "../context/TreeContext";
import { PostContext } from "../context/PostContext";

export default function TreesModal(props: any) {
  const windowHeight = Dimensions.get("window").height;
  const { user, setUser } = useAuth();
  const { state, dispatch } = useContext(TreeContext);
  const { dispatch: postDispatch } = useContext(PostContext);
  console.log(state.trees);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      // We use the state here to toggle visibility of Bottom Sheet
      visible={state.modal}
      // We pass our function as default function to close the Modal
      onRequestClose={() => dispatch({ type: "CLOSE_MODAL" })}
    >
      <Pressable
        onPress={(e) => {
          if (e.target === e.currentTarget) {
            dispatch({ type: "CLOSE_MODAL" });
          }
        }}
        style={styles.container}
      >
        {/* <View style={styles.container}> */}
        <View style={[styles.bottomSheet, { minHeight: windowHeight * 0.6 }]}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.primary,
              fontSize: 25,
              fontFamily: "Poppins-b",
            }}
          >
            Your Trees
          </Text>
          <ScrollView
            style={{
              borderWidth: 0.5,
              borderColor: Colors.primary,
              width: "100%",
              borderRadius: 20,
              padding: 20,
            }}
          >
            {state.trees.map((tree, index) => {
              return (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.primary + "80",
                      fontFamily: "Poppins-b",
                      fontSize: 12,
                    }}
                  >
                    {tree.name}
                  </Text>
                  {Date.now() - tree.lastWatered > 24 * 60 * 60 * 1000 ? (
                    <Text
                      style={{
                        color: "#e3242b",
                        fontFamily: "Poppins-b",
                        fontSize: 12,
                      }}
                    >
                      Needs Water
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#3cb043",
                        fontFamily: "Poppins-b",
                        fontSize: 12,
                      }}
                    >
                      Happy
                    </Text>
                  )}
                  <Pressable
                    style={{
                      padding: 7,
                      backgroundColor:
                        Date.now() - tree.lastWatered > 24 * 60 * 60 * 1000
                          ? Colors.primary
                          : "rgba(0,0,0, 0.1)",
                      borderRadius: 7,
                    }}
                    onPress={() => {
                      if (Date.now() - tree.lastWatered > 24 * 60 * 60 * 1000) {
                        postDispatch({
                          type: "OPEN_MODAL",
                          payload: "water tree",
                        });
                      }
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            Date.now() - tree.lastWatered < 24 * 60 * 60 * 1000
                              ? Colors.primary
                              : "white",
                          fontFamily: "Poppins-b",
                          fontSize: 12,
                        }}
                      >
                        Water{"   "}+10
                      </Text>
                      <Image
                        source={require("../assets/images/coin.png")}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />
                    </View>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/* </View> */}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.4)",
    position: "absolute",
    left: 0,
    top: 0,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    color: "white",
  },
});
