import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { Modal, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { newChallenge as newChallengeDjango } from "../utils/djangoUtils";
import { useContext, useEffect, useState } from "react";
import { ChallengeContext } from "../context/ChallengeContext";
import { Picker } from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import { newChallenge, newPost, newTree, waterTree } from "../utils/nodeUtils";
import { useAuth } from "../context/AuthContext";
import { PostContext } from "../context/PostContext";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../utils/uploadUtils";
import { router } from "expo-router";
import { TreeContext } from "../context/TreeContext";

export default function PostModal(props: any) {
  const windowHeight = Dimensions.get("window").height;
  const { user, setUser } = useAuth();
  const { state, dispatch } = useContext(PostContext);
  const { state: trees, dispatch: treeDispatch } = useContext(TreeContext);
  const [title, setTitle] = useState<string>("");
  const [tree, setTree] = useState<any>("");
  const [treeName, setTreeName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [postType, setPostType] = useState<
    "random" | "plant tree" | "water tree" | "current challenge"
  >("random");
  useEffect(() => {
    //console.log("here");
    //console.log(state.type);
    setPostType(state.type);
  }, [state.modal]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const addPost = async () => {
    const url = await uploadImage(image);
    //console.log(url);
    const post = {
      title:
        postType === "current challenge"
          ? "Challenge Progress"
          : postType === "random"
          ? "Feeling Good"
          : postType === "plant tree"
          ? "Planted a tree"
          : "Watered a tree",
      description,
      challengeDesc:
        postType === "current challenge"
          ? user?.currentChallenge?.description
          : undefined,
      createdAt: Date.now(),
      isApproved: true,
      points: 0,
      userId: user?.userId,
      images: [url],
      treeId: undefined,
      likes: [],
    };
    if (postType === "plant tree") {
      const tree = {
        name: treeName,
        plantedAt: Date.now(),
        lastWatered: Date.now(),
        plantedBy: user?.userId || "",
      };
      const r = await newTree(tree);
      if (r) {
        treeDispatch({
          type: "NEW_TREE",
          payload: { ...tree, _id: r },
        });
        post.treeId = r;
      }
    } else if (postType === "water tree") {
      const r = await waterTree(tree);
      if (r) {
        treeDispatch({
          type: "WATER_TREE",
          payload: tree,
        });
        post.treeId = tree;
      }
    }
    const done = await newPost(post);
    if (done) {
      dispatch({
        type: "NEW_POST",
        payload: {
          post,
        },
      });
      dispatch({
        type: "CLOSE_MODAL",
      });
      router.replace("/discover");
      setTitle("");
      setDescription("");
      setPostType("random");
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
        <View style={[styles.bottomSheet, { minHeight: windowHeight * 0.6 }]}>
          <Text
            style={{
              textAlign: "center",
              color: Colors.primary,
              fontSize: 25,
              fontFamily: "Poppins-b",
            }}
          >
            New Post
          </Text>
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
              selectedValue={postType}
              onValueChange={(itemValue, itemIndex) => setPostType(itemValue)}
              style={{ width: "100%" }}
              placeholder="Select Post Type"
            >
              <Picker.Item label="Random" color="black" value="random" />
              <Picker.Item label="Plant Tree" value="plant tree" />
              <Picker.Item label="Water Your Tree" value="water tree" />
              <Picker.Item
                enabled={user?.currentChallenge !== undefined}
                color={user?.currentChallenge === undefined ? "grey" : "black"}
                label="Current Challenge"
                value="current challenge"
              />
            </Picker>
          </View>
          {postType === "water tree" && (
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
                selectedValue={tree}
                onValueChange={(itemValue, itemIndex) => setTree(itemValue)}
                style={{ width: "100%" }}
                placeholder="Select Tree"
              >
                {trees.trees.map((tree, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={tree.name}
                      color={
                        Date.now() - tree.lastWatered > 24 * 60 * 60 * 1000
                          ? "black"
                          : "grey"
                      }
                      value={tree._id}
                      enabled={
                        Date.now() - tree.lastWatered > 24 * 60 * 60 * 1000
                      }
                    />
                  );
                })}
              </Picker>
            </View>
          )}
          {postType === "current challenge" && (
            <Pressable
              onPress={() => setExpand(!expand)}
              style={{
                width: "90%",
                marginTop: 20,
                borderColor: Colors.primary,
                borderWidth: 0.5,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "rgba(0,0,0,0.4)",
                  fontFamily: "Poppins",
                  width: "100%",
                }}
              >
                {expand
                  ? user?.currentChallenge?.description
                  : user?.currentChallenge?.description.substring(0, 60) +
                    "..."}
              </Text>
            </Pressable>
          )}
          {postType === "plant tree" && (
            <TextInput
              placeholder="Tree Name"
              placeholderTextColor="#60605e"
              value={treeName}
              onChangeText={(t) => setTreeName(t)}
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
          )}
          <TextInput
            placeholder="Post Title"
            placeholderTextColor="#60605e"
            value={
              postType === "current challenge"
                ? "Challenge Progress"
                : postType === "random"
                ? "Feeling Good"
                : postType === "plant tree"
                ? "Planted a tree"
                : "Watered a tree"
            }
            editable={false}
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
          <TextInput
            placeholder="Post Description"
            placeholderTextColor="#60605e"
            value={description}
            onChangeText={(t) => setDescription(t)}
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
            onPress={pickImage}
            style={{
              borderColor: Colors.primary,
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
              width: "90%",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins",
              }}
            >
              Add Image
            </Text>
          </Pressable>
          <Pressable
            onPress={addPost}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              padding: 10,
              width: "90%",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Poppins-b",
                color: "#fff",
              }}
            >
              Add Post
            </Text>
          </Pressable>
        </View>
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
