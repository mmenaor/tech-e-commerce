import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import Sidebar from './Sidebar';

const NavBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showSidebar, setShowSidebar ] = useState(false);

    const handleSidebar = () => {
        const token = localStorage.getItem("token");
        if(token){
            setShowSidebar(!showSidebar);
        } else {
            navigate("/login");
        }
    }

    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("user_name", "");
        navigate("/");
        alert("Successful logout");
    }

    useEffect(() => {
        if(localStorage.getItem("token") !== ""){
            dispatch(getCart());
        } 
    }, [dispatch, showSidebar])

    return (
        <div>
            <nav className="navbar-container">
                <div className="navbar-title-container">
                    <Link to="/" className="navbar-title-link"><h1  className="navbar-title">e-commerce</h1></Link>
                </div>
                <ul className="navbar-list">
                    <li><Link to="/login"><i className="navbar-items fa-solid fa-user"></i></Link></li>
                    <li><Link to="/purchases"><i className="navbar-items fa-solid fa-store"></i></Link></li>
                    <li><i className="navbar-items fa-solid fa-cart-shopping" onClick={handleSidebar} style={{color: showSidebar && '#F85555'}}></i></li>
                    {
                        localStorage.getItem("token") && <li onClick={logout}><i className="navbar-items fa-solid fa-right-from-bracket"></i></li>
                    }
                </ul>
            </nav>
            {
                showSidebar && <Sidebar handleSidebar={handleSidebar}/>
            }
        </div>
    );
};

export default NavBar;