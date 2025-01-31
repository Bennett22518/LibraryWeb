import React from 'react'
import './Home.css'
import lib from './images/modern-library-interior-stockcake.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './Nav'
import Footer from './Footer';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return <>
    <Nav />
    <Helmet>
      <title>Library/home</title>
    </Helmet>
    <div className='body justify-content-center align-items-center' >
      <div className='con-n'>
        <h1>Welcome to </h1>
        <h2>LIBRARY</h2>
        <a href='./booklist' className='go-l'>Go to Library ⇒</a>
      </div>
    </div>
    <div className='container-h justify-content-center align-items-center d-flex'>
      <div className="about row mt-4 mb-3">
        <div className="col-6">
          <h3>About Us</h3><br />
          <p>Our mission is to inspire curiosity, foster learning, and connect people to the world of information and ideas. Whether you're here to discover a new favorite book, dive into research, or attend one of our community programs, we are committed to supporting your journey.</p>
          <h4>Our Mission</h4>
          <ul>
            <li>Vast Collection of Resources: From fiction to academic research, we house over [X,XXX] books, eBooks, journals, and multimedia resources.</li><br />
            <li>Digital Library Access: Explore our online catalog, borrow eBooks, and access research databases anytime, anywhere.</li><br />
            <li>Quiet Reading Spaces: A tranquil environment perfect for studying, working, or simply escaping into a great story.</li><br />
            <li>Community Events: Join book clubs, author talks, workshops, and more to connect with others who share your interests.</li><br />
          </ul>
        </div>
        <div className="col-5">
          <img src={`${lib}`} alt="" />
        </div>
      </div>
    </div>
    <Footer />
  </>
}

export default Home