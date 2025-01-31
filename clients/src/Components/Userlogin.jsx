import React, { useState } from 'react';
import axios from 'axios'
import './Userlogin.css';
import logo from './images/—Pngtree—creative combination of library books_126323.png';
import { Helmet } from 'react-helmet-async';

const Userlogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5001/login',{ email, password });
      if (response.data.statuscode === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.usern);
        localStorage.setItem('email', email);
        localStorage.setItem('role', response.data.userRole);
        localStorage.setItem('UserId', response.data.userid);
        window.location.href = '/home';
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return <>
  <Helmet>
    <title>Library/user_login</title>
  </Helmet>
    <div>
      <nav className="navbar-l navbar-expand-lg navbar-light">
        <div className="containerr">
          <ul className='list-l'>
            <li className='m-3'><a href="/">Home</a></li>
          </ul>
          <div className='logs'>
            <img src={`${logo}`} className="img-fluid-p rounded-start" alt="..." />
          </div>
        </div>
      </nav>
      <div className="containersl d-flex justify-content-center align-items-center" >
        <div className="card-f" style={{ borderRadius: '50px' }}>
          <br />
          <div className="card-body-b">
            <h3 className="card-title-t"> LOGIN</h3>
            {(

              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="form-label">EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div><br />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn-r">
                    Submit
                  </button>
                </div>
                <div className='par'> 
                  <p>Don't have an account? <a href="/userregis">Register</a> <br /> or <br /><a href="/forgetpass">Forget password</a></p>
                </div><br />
                {errorMessage && <p>{errorMessage}</p>}
                <br />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
}

export default Userlogin