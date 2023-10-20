import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PostModal from "../../components/PostModal";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/PostContext";
import { useContext, useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { useAuth } from "../../context/AuthContext";
import { getWinner } from "../../utils/nodeUtils";

export default function TabTwoScreen() {
  const { state, dispatch } = useContext(PostContext);
  const [winner, setWinner] = useState<boolean>(false);
  const [donation, setDonation] = useState<number>(0);
  const { user } = useAuth();
  useEffect(() => {
    (async () => {
      const u = await getWinner();
      if (u._id === user?.userId) setWinner(true);
    })();
  }, []);
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
      {winner ? (
        new Date().getDay() === 0 && (
          <>
            <Text
              style={{
                fontFamily: "Poppins-b",
                fontSize: 20,
                width: "90%",
                textAlign: "center",
              }}
            >
              You're on the top!
            </Text>
            <Pressable>
              <Text>Redeem Rewards</Text>
            </Pressable>
          </>
        )
      ) : (
        <Text
          style={{
            fontFamily: "Poppins-b",
            fontSize: 20,
            width: "90%",
            textAlign: "center",
          }}
        >
          You're on the top!
        </Text>
      )}
      <TextInput
        placeholder="In MATIC"
        placeholderTextColor="#60605e"
        value={`${donation}`}
        onChangeText={(t) => setDonation(parseInt(t))}
        keyboardType={"numeric"}
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
        style={{
          width: "90%",
          backgroundColor: Colors.primary,
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Poppins-b",
          }}
        >
          Donate (in MATIC)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
