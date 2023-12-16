import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";
import NotificationCard from "./notification";
import "./top-nav.css";

const TopNav = () => {
  const [bellNotifications, setBellNotifications] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const bellResponse = await fetch("http://localhost:3003/api/bell_notifications");
        if (!bellResponse.ok) {
          throw new Error(`HTTP error! Status: ${bellResponse.status}`);
        }

        const bellData = await bellResponse.json();
        console.log("Bell Data:", bellData);
        setBellNotifications(bellData.count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBellClick = () => {
    // Toggle the state to show/hide notifications
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box"> </div>
        <div className="top__nav-right">
          <span className="notification" onClick={handleBellClick}>
            <FontAwesomeIcon className="text-secondary email" icon={faBell} />
            {loading ? (
              <span>loading..</span>
            ) : (
              <span className="badge">{error ? "" : bellNotifications}</span>
            )}
          </span>
          {showNotifications && (
            <NotificationCard notifications={['Notification 1', 'Notification 2']} />
          )}
          <div className="profile">
            <Link to="/settings">
              <img src={profileImg} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
