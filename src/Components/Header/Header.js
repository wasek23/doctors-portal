import React from 'react';
import './Header.css';
import Logo from '../../img/tooth.png';

const Header = () => {
    return (
        <header>
            <div className="container">
                <a href="/" className="logo"><img src={Logo} alt="Logo" /></a>
                <ul className="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/doctor">Doctor</a></li>
                    <li><a href="/">About</a></li>
                    <li><a href="/">Dental Services</a></li>
                    <li><a href="/">Reviews</a></li>
                    <li><a href="/">Blog</a></li>
                    <li><a href="/">Contact us</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;