import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
