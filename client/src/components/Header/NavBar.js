import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className = "header">
            {/* Logo */}
            <Link className = "nav-title" to="/">
                <img className = "nav-logo" src={ "/NeurosurgeryLogo.gif" } alt="Neurosurgery logo" />
            </Link>

            {/* Page Links */}
            <div className = "nav-items">
                <Link className = "nav-link" to='/Home'>Home</Link>
               
                <Link className = "nav-link" to='/Login'>Login</Link>
                <Link className = "nav-link" to='/CreateUser'>Create Account</Link>
            </div>

        </div>
    )
};
/*

                <Link className = "nav-link" to='/Register'>Extra Page</Link>
                <a className = "nav-link" target='_blank' rel="noopener noreferrer" href="https://reactjs.org/docs/getting-started.html">
                    React Docs
                </a>
                <a className = "nav-link" target="_blank" rel="noopener noreferrer" href="https://reactjs.org/tutorial/tutorial.html">React Tutorial</a>
                <a className = "nav-link" target="_blank" rel="noopener norefferer" href="https://nodejs.org/en/docs/">Node Docs</a>
*/
export default NavBar;
