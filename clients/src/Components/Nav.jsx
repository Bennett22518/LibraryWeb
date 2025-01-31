import React, { useState } from 'react'
import './Nav.css';
import logo from './images/—Pngtree—creative combination of library books_126323.png';
import pro from './images/user-profile-icon-free-vector.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { FaHome } from "react-icons/fa";



const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let email = localStorage.getItem('email')
    let username = localStorage.getItem('name')
    let userrole = localStorage.getItem('role')
    const profil = {
        email: email,
        userName: username,
        userRole: userrole
    }

    const clearAllSessionStorage = () => {
        try {
            navigate('/');
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("email");
            window.localStorage.removeItem("name");
            window.localStorage.removeItem("UserId");
            window.localStorage.removeItem("role");
            window.location.reload();
            console.log('All localStorage data cleared');
        } catch (error) {
            console.log(error);
        }
    };

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [message, setMessage] = useState("");

    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        copies_available: "",
        images: null,  // Store file as null initially
    });

    // Handle file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBook({ ...book, images: file });
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Use FormData to send file
        const formData = new FormData();
        formData.append("title", book.title);
        formData.append("author", book.author);
        formData.append("genre", book.genre);
        formData.append("copies_available", book.copies_available);
        formData.append("file", book.images);  // Append file properly

        try {
            const response = await axios.post("http://localhost:5001/books", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201) {
                setMessage("Book added successfully!");
                setBook({
                    title: "",
                    author: "",
                    genre: "",
                    copies_available: "",
                    images: null,
                });
            }
        } catch (error) {
            console.error("Error adding book:", error);
            setMessage("Failed to add the book. Please try again.");
        }
    };

    return <>
        <nav className="navbar-n navbar-expand-lg navbar-light d-flex">
            <div className="container-fluid d-flex">
                <div className="dropdown-n">
                    <div className="dropdown">
                        <img src={`${pro}`} className="pro dropdown-toggle" type="button" onClick={toggleDropdown} alt="..." href="./home" />
                        <div
                            className={`dropdown-menu ${isOpen ? ' show' : ''}`}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <ul id='userDe'>
                                <li className='p'><FaRegUser className='ico mb-1' /><b>User name :</b> {profil.userName}</li><hr />
                                <li className='p'><MdOutlineEmail className='ico mb-1' /><b>Email     :</b> {profil.email}</li><hr />
                                <li className='p'><FaClipboardUser className='ico' /><b>Role : </b>{profil.userRole}</li><hr />
                                <li className='p'><TbListDetails className='ico mb-1' />{userrole === "Manager" ? <><a href="./manager" className='userDetails bg-trasparant'> User details </a><br /></> : <><a href='/yourbooks' className='userDetails'>Your Books</a></>}</li><hr />
                                <li className='p' onClick={clearAllSessionStorage}>Logout <IoIosLogOut /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul className='list-n d-flex'>
                    <li className='m-3'><a href="/" ><FaHome className='hom mr-1 mb-1' />Home</a></li>
                    <li className='m-3'><a href="/booklist" ><IoLibrary className='hom mr-1 mb-1'/>Book</a></li>
                    {profil.userRole === "Manager" ? <button className="btn-m ml-1" onClick={handleShow}>
                        Add book
                    </button> : null}

                    {showModal && (
                        <div
                            className="modal fade show"
                            style={{ display: 'block' }}
                            tabIndex="-1"
                            role="dialog"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content" >
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add a New Book</h5>
                                        <button type="button" className="close" onClick={handleClose}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="container-m">
                                        <form onSubmit={handleSubmit}>
                                            <div className='form-group mt-2'>
                                                <label className='lab'>Book Name</label>
                                                <input type="text" className='form-control-q' name="title" placeholder="Book Title" required
                                                    value={book.title}
                                                    onChange={(e) => setBook({ ...book, title: e.target.value })}
                                                />
                                                <label className='lab'>Author</label>
                                                <input type="text" className='form-control-q' name="author" placeholder="Author" required
                                                    value={book.author}
                                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                                />
                                                <label className='lab'>Genre</label>
                                                <input type="text" className='form-control-q' name="genre" placeholder="Genre"
                                                    value={book.genre}
                                                    onChange={(e) => setBook({ ...book, genre: e.target.value })}
                                                />
                                                <label className='lab'>Copies</label>
                                                <input type="number" className='form-control-q' name="copies_available" placeholder="Copies Available" required
                                                    value={book.copies_available}
                                                    onChange={(e) => setBook({ ...book, copies_available: e.target.value })}
                                                />
                                                <label className='lab'>Images</label>
                                                <input type="file" className='form-control-q' name="file"
                                                    onChange={handleFileChange}
                                                />

                                                {book.images && (
                                                    <img src={URL.createObjectURL(book.images)} alt="Preview" width="100" />
                                                )}
                                                <br />
                                                <button type="submit" className='btn btn-primary mt-3'>Add Book</button>
                                            </div>
                                        </form>
                                        <center>{message && <p className="mt-2">{message}</p>}</center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showModal && <div className="modal-backdrop fade show"></div>}
                </ul>

            </div>
            <div className='logn'>
                <a href="./home"><img src={`${logo}`} className="img-fluid-p rounded-start" alt="..." /></a>
            </div>
        </nav>
    </>
}

export default Nav
