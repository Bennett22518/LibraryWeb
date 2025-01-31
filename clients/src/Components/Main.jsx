import React from 'react'
import './Main.css'
import logo from './images/—Pngtree—creative combination of library books_126323.png'
import { Helmet } from 'react-helmet-async'

const Main = () => {
    return <>
        <Helmet>
            <title>Library</title>
        </Helmet>
        <nav className="navbar-s navbar-expand-lg navbar-light">
            <div className="container-fluid-i d-flex">
                <ul className='list-m d-flex'>
                    {/* <li className='m-3'><a href="/">Home</a></li> */}
                </ul>
                <div className='log'>
                    <img src={`${logo}`} className="img-fluid-p rounded-start" alt="..." />
                </div>
            </div>
        </nav>
        <div className='body justify-content-center align-items-center' >
            <div className='con'>
                <h1>LIBRARY</h1>
                <h6><a href="/userlogin">login</a> or <a href="/userregis">Register</a></h6>
            </div>
        </div>
    </>
}

export default Main
