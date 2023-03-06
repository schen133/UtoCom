import './static/App.css';
import { useState, useEffect } from "react";
import Navbar from './components/Navbar/nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./pages/mainCom.js";
import Event from "./pages/eventCom.js";
import User from "./pages/userCom.js";
import SignIn from "./pages/signIn.js";
import SignUp from "./pages/signUp.js";

// if signed in, return component of user
function App() {
  //auto false: Not signedIn yet
  const [signedIn] = useState(
    localStorage.getItem("signedIn") === "true" // retrieve the login status from localStorage
  );

  const [currentUser] = useState(
    localStorage.getItem("currentUser") === ""
  );

// Components organizer
// Depends on the route it is currently on, it will return a certain 
// React component (element)
  return (
    <div className="App">
    <Router>
      <Navbar signedIn = {signedIn}/>
      <Routes>
          <Route path="/" element ={<Main />} />
          <Route path="/events" element={<Event />} />
          <Route path="/profile" element={<User />} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/signUpAccount" element={<SignUp/>} />
      </Routes>
      </Router>
    </div>

);
}
export default App;
      // <p>Below is testing button </p><button onClick={getData}>Testing</button>
