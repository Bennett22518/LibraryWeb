import React, { useState } from 'react';
import './Userregis.css';
import logo from './images/—Pngtree—creative combination of library books_126323.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const Userregis = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('User')

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace the URL with your backend API endpoint
    await axios.post("http://localhost:5001/register", { username, phone, address, email, password, role })
      .then(response => {
        console.log(response);
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', email)
        localStorage.setItem('role', role)
        navigate('/userlogin');
      })
      .catch(error => {
        if (error.response) {
          console.log('Response error', error.response);
        } else if (error.request) {
          console.log('Request error', error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }
  return <>
  <Helmet>
    <title>Library/user_register</title>
  </Helmet>
    <div>
      <nav className="navbar-r navbar-expand-lg navbar-light">
        <div className="containerr d-flex">
          <ul className='list-r d-flex'>
            <li className='m-3'><a href="/">Home</a></li>
          </ul>
          <div className='logr'>
            <img src={`${logo}`} className="img-fluid-p rounded-start" alt="..." />
          </div>
        </div>
      </nav>
      <div className="containers d-flex justify-content-center align-items-center">
        <div className="card-g br-3">
          <div className="card-body-c">
            <h4 className="card-title">User Register</h4><br />

            <form onSubmit={handleSubmit}>
              <div className="mb">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mb">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="mb">
                <label className="form-label">
                  Email address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <label for="cars" className='form-label mr-2 '>Role</label>
              <select id="cars" name="cars" className='form-control mb-3' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="text-center mt-3 mb-3">
                <p>Already have an account? <a href="/userlogin">Log in</a></p>
              </div>
            </form>
            {/* {message && <p className="mt-3">{message}</p>} */}
          </div>
        </div>
      </div>
    </div>
    </>
}

export default Userregis
