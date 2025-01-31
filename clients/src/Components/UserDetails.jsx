import axios from 'axios';
import './UserDetails.css'
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Helmet } from 'react-helmet-async';

const UserDetails = ({ UserId }) => {

    const [det, setDet] = useState([]);

    useEffect(() => {
        const fetchdatas = async () => {
            const response = await axios.get(`http://localhost:5001/carts/${UserId}`);
            if (response.data.statuscode === 200) {
                setDet(response.data.cart)
            }
            else {
                console.log("error");
            }
        }
        fetchdatas();
    }, [UserId])

    return <>
        <Helmet>
            <title>Library/user_details</title>
        </Helmet>
        <Nav />
        <div className='container'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>So.no</th>
                        <th>Book name</th>
                        <th>Return</th>
                    </tr>
                </thead>
                <tbody>
                    {det.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.bookName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default UserDetails
