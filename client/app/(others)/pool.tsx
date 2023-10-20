import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import PostModal from "../../components/PostModal";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/PostContext";
import { useContext, useEffect, useState } from "react";
import Colors from "../../constants/Colors";

export default function TabTwoScreen() {
  const { state, dispatch } = useContext(PostContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prize Pool - 0 MAT</Text>
      <Image
        source={require("../../assets/images/trophy.png")}
        style={{
          width: 200,
          height: 300,
        }}
        resizeMethod="scale"
        resizeMode="center"
      />
      <Text
        style={{
          fontFamily: "Poppins-b",
          fontSize: 18,
          width: "90%",
          textAlign: "center",
        }}
      >
        Prizes Distributed Every Sunday 11:59:59 PM
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Poppins-b",
    color: Colors.primary,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
