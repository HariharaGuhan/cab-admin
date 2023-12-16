import React from "react";
import "../styles/bookings.css";
import Prograss from "../components/pageui/bookinprograss.js";
import Bookinglist from '../charts/bookinglist.js'




const Bookings = () => {
  return (
    <div className="bookings">
      <div className="booking__wrapper">
       <Prograss/>
      </div>
      <div>
        <Bookinglist/>

      </div>
    </div>
  );
};

export default Bookings;
