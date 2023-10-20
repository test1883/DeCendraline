import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Modal, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { newChallenge as newChallengeDjango } from "../utils/djangoUtils";
import { useContext, useState } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import { newChallenge } from "../utils/nodeUtils";
import { useAuth } from "../context/AuthContext";

export default function ChallengeModal(props: any) {
  const windowHeight = Dimensions.get("window").height;
  const { user, setUser } = useAuth();
  const [duration, setDuration] = useState<number>(24);
  const [durationN, setDurationN] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<
    "very easy" | "easy" | "medium" | "hard" | "very hard" | "extreme"
  >("very easy");
  const [type, setType] = useState<"indoor" | "outdoor" | "explore">("indoor");
  const [place, setPlace] = useState<string>("");
  const { state, dispatch } = useContext(ChallengeContext);
  const [challengeMsg, setChallengeMsg] = useState<string>("");

  const generateChallenge = async () => {
    const res = await newChallengeDjango(
      durationN * duration,
      type,
      difficulty,
      place
    );
    setChallengeMsg(res);
  };
  const acceptChallenge = async () => {
    const challenge = {
      challengeType: type,
      duration: durationN * duration,
      difficulty,
      place,
      acceptedAt: Date.now(),
      description: challengeMsg,
    };
    const done = await newChallenge(user?.userId || "", challenge);
    if (done) {
      setUser({
        userId: user?.userId || "",
        points: user?.points || 0,
        userName: user?.userName || "",
        about: user?.about || "",
        address: user?.address,
        currentChallenge: challenge,
      });
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

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
            New Challenge
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: "auto",
            }}
          >
            <TextInput
              placeholder="Duration"
              placeholderTextColor="#60605e"
              keyboardType={"numeric"}
              value={`${durationN}`}
              onChangeText={(t) => {
                if (!Number.isNaN(parseInt(t))) {
                  setDurationN(parseInt(t));
                } else {
                  setDurationN(1);
                }
              }}
              style={{
                borderColor: Colors.primary,
                borderWidth: 0.5,
                borderRadius: 10,
                padding: 10,
                height: 50,
                fontFamily: "Poppins",
              }}
            />
            <View
              style={{
                width: "70%",
                borderColor: Colors.primary,
                borderWidth: 0.5,
                borderRadius: 10,
                padding: 10,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Picker
                selectedValue={duration}
                onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
                style={{ width: "100%" }}
              >
                <Picker.Item label="Hours" value={1} />
                <Picker.Item label="Days" value={24} />
                <Picker.Item label="Weeks" value={168} />
              </Picker>
            </View>
          </View>
          <View
            style={{
              width: "90%",
              borderColor: Colors.primary,
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Picker
              selectedValue={difficulty}
              onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
              style={{ width: "100%" }}
              placeholder="Select difficulty level"
            >
              <Picker.Item label="Very Easy" value="very easy" />
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
              <Picker.Item label="Very Hard" value="very hard" />
              <Picker.Item label="Extreme" value="extreme" />
            </Picker>
          </View>
          <View
            style={{
              width: "90%",
              borderColor: Colors.primary,
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Picker
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
              style={{ width: "100%" }}
              placeholder="Select type"
            >
              <Picker.Item label="Indoor" value="indoor" />
              <Picker.Item label="Outdoor" value="outdoor" />
              <Picker.Item label="Exploration" value="explore" />
            </Picker>
          </View>

          <TextInput
            placeholder="Enter the city/state/country/continent name"
            placeholderTextColor="#60605e"
            keyboardType={"numeric"}
            value={place}
            onChangeText={(t) => setPlace(t)}
            style={{
              borderColor: Colors.primary,
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
              height: 50,
              fontFamily: "Poppins",
              width: "90%",
              marginTop: 20,
            }}
          />
          <Pressable
            onPress={generateChallenge}
            style={{
              padding: 10,
              backgroundColor: Colors.primary,
            }}
          >
            <Text style={{ fontFamily: "Poppins" }}>New Challenge</Text>
          </Pressable>
          {challengeMsg.length > 0 ? (
            <View>
              <Text>{challengeMsg}</Text>
              <Pressable onPress={generateChallenge}>
                <Text>Retry</Text>
              </Pressable>
              <Pressable onPress={acceptChallenge}>
                <Text>Accept</Text>
              </Pressable>
            </View>
          ) : (
            ""
          )}
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
