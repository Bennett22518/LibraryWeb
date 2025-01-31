import React from 'react'
import './Footer.css'
import logo from './images/—Pngtree—creative combination of library books_126323.png';
import img1 from './images/91teiIZ5vwL._AC_UF1000,1000_QL80_.jpg'
import img2 from './images/Moby_Dick.jpg'
import img3 from './images/Pride and Prejudice.jpg'
import img4 from './images/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_FMjpg_UX1000_.jpg'
import contact from './images/contact.png'
import location from './images/lo.webp'
import email from './images/email-icon-black-png-10.jpg'
import instagram from './images/visualhunter-a8ec508b37.png'
import facebook from './images/icons8-facebook-96.png'
import twitter from './images/icons8-twitter-bird-160.png'



const Footer = () => {
    return (
        <div className='footers row-1'>
            <div className='foot col-4'>
                <img src={`${logo}`} className="imgs" alt="..." />
                <p><img src={location} className='loc' alt="" /> 123 Main Street, Town,CA, 12345 USA</p>
                <p><img src={contact} className='loc' alt="" /> +1 800 123 1234</p>
                <p><img src={email} className='loc' alt="" /> library@gmail.com</p>
            </div>
            <div className='foots col-4'>
                <p>Copyright © 2025 <b>Library</b>. All Right Reserved</p>
                <a href="#"><img src={facebook} alt="" className='footiconf'/></a>
                <a href="#"><img src={instagram} className='footiconi' alt="" /></a>
                <a href="#"><img src={twitter} className='footicont' alt="" /></a>
            </div>
            <div className='footimg col-3'>
                <h5>BOOKS</h5>
                <img src={img1} className='img1' alt="" />
                <img src={img2} className='img1' alt="" />
                <img src={img3} className='img1' alt="" />
                <img src={img4} className='img1' alt="" />
            </div>
        </div>
    )
}

export default Footer
