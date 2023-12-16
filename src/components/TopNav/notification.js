// NotificationCard.jsx

import React, { useState, useEffect } from "react";
import "./notification.css";

const NotificationCard = () => {
  const [notificationData, setNotificationData] = useState({
    userCount: 0,
    userNames: [],
  });

  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3003/api/bell_notifications")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setNotificationData({
            userCount: data.user_count,
            userNames: data.user_names,
          });

          // Check if there are new notifications
          setHasNewNotifications(data.user_count > 0);
        } else {
          console.error("Error fetching notification data:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching notification data:", error);
      });
  }, []);

  return (
    <div className="notification-card">
      <h3 className="text-center mt-3">Notifications</h3>
      {/* Add the notification badge conditionally */}
      {hasNewNotifications && (
        <div className="notification-count">{notificationData.userCount}</div>
      )}
      <ul>
        {notificationData.userNames.map((userName, index) => (
          <li key={index}>{userName}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCard;
