import "../styles/dashboard.css";

import Example from "../charts/CarStatsChart";

import React, { useState, useEffect } from "react";
import axios from "axios";
const Dashboard = () => {
  const [pendingUsersCount, setPendingUsersCount] = useState(0);
  const [freshUsers, setFreshUsers] = useState(null);

  const [totalUsers, setTotalUsers] = useState(null);
  const [ setIsLoading] = useState(true);
  const [ setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/totalUserCount")
      .then((response) => {
        setTotalUsers(response.data.totalUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching data");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchPendingUsersCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/pendingUsers"
        );
        const { pendingUsersCount } = response.data;
        setPendingUsersCount(pendingUsersCount);
      } catch (error) {
        console.error("Error fetching pending users count:", error);
      }
    };

    fetchPendingUsersCount();
  }, []);
  useEffect(() => {
    const fetchFreshUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/freshUsers"
        );
        setFreshUsers(response.data.freshUsers);
      } catch (error) {
        console.error("Error fetching fresh users:", error);
      }
    };

    fetchFreshUsers();
  }, []);
  return (
    <div className="dashboard">
      <div className="row">
       
      
        <div class="col-md-3 col-12 mt-2 bord">
          <div class=" card card-boc1 bord bg-warning">
            <div class="card-body ">
              <div className="user-card">
                <h3>TotalUser</h3>
                <div>
                  {freshUsers !== null ? (
                    <div>
                      <p>total user: {totalUsers}</p>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 mt-2 bord">
          <div class=" card card-boc1 bord bg-success">
            <div class="card-body ">
              <div className="user-card">
                <h3>Totalbooking</h3>
                <div>
                  {freshUsers !== null ? (
                    <div>
                      <p>total booking: {pendingUsersCount}</p>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 mt-2 bord">
          <div class=" card card-boc1 bord bg-info">
            <div class="card-body ">
              <div className="user-card">
                <h3>New user</h3>
                <div>
                  {freshUsers !== null ? (
                    <div>
                      <p>New user: {freshUsers}</p>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-12 mt-2 bord">
          <div class=" card card-boc1 bord bg-secondary">
            <div class="card-body ">
              <div className="user-card">
                <h3>TotalDriver</h3>
                <div>
                  {freshUsers !== null ? (
                    <div>
                      <p>Total driver: {totalUsers}</p>
                    </div>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Example />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
