import React from 'react';
import Login from '../components/Login'
import '../style/Landing.css';
import logo from '../assets/Background.png'

function Landing() {
    return (
        <div className='box-container'>
           <div className="logo">
                <img src={logo} alt="Background Logo" />
                {/* Logo marked */}
            </div>
            <Login />
        </div>
    );
}

export default Landing;