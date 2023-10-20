import { ScrollView, StyleSheet, Text, View } from "react-native";
import PostModal from "../../components/PostModal";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../context/PostContext";
import { useContext } from "react";
import Colors from "../../constants/Colors";

export default function TabTwoScreen() {
  const { state, dispatch } = useContext(PostContext);

  return (
    <View>
      <Text style={styles.title}>Trees Planted</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
          paddingBottom: 100,
        }}
      >
        {state.posts
          ? state.posts
              .filter((post) => post.title === "Planted a tree")
              .map((post, index) => {
                return <PostCard {...post} key={index} />;
              })
          : ""}
      </ScrollView>
      <PostModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
