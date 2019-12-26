import React, { useReducer } from "react";

export const CTX = React.createContext();

const initialState = {
  msgs: [],
  notifs: [],
  addedMsg: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MESSAGES":
      return {
        ...state,
        msgs: action.payload
      };
    case "LOAD_NOTIFICATIONS":
      return {
        ...state,
        notifs: action.payload
      };
    case "UPDATE_MESSAGE_INPUT":
      return {
        ...state,
        addedMsg: action.payload
      };

    default:
      throw Error("Reducer error");
  }
};

export default function Store(props) {
  const stateHook = useReducer(reducer, initialState);
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
