import React, { Component } from "react";
import "./EventItem.css";

const EventItem = ({ Name, Description, Venue, Price, Discount }) => {
    return <div className="card event">
        <div className="event-name">{Name.toTitleCase()}</div>
        <div className="event-desc">{Description.toTitleCase()}</div>
        <div className="ct-items">
            <span className="event-item"><i className="fas fa-map-marker"></i>{Venue}</span>
            <span className="event-item"><i className="fas fa-currency"></i>{Price}</span>
            <span className="event-item"><i className="fas fa-location"></i>{Discount}</span>
        </div>
    </div>
}

export default EventItem