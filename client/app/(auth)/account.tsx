import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../constants/Colors";
import { newUser } from "../../utils/nodeUtils";
import { useAuth } from "../../context/AuthContext";

const Account = () => {
  const { user } = useAuth();
  const [username, onChangeUserName] = useState<string>("");
  const [about, onChangeAbout] = useState<string>("");
  useEffect(() => {
    if (user?.about) {
      onChangeAbout(user.about);
    }
    if (user?.userName) {
      onChangeUserName(user.userName);
    }
  }, [user]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await newUser(username, about, user?.address || "");
  };
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <Pressable
        onPress={(e) => {
          e.preventDefault();
          Keyboard.dismiss;
        }}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image
            source={require("../../assets/images/user.png")}
            style={{ width: 100, height: 100, borderRadius: 200 }}
          />
          <TextInput
            maxLength={10}
            onChangeText={(text) => onChangeUserName(text)}
            value={username}
            style={{
              padding: 10,
              borderWidth: 0.5,
              borderRadius: 10,
              width: "90%",
            }}
            placeholder="Set Username"
          />
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={100}
            onChangeText={(text) => onChangeAbout(text)}
            style={{
              padding: 10,
              borderWidth: 0.5,
              borderRadius: 10,
              width: "90%",
            }}
            value={about}
            placeholder="Set About"
          />
          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins", color: "white" }}>
              Save Changes
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "90%",
  },
  inner: {
    borderColor: Colors.primary,
    borderRadius: 20,
    borderWidth: 0.5,
    width: "90%",
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 20,
  },
});

export default Account;
