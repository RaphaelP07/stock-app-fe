import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  users: [],
  channels: [],
  messages: [],
  headers:
    localStorage.getItem("headers") === null
      ? {}
      : JSON.parse(localStorage.getItem("headers")),
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://localhost:3000";

  //Actions
  

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        channels: state.channels,
        headers: state.headers,
        messages: state.messages,
        baseURL: baseURL
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
