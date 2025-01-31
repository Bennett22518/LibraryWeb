import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import moment from 'moment'
import './YourBooks.css'
import { Helmet } from 'react-helmet-async';

const YourBooks = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const UserId = localStorage.getItem('UserId');
    const [bookDetails, setBookDetails] = useState('');

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/data/${UserId}`);
                if (response.data.statuscode === 200) {
                    console.log((response.data.rd));
                    setCart(response.data.book);
                    setBookDetails(response.data.bookDetail)
                } else {
                    alert(response.data.message)
                    setError("Failed to fetch cart data.");
                }
            } catch (err) {
                console.error("Error fetching cart data:", err);
                setError("An error occurred while fetching cart data.");
            }
        };
        fetchCart();
    }, [UserId]);

    const returnBook = async (index) => {
        const bookId = `${cart[index].BookId}`
        try {
            await axios.put(`http://localhost:5001/rebook/${cart[index].id}`, { bookId });
            alert('Successfully returned the book')
            window.location.reload();
        } catch (error) {
            console.error("Error returning the book:", error);
            alert("Failed to return the book. Please try again.");
        }
    };

    const sortedDet = [...cart].sort((a, b) => {
        const bookA =
            a.updatedAt || bookDetails.find((book) => book.id === a.BookId)?.updatedAt || "Unknown";
        const bookB =
            b.updatedAt || bookDetails.find((book) => book.id === b.BookId)?.updatedAt || "Unknown";
        return bookA.localeCompare(bookB);
    });

    const renderTable = () => {
        if (cart.length === 0) {
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
                    ? moment(item.return_date).format("L,LT")
                    : null;

            const barrowDate =
                item.borrowed_date
                    ? moment(item.borrowed_date).format('L')
                    : null;

            const bookName =
                item.bookName ||
                bookDetails.find((book) => book.id === item.BookId)?.bookName ||
                "Unknown";

            return <>
                <Helmet>
                      <title>Library/Home</title>
                    </Helmet>
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{bookName}</td>
                    <td>{barrowDate}</td>
                    <td>
                        {returnDate == null ? (
                            <button
                                className="btn-g"
                                onClick={() => returnBook(index)}
                            >
                                Return
                            </button>
                        ) : (
                            `${returnDate}`
                        )}
                    </td>
                </tr>
                </>
        });
    };

    return <>
        <Nav />
        <div>
            <br />
            <h2>Your Books</h2>
            <br />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>So.no</th>
                        <th>Book id</th>
                        <th>Books</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                    </tr>
                </thead>
                <tbody>{renderTable()}</tbody>
            </table>
        </div>
    </>
};

export default YourBooks;
