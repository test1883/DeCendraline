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
import { PINATA } from "@env";

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
            style={{ padding: 10 }}
            placeholder="Set Username"
          />
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={100}
            onChangeText={(text) => onChangeAbout(text)}
            value={about}
            style={{ padding: 10 }}
            placeholder="Set About"
          />
          <Pressable onPress={handleSubmit}>
            <Text>Save Changes</Text>
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
  },
});

export default Account;
