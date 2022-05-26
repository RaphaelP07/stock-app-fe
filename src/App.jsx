import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wallet from "./components/Wallet";

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/stock-app-fe/login"
            element={
              <Login/>
            }
          />
          <Route
            path="/stock-app-fe/signup"
            element={
              <SignUp/>
            }
          />
          <Route
            path="/stock-app-fe/wallet"
            element={
              <Wallet/>
            }
          />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
