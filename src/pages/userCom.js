import React from 'react';
import { useState, useEffect } from 'react';
import './static/user.css';
import './static/background.css';

function User() {

    const apiURL = "http://127.0.0.1:8000";

    const [firstName, setFirstName] = useState("");
    const [events, getEvents] = useState("");

    const HandleLogout = async(event) => {  
        event.preventDefault();

        if(window.confirm("You sure you want to log out?")){
            localStorage.setItem("signedIn", false);
            localStorage.setItem("currentUser", "");
            window.location.href = "/signin";
        } 
    }
    // get
        useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await fetch(apiURL + "/currentUserEvents", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  // "Authorization": `Bearer ${authToken}`
                },
                body: JSON.stringify({
                  currUser: localStorage.getItem("currentUser")
                }),
              });          
              
              const data = await response.json();
              setFirstName(data["fname"]);
            //   console.log(data);
              getEvents(data["event"]);

            //   console.log(events);
        };
    
        fetchUserInfo();
      }, []);

      
    return (  
        <div className = "mainContainer">
            <div className = "userProfile">
                <h1> hello {firstName}</h1>
                <h1> You have signed up for {events}</h1>
                <button onClick = {HandleLogout}> Log out </button>
            </div>
        </div>
        );
    }
    
    export default User;







        // console.log(localStorage.getItem("signedIn"));

        

    
    
  