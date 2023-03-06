import React from 'react';
import { useState } from "react";
import './static/login.css';
import './static/background.css';

function SignUp() {
    const[userName, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[firstname, setFirstname] = useState("");

    const apiURL = "http://127.0.0.1:8000";

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await fetch(apiURL + '/signUpBackend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password, firstname })
            });

            const data = await response.json();
            // console.log(Object.keys(data)[0]);

            if(Object.keys(data)[0] == "409"){
                alert(JSON.stringify(data["409"]));
            }
            else if(Object.keys(data)[0] == "408"){
                alert(JSON.stringify(data["408"]));
            }
            else{
            // successfully imported user, bring back to sign in page
                window.location.href = "/signin";
            }
            
        } catch (error){
            // console.error(error);
            console.log("erorr, something is wrong");
        }
    };

    return ( 
        <>
        <div className = "mainContainer">
        <div className = "login-form">
        <form onSubmit={handleSubmit}>
        <p>Welcome new RocStar!</p>
            <div className = "form-group">
            <label> User name: </label> 
            <input type="text" value = {userName} onChange={(e) => setUserName(e.target.value)} id = ""/>
            </div>
            <div className = "form-group">
            <label> First name: </label> 
            <input type="text" value = {firstname} onChange={(e) => setFirstname(e.target.value)} id = ""/>
            </div>
            <div className = "form-group">
            <label> Password: </label> 
            <input type="text" value = {password} onChange={(e) => setPassword(e.target.value)} id = ""/>
            </div>
            <button type = "submit"> Create Account </button>
        </form>
        </div>
        </div>
        </>

     );
}

export default SignUp;