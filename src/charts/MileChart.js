import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

const MileChart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entries, setEntries] = useState(10);
  const [data, setData] = useState([]);
  const itemsPerPage = entries;

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, entries]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/totaluser');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };



  

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = data.filter((item) => {
    return (
      item.first_Name &&
      item.first_Name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.last_Name &&
        item.last_Name.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.MobileNo &&
        item.MobileNo.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  };

  const handleSelectChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntries(value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <div className="stats__title">
        <form>
          <div className="mt-4 row">
            <div className="col-7">
              <div className='row'>
                <div className='col-3 text-end mt-3'>Show  Entries:</div>
                <div className='col-5 mt-3'><select className=" form-control w-25" value={entries} onChange={handleSelectChange}>
                  <option value={10}>10</option>
                  <option value={15}>20</option>
                  <option value={20}>30</option>
                  <option value={30}>50</option>
                </select></div>

              </div>
            </div>
            <div className="col-5">
              <input
                className="mt-3 form-control w-50"
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {filteredData.length > 0 ? (
            <>
              <table>
                <thead className="wow">
                  <tr className='text-center'>
                    <th>User_id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Mobile Number</th>
                    <th>Referral Code</th>
                    <th>Date_time</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((item, index) => (
                      <tr className="wow1" key={index}>
                        <td className='text-center'>{item.user_id}</td>
                        <td className='text-center'>{item.first_Name}</td>
                        <td className='text-center'>{item.last_Name}</td>
                        <td className='text-center'>{item.gender}</td>
                        <td className='text-center'>{item.MobileNo}</td>
                        <td className='text-center'>{item.Referal_Code}</td>
                        <td className='text-center'>{item.Date_time}</td>
                        
                        
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-center mt-2">
                <Pagination>
                  <Pagination.Prev onClick={prevPage} />
                  {pageNumbers}
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </div>
            </>
          ) : (
            <p>No data found</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default MileChart;
