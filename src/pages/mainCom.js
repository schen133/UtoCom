import React from 'react';
import './static/main.css';
import './static/background.css';
function Main  () {

    console.log(localStorage.getItem("currentUser"));
    console.log(localStorage.getItem("signedIn"));
    return (  
        
        <div className="mainContainer">
            <div className="word">
                <h1>Welcome</h1>
                <p> Hello, here in RocCommunity</p>
                <p>you can view all the up coming events and register for them</p>
            </div>
        </div>

    );
}

export default Main;