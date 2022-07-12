import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  token:
    localStorage.getItem("headers") === null
      ? ''
      : JSON.parse(localStorage.getItem("token")),
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "https://raphdev-stock-app-api.herokuapp.com";

  //Actions
  function setToken(token) {
    dispatch({
      type: "SET_TOKEN",
      payload: token,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        stocks: state.stocks,
        wallet: state.wallet,
        token: state.token,
        portfolio: state.portfolio,
        baseURL: baseURL,
        setToken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
