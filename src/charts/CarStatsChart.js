import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import '../charts/CarStatsChart.css';

const Example = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/chartcount');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error(error.message);  
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row box1'>
        <div className='col-12'>
          <h2>Status</h2>

          <BarChart width={950} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="green" />
            <Bar dataKey="cancel" fill="red" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Example;