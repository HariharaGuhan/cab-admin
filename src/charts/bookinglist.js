import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Bookinglist = () => {
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
      const response = await axios.get('http://localhost:3003/api/totalbooking');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  // console.log(`--data--`,typeof data[3].from_Place);
  // console.log(`--data--`,JSON.parse(data[3].from_Place));

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setEntries(value);
    setCurrentPage(1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div className="container-fluid">
      <div className="stats__title">
        <form>
          <div className="mt-4 row">
            <div className="col-lg-7">
              <div className='row'>
                <div className='col-lg-3 text-lg-end mt-3'>Show  Entries:</div>

                <div className='col-lg-6 mt-3'>
                  <select className="form-control w-50" value={entries} onChange={handleSelectChange}>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                </div>
              </div> </div>
            <div className="col-lg-5">
              <input
                className="mt-3 form-control w-50"
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {data.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead className="wow">
                  <tr className='text-center'>
                    <th>booking_id</th>
                    <th>User_id</th>
                    <th>booking_status</th>
                    {/* <th>booking_date</th> */}
                    <th>from_place</th>
                    <th>to_place</th>
                    <th>vehicle_Id</th>
                    <th>km_distance</th>
                    <th>Amount</th>
                    <th>Coupon_amount</th>
                    <th>total_amount</th>
                    <th>Payment_status</th>

                  </tr>
                </thead>
                <tbody>
                  {data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((item, index) => (
                      <tr className="wow1" key={index}>
                        <td className='text-center'>{item.booking_id}</td>
                        <td className='text-center'>{item.user_id}</td>
                        <td className='text-center' style={{color: item.booking_status === 'booked' ? 'green' : 'red' }}>
        {item.booking_status}
      </td>
                        {/* <td className='text-center'>{item.booking_date}</td> */}
                        <td className='text-center'>{item.from_Place}</td>
                        <td className='text-center'>{item.to_Place}</td>
                        <td className='text-center'>{item.vehicle_Id}</td>
                        <td className='text-center'>{item.km_distance}</td>
                        <td className='text-center'>{item.Amount}</td>
                        <td className='text-center'>{item.Coupon_amount}</td>
                        <td className='text-center'>{item.total_amount}</td>
                        <td className='text-center'>{item.Payment_status}</td>


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
            </div>
          ) : (
            <p>No data found</p>
          )}

        </form>
      </div>
    </div>
  );
};

export default Bookinglist;
