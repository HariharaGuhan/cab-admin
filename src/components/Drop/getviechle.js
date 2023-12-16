import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../Drop/Vehicle.css';
import Swal from 'sweetalert2';

const GetVehicle = () => {
    const [data, setData] = useState([]);
    const [some, setSome] = useState([]);
    const [editData, setEditData] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        fetchData();
        getData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3003/api/flatfare');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3003/api/rangefare');
            setSome(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const editUser = (userData) => {
        setEditData(userData);
        setShowEditForm(true);
    };

    const deleteUser = async (userId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3003/api/flat_fare/${userId}`);
                fetchData();
                Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    const rangedeleteUser = async (userId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this data!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:3003/api/range_fare/${userId}`);
                fetchData();
                Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Error deleting user: ', error);
        }
    };

    const handleEditFormSubmit = async (editedData) => {
        try {
            await axios.put(`http://localhost:3003/api/flat_fare/${editedData.flat_fare_id}`, editedData);

            // After updating, fetch the latest data
            fetchData();
            setShowEditForm(false);

            Swal.fire('Updated!', 'Your data has been updated.', 'success');
        } catch (error) {
            console.error('Error updating user: ', error);
        }
    };

    return (
        <div className='row'>
            <div className=' col-12 vehicle_div'>
                <table>
                    <thead className='fontstyles wow'>
                        <tr>
                            <th>flat_fare_id</th>
                            <th>Vehicle Type</th>
                            <th>Per_km</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, index) => (
                            <tr className='wow1' key={index}>
                                <td className='text-center'><h5>{user.flat_fare_id}</h5></td>
                                <td className='text-center'><h5>{user.vehicle_Type}</h5></td>
                                <td className='text-center'>{user.per_km}</td>
                                <td className='text-center'>{user.Amount}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <td className="">
                                            <FontAwesomeIcon onClick={() => editUser(user)} icon={faPenToSquare} />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon onClick={() => deleteUser(user.flat_fare_id)} icon={faTrashCan} />
                                        </td>
                                    </div>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=' col-12 vehicle_div mt-3'>
                <table>
                    <thead className='fontstyles wow'>
                        <tr>
                            <th>Range_fare_id</th>
                            <th>Vehicle Type</th>
                            <th>From_km</th>
                            <th>To_km</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {some.map((user, index) => (
                            <tr className='wow1' key={index}>
                                <td className='text-center'><h5>{user.range_fare_id}</h5></td>
                                <td className='text-center'><h5>{user.vehicle_Type}</h5></td>
                                <td className='text-center'>{user.from_km}</td>
                                <td className='text-center'>{user.to_km}</td>
                                <td className='text-center'>{user.Amount}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <td className="">
                                            <FontAwesomeIcon onClick={() => editUser(user)} icon={faPenToSquare} />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon onClick={() => rangedeleteUser(user.range_fare_id)} icon={faTrashCan} />
                                        </td>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            {showEditForm && (
                <EditForm
                    userData={editData}
                    onCancel={() => setShowEditForm(false)}
                    onSubmit={handleEditFormSubmit}
                />
            )}
        </div>
    );
};


const EditForm = ({ userData, onCancel, onSubmit }) => {
    const [editedData, setEditedData] = useState(userData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(editedData);
    };

    return (
        <div className="edit-form-container">
            <div className="edit-form">
                <form onSubmit={handleSubmit}>
                    <>
                        <h3 className=''>Flat</h3>
                        <div className="">
                            <table className='faretable'>
                                <thead className='fontstyles faretdth'>
                                    <tr>
                                        <th className='faretdth'>Vehicle type</th>
                                        <th className='faretdth'>FromKM</th>
                                        <th className='faretdth'>Amount</th>
                                        <th className='faretdth'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='faretdth'>
                                    <tr>

                                        <td className='faretdth'>
                                            <input className='form-control'
                                                type="text"
                                                name="vehicle_Type"
                                                value={editedData.vehicle_Type}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className=''>
                                            <input
                                                className='form-control'
                                                type="text"
                                                name="per_km"
                                                value={editedData.per_km}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className='faretdth'>
                                            <input
                                                className='form-control'
                                                type="text"
                                                name="Amount"
                                                value={editedData.Amount}
                                                onChange={handleInputChange}
                                            />
                                        </td>
                                        <td className='form-control'>
                                            <button className='btn btn-success w-50 ' type="submit">update</button>
                                            <span><button type="button" className='btn btn-danger w-50 ' onClick={onCancel}>
                                                Cancel
                                            </button></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>

                </form>
            </div>
        </div>
    );
};


export default GetVehicle;
