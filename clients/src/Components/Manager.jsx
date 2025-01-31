import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Manager.css'
import Nav from './Nav';
import './Nav.css'
import moment from 'moment';
import { Helmet } from 'react-helmet-async';


const Manager = () => {

    const [details, setDetails] = useState([]);
    const [det, setDet] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:5001/fetch")
                setDetails(response.data.users)
            } catch (error) {
            }
        }
        fetch()
    }, [])

    const [bookDetails, setBookDetails] = useState('');

    const handleShow = async (item) => {
        try {
            // Set loading state if needed
            setDet([]);
            setShowModal(true);

            // Fetch data
            const response = await axios.get(`http://localhost:5001/carts/${item.userId}`);

            // Check response status and update state
            if (response.data.statuscode === 200) {
                setDet(response.data.book);
                setBookDetails(response.data.bookDetail);

            } else {
                console.error("Error fetching cart details");
                setError("Failed to fetch cart data.");
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
        }
    };

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const sortedDet = [...det].toReversed((a, b) => {
        const bookA =
            a.updatedAt || bookDetails.find((book) => book.id === a.BookId)?.updatedAt || "Unknown";
        const bookB =
            b.updatedAt || bookDetails.find((book) => book.id === b.BookId)?.updatedAt || "Unknown";
        return bookA.localeCompare(bookB); // Sort alphabetically
    });

    // Render cart table
    const renderTable = () => {
        if (det.length === 0) {
            return (
                <tr>
                    <td colSpan="3" className="text-center">
                        {error || "No books in your cart."}
                    </td>
                </tr>
            );
        }
        return sortedDet.map((item, index) => {
            const returnDate =
                item.return_date
                    ? moment(item.return_date).format('L')
                    : null;

            const barrowDate =
                item.borrowed_date
                    ? moment(item.borrowed_date).format('L')
                    : null;

            const bookName =
                item.bookName ||
                bookDetails.find((book) => book.id === item.BookId)?.bookName ||
                "Unknown";



            return (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{bookName}</td>
                    <td>{barrowDate}</td>
                    <td>
                        {returnDate == null ? (
                            "Not return"
                        ) : (
                            `${returnDate}`
                        )}
                    </td>
                </tr>
            );
        });
    };

    return <>
    <Helmet>
        <title>Library/manager</title>
    </Helmet>
        <Nav />
        <div className='contai'>
            <h1 className='h'>User Details</h1><br />
            <table className="table">
                <thead>
                    <tr>
                        <th className='td'>So.no</th>
                        <th className='td'>Names</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>
                                {<button className="btn-g" onClick={() => handleShow(item)}>
                                    view
                                </button>}

                                {showModal && (
                                    <div
                                        className="modal fade show"
                                        style={{ display: 'block' }}
                                        tabIndex="-1"
                                        role="dialog"
                                    >
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">details</h5>
                                                    <button type="button" className="close" onClick={handleClose}>
                                                        <span>&times;</span>
                                                    </button>
                                                </div>
                                                <div className="container-m">
                                                    <table className="table">
                                                        <thead className="tablebody">
                                                            <tr>
                                                                <th>So.no</th>
                                                                <th>Book name</th>
                                                                <th>Barrow Date</th>
                                                                <th>Returned Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>{renderTable()}</tbody>
                                                    </table>
                                                    {/* {message && <p className="mt-3">{message}</p>} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showModal && <div className="modal-backdrop fade show"></div>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default Manager
