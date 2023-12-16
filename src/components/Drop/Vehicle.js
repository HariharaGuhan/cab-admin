import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Drop/Vehicle.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import GetVehicle from '../Drop/getviechle'

const Vehicle = () => {
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [fromKM, setFromKM] = useState('');
    const [toKM, setToKM] = useState('');
    const [amount, setAmount] = useState('');



    const postuser = () => {
        const data = {
            vehicle_Type: selectedVehicle,
            per_km: fromKM,
            Amount: amount,
        };
    
        axios.post('http://localhost:3003/api/flat_fare', data)
            .then(response => {
                console.log(response.data);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Data Saved Successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSelectedVehicle('');
                setFromKM('');
                setAmount('');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error Saving Data',
                    text: 'Please try again later.',
                });
            });
    };
    
    const updateUser = () => {
        const data = {
            vehicle_Type: selectedVehicle,
            from_km: fromKM,
            to_km: toKM,
            Amount: amount,
        };
    
        axios.post('http://localhost:3003/api/Range_fare', data)
            .then(response => {
                console.log(response.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Data Saved Successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSelectedVehicle('');
                setFromKM('');
                setToKM('');
                setAmount('');
            })
            .catch(error => {
                console.error('Error updating user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error Saving Data',
                    text: 'Please try again later.',
                });
            });
    };
    

    const handleVehicleChange = (event) => {
        const { value } = event.target;
        setSelectedVehicle(value);
    };

    const handleTypeChange = (event) => {
        const { value } = event.target;
        setSelectedType(value);
    };

    const handleFromKMChange = (event) => {
        const { value } = event.target;
        setFromKM(value);
    };

    const handleToKMChange = (event) => {
        const { value } = event.target;
        setToKM(value);
    };

    const handleAmountChange = (event) => {
        const { value } = event.target;
        setAmount(value);
    };

 

    return (
        <div className="grid container-fluid ">
            <div className="container row">
                <div className="col-6  ">
                    <h1>Vehicle Type :</h1>
                    <select className='form-control form1 w-25 ' onChange={handleVehicleChange}>
                        <option value=''>Select</option>
                        <option value="Bike">Bike</option>
                        <option value="Auto">Auto</option>
                        <option value="Car">Car</option>
                        <option value="PremiumCar">PremiumCar</option>
                        <option value="ElectricVehicle">Electric Vehicle</option>
                    </select>
                </div>
                <div className="col-6 ">
                    <h1>Amount Type :</h1>
                    <select className='form-control form1 w-25' onChange={handleTypeChange}>
                        <option value=''>Select</option>
                        <option value="flat">Flat</option>
                        <option value="range">Range</option>
                    </select>
                </div>

                {selectedType === 'flat' && (
                    <>
                        <h3 className='mt-5'>Flat</h3>
                        <div className=" mt-2  ">
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
                                        <td className='text-center faretdth'><h4>{selectedVehicle}</h4></td>
                                        <td className='faretdth'>
                                            <input type="text" className='form1 form-control' onChange={handleFromKMChange} value={fromKM} />
                                        </td>
                                        <td className=''>
                                            <input type="text" className='form1 form-control' onChange={handleAmountChange} value={amount} />
                                        </td>
                                        <td className='faretdth'>
                                            <button type="button" className="btn btn-success" onClick={postuser}>save</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {selectedType === 'range' && (
                    <>
                        <h3 className='mt-5'>Range</h3>
                        <div className=" mt-2">
                            <table className='faretable'>
                                <thead className='text-center faretdth fontstyles'>
                                    <tr>
                                        <th className='faretdth'>Vehicle Type</th>
                                        <th className='faretdth'>FromKM</th>
                                        <th className='faretdth'>ToKM</th>
                                        <th className='faretdth'>Amount</th>
                                        <th className='faretdth'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='text-center faretdth'><h4> {selectedVehicle}</h4></td>
                                        <td className='faretdth'>
                                            <input className='form-control form1 text-center mr-4' type="text" onChange={handleFromKMChange} value={fromKM} />
                                        </td>
                                        <td className='faretdth'>
                                            <input className='form-control form1 text-center mr-4' type="text" onChange={handleToKMChange} value={toKM} />
                                        </td>
                                        <td className='faretdth'>
                                            <input className='form-control form1 text-center mr-4' type="text" onChange={handleAmountChange} value={amount} />
                                        </td>
                                        <td className='faretdth'>
                                            <button type="button" className="btn btn-primary" onClick={updateUser}>Save</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                </div>
            <div className="  container-fluid  mt-5 ">
                <GetVehicle />
            </div>
        </div>

    );
};

export default Vehicle;
