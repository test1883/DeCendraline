import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  FC,
  useEffect,
} from "react";
import { getTrees } from "../utils/nodeUtils";
import { useAuth } from "./AuthContext";
interface Tree {
  _id: string;
  name: string;
  plantedAt: number;
  lastWatered: number;
  plantedBy: string;
}
type InitialStateType = {
  modal: boolean;
  trees: Tree[] | [];
};

export const TreeContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: { modal: true, trees: [] },
  dispatch: () => null,
});

export const treeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MODAL":
      //console.log("here");
      return {
        ...state,
        modal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "SET_TREES":
      return {
        ...state,
        trees: action.payload,
      };
    case "WATER_TREE":
      const tmp = state.trees;
      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i]._id === action.payload) {
          tmp[i].lastWatered = Date.now();
        }
      }
      return {
        ...state,
        trees: tmp,
      };
    case "NEW_TREE":
      return {
        ...state,
        trees: [action.payload, ...state.trees],
      };
    default:
      return state;
  }
};
interface Props {
  children: ReactNode;
}
export const TreeContextProvider = (props: Props) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(treeReducer, {
    modal: false,
    trees: [],
  });
  useEffect(() => {
    (async () => {
      const res = await getTrees(user?.userId || "");
      if (!res.error) {
        dispatch({
          type: "SET_TREES",
          payload: res,
        });
        console.log("in tree");
        console.log(res);
      }
    })();
  }, [user]);
  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TreeContext.Provider>
  );
};
