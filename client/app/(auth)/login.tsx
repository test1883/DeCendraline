// import {
//   ConnectWallet,
//   localWallet,
//   metamaskWallet,
//   rainbowWallet,
//   ThirdwebProvider,
// } from "@thirdweb-dev/react-native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
// import { TW_CLIENT_ID } from "@env";

const Login = () => {
  return (
    //   {// <ThirdwebProvider
    //   //   clientId={TW_CLIENT_ID} // uncomment this line after you set your clientId in the .env file
    //   //   activeChain="mumbai"
    //   //   supportedWallets={[metamaskWallet(), rainbowWallet(), localWallet()]}
    // // >}
    <AppInner />
    // </ThirdwebProvider>
  );
};

const AppInner = () => {
  const { user, setUser } = useAuth();
  const textStyles = {
    color: "#fff",
    ...styles.heading,
  };

  return (
    <View style={styles.view}>
      <Text style={textStyles}>React Native thirdweb starter</Text>
      <Pressable
        onPress={() => {
          setUser({
            address: "hahhha",
            userName: undefined,
            about: undefined,
            currentChallenge: undefined,
          });
        }}
      >
        <Text>Connect</Text>
      </Pressable>
      {/* <ConnectWallet /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Login;
