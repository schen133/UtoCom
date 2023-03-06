import React from 'react';
import { useState, useEffect } from 'react';
import './static/event.css';
import './static/background.css';
// Each of these component will be having a GET request to fetch
// information from backend
// Event has a post request to see if user is signed in


const EventList = ({ events }) => {
    const apiURL = "http://127.0.0.1:8000";
    const handleRegister = async (e, event) => {
        e.preventDefault();
        const eventId = event.id;
        const eventTitle = event.title;
        console.log(localStorage.getItem("currentUser"));
        console.log(eventId);
        console.log(eventTitle);
        
        if (localStorage.getItem("signedIn") === "true") {            
            const response = await fetch(apiURL + "/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${authToken}`
              },
              body: JSON.stringify({
                currUser: localStorage.getItem("currentUser"),
                title: eventTitle
              }),
            });
            
            const data = await response.json();
            console.log(data);
            
            alert(JSON.stringify(data["hello"]));
          } else {
            alert("You need to sign in to register for this event.");
          }
        };

    return (
        <div className="event-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <h2 className="event-title">{event.title}</h2>
            <p className="event-description">{event.description}</p>
            <button className="event-button" onClick={(e) => handleRegister(e, event)}>Sign Up</button>
          </div>
        ))}
      </div>
      );
  };
  
function Event() {
    const [events, setEvents] = useState([]);
    const apiURL = "http://127.0.0.1:8000";

    useEffect(() => {
    fetch(apiURL + "/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.events));
    }, []);


    return ( 
        <div className = "mainContainer">
            <div className = "eventContainer">
                <EventList events={events} />
            </div>

        </div>
        
     );
}

export default Event;