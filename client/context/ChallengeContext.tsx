import { createContext, useReducer, ReactNode, Dispatch, FC } from "react";

type InitialStateType = {
  modal: boolean;
  challenge: string;
};

export const ChallengeContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<any>;
}>({
  state: { modal: true, challenge: "" },
  dispatch: () => null,
});

export const challengeReducer = (state: any, action: any) => {
  switch (action.type) {
    case "OPEN_MODAL":
      console.log("here");
      return {
        ...state,
        modal: true,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: false,
      };
    case "NEW_CHALLENGE":
      return {
        ...state,
        challenge: action.payload,
      };
    case "CLEAR_CHALLENGE":
      return {
        modal: false,
        challenge: "",
      };
    default:
      return state;
  }
};
interface Props {
  children: ReactNode;
}
export const ChallengeContextProvider = (props: Props) => {
  const [state, dispatch] = useReducer(challengeReducer, {
    challenge: "",
    modal: false,
  });
  console.log(dispatch);
  return (
    <ChallengeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ChallengeContext.Provider>
  );
};
