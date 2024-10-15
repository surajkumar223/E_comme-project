import React, { useContext } from 'react'
import { json, Link, Navigate, useNavigate } from 'react-router-dom';

import Searchbar from '../searchbar/Searchbar';
import { CartContext } from '../../Contexapi/ConteProvider';

function Navbar() {
    const {cart} = useContext(CartContext);
    // get user from localStorage 
        const user = JSON.parse(localStorage.getItem('users'));
    console.log("asdf",user);

    // navigate 
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    const navList = (

        <ul className="flex px-5 space-x-3 font-medium text-white text-md ">
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {!user ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}

            {!user ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}

            
            {/* User */}
            {user?.role === "user" && <li>
                <Link to={'/user-dashboard'}>{user?.name}</Link>
            </li>}
          {/* Admin */}
          {user?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>{user?.name}</Link>
            </li>}
            {/* logout */}
            
            {user && <li className="cursor-pointer " onClick={logout}>logout
            </li>}
            
            {/* Cart */}
            <li>
                <Link to={'/CartPage'}>
                    Cart({cart.length})
                </Link>
            </li>
        </ul>

    )

    console.log({ navList });

    return (
        <nav className="sticky top-0 bg-pink-600">
            {/* main  */}
            <div className="items-center py-3 lg:flex lg:justify-between lg:px-3 ">
                {/* left  */}
                <div className="py-3 left lg:py-0">
                    <Link to={'/'}>
                        <h2 className="text-2xl font-bold text-center text-white ">E-Bharat</h2>
                    </Link>
                </div>
                {/* right  */}
                <div className="flex justify-center mb-4 right lg:mb-0">
                    {navList}

                </div>
                {/* Search Bar  */}
                <Searchbar />
            </div>
        </nav>
    )

}

export default Navbar
