import React from "react";
import "../styles/bookings.css";

import Bookinglist from '../charts/bookinglist.js'




const Trips = () => {
  return (
    <div className="bookings">
      <div className="booking__wrapper">
       
      <div>
        <Bookinglist/></div>

      </div>
    </div>
  );
};

export default Trips;