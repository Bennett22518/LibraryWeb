import React, { useState, useEffect } from "react";
import axios from "axios";
import './Booklist.css';
import Nav from "./Nav";
import BookComponent from "./BookComponent";
import Footer from "./Footer";
import MuteButton from "./MuteButton";
import { Helmet } from "react-helmet-async";

const BookList = () => {

    const [books, setBooks] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5001/books").then((response) => {
            setBooks(response.data);
            // alert("File uploaded successfully! URL: " + response.data.filePath);
            console.log({ "Images : ": response.data });
        })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    // Filter books based on the search query
    const filteredBooks = books.filter((book) =>
        book.bookName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    // Calculate total pages
    const totalPages = Math.ceil(books.length / booksPerPage);

    // Get books for current page
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

    return <>
        <Helmet>
            <title>Library/book_list</title>
        </Helmet>
        <div className="lib">
            <nav className="nav">
                <Nav />
            </nav>
            <div className="images">
                {books.map((book) => (
                    <img src={`http://localhost:5001${book.images}`} alt="" />
                ))}
            </div>
            <center><div className="serc justify-content-center">
                <input
                    type="text"
                    className="form-control-s"
                    placeholder="Search books by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div></center>
            {searchQuery && <ul className="container justify-content-center align-items-center">
                {<div className="booksm row" >
                    {filteredBooks.length > 0 ? (filteredBooks.map((book) => (
                        <div className="booksb col-sm " key={book.id} >
                            <img src={`http://localhost:5001${book.images}`} alt={book.bookName} className="img-fluid-m" />
                            <div className="card-body">
                                <h7 className="card-title-l"><b>{book.bookName}</b></h7>
                                <p className="card-text-m"><small className="text-dark"><b>Author :</b> {book.author}</small></p>
                                <div className="status">
                                    <b>Status:</b>{" "}
                                    <span className={book.isavailable ? "text-dark" : "text-danger"}>
                                        {book.isavailable ? "Available" : "Not Available"} {book.copies_available}
                                    </span>
                                </div>
                            </div>
                            <div className="card-body-m">
                                {book.isavailable && <BookComponent book={book} />}
                            </div>
                        </div>
                    ))) : (
                        <tr className="booksm-n row" >
                            <td className="text-center">
                                No books found.
                            </td>
                        </tr>
                    )}
                </div>}
            </ul>}
            <h1>Library Books</h1>
            <img src="" alt="" />
            <ul className="container justify-content-center align-items-center">
                <div className="booksm row" >
                    {currentBooks
                        .sort((a, b) => a.bookName.localeCompare(b.bookName))
                        .map((book) => (
                            <div className="booksb col-sm " key={book.id} >
                                <img src={`http://localhost:5001${book.images}`} alt={book.bookName} className="img-fluid-m" />
                                {/* <img src={URL(book.images)} className="img-fluid-m" alt="Preview" /> */}
                                <div className="card-body">
                                    <h7 className="card-title-l"><b>{book.bookName}</b></h7>
                                    <p className="card-text-m"><small className="text-dark"><b>Author :</b> {book.author}</small></p>
                                    <div className="status">
                                        <b>Status:</b>{" "}
                                        <span className={book.isavailable ? "text-dark" : "text-danger"}>
                                            {book.isavailable ? "Available" : "Not Available"} {book.copies_available}
                                        </span>
                                    </div>
                                </div>
                                <div className="card-body-m">
                                    {book.isavailable === true ? <BookComponent book={book} /> : <MuteButton />}
                                </div>
                            </div>
                        ))}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center mb-3">
                            <li className={`page-item  ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link bg-dark" style={{ borderRadius: "15px 0 0 15px" }} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                    <button className={`page-link ${currentPage === index + 1 ? "bg-primary" : "bg-dark"}`} onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                            <li className={`page-itemn ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link bg-dark" style={{ borderRadius: "0 15px 15px 0" }} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </ul>
        </div>
        <Footer />
    </>
};

export default BookList;
