import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  FC,
  useEffect,
} from "react";
import { getPosts } from "../utils/nodeUtils";

interface Post {
  title: string;
  description: string;
  challengeDesc: string;
  createdAt: number;
  isApproved: boolean;
  points: number;
  treeId: string | undefined;
  userId: string;
  images: string[];
  likes: string[];
}

type InitialStateType = {
  modal: boolean;
  type: "random" | "current challenge" | "plant tree" | "water tree";
  posts: Post[] | [];
};

export const PostContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: { modal: true, posts: [], type: "random" },
  dispatch: () => null,
});

export const postReducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MODAL":
      //console.log("here");
      return {
        ...state,
        modal: true,
        type: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
        type: "random",
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "NEW_POST":
      //console.log(action.payload);
      return {
        ...state,
        posts: [action.payload.post, ...state.posts],
      };
    default:
      return state;
  }
};
interface Props {
  children: ReactNode;
}
export const PostContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(postReducer, {
    modal: false,
    posts: [],
    type: "random",
  });
  //console.log(dispatch);
  useEffect(() => {
    (async () => {
      const posts = await getPosts();
      //console.log(posts);
      dispatch({ type: "SET_POSTS", payload: posts });
    })();
  }, []);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};
