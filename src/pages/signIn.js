import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import './static/login.css';
import './static/background.css';

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'blue'
  };

function SignIn() {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const apiURL = "http://127.0.0.1:8000";

    const handleLogin = async(event) => {
        event.preventDefault();
        // console.log("yo");
        try{
            const response = await fetch(apiURL + "/signInBackend", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, passWord})
            }
            );
            // console.log("yoo");
            const data = await response.json();
            // console.log(Object.keys(data)[0]);

            if(Object.keys(data)[0] == "success"){
                alert(JSON.stringify(data["success"]));
                console.log("yoo");
                localStorage.setItem("signedIn", true);
                localStorage.setItem("currentUser",userName);
                window.location.href = "/profile";

            }
            else if(Object.keys(data)[0] == "300"){
                alert(JSON.stringify(data["300"]));
                console.log("yoo");

            }
            else{
                // window.location.href = "/signin";
                alert(JSON.stringify(data[0]));
                console.log("yoo");

            }
        }

        catch(error){
            console.error(error);
        }
    }

    return (
        <div className = "mainContainer"> 
        {/* <p> Sign in here, if not, press below to sign up</p>
            <Link to="/signUpAccount" style = {linkStyle}>Sign up</Link> */}

        <div className="login-form">
        
        <form onSubmit ={handleLogin}>
        <div className = "form-group">
        <p> Sign in here, if not, press below to sign up</p>
        <Link to="/signUpAccount" style = {linkStyle}>Sign up</Link>

        </div>

        <div className="form-group">
            <label>User name: </label> 
            <input type="text" value = {userName} onChange={(e) => setUserName(e.target.value)} id = ""/>
        </div>
        <div className="form-group">
            <label>Password: </label> 
            <input type="text" value = {passWord} onChange={(e) => setPassWord(e.target.value)} id = ""/>
        </div>
            
        <button type = "submit"> Sign in </button>

        </form>
        </div>
        </div>
        

     );
}

export default SignIn;