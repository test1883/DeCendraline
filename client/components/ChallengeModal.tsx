import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";

import { Modal, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { newChallenge } from "../utils/djangoUtils";
import { useContext, useState } from "react";
import { ChallengeContext } from "../context/ChallengeContext";

export default function ChallengeModal(props: any) {
  const windowHeight = Dimensions.get("window").height;
  const { state, dispatch } = useContext(ChallengeContext);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      // We use the state here to toggle visibility of Bottom Sheet
      visible={state.modal}
      // We pass our function as default function to close the Modal
      onRequestClose={() => dispatch({ type: "CLOSE_MODAL" })}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.6 }]}>
        <TouchableOpacity onPress={() => dispatch({ type: "CLOSE_MODAL" })}>
          <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            name="close"
            color={"grey"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const res = await newChallenge(10, "explore", "easy", "delhi");
            console.log(res);
            dispatch({
              type: "NEW_CHALLENGE",
              payload: res.message.message,
            });
          }}
        >
          <Text>New Challenge</Text>
        </TouchableOpacity>
        <Text>{state.challenge}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    color: "white",
  },
});
