import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Slices/UserSlice';
import { AppDispatch } from '../../Store';

//import defaultImage from '../../deafultpic.jpg';

import './Navbar.css';
import { RootState } from '../../Store';
//import { clear } from 'console';

export const Navbar: React.FC = () => {

    const dispatch:AppDispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        //dispatch(clear);
    }

    const user = useSelector((state:RootState) => state.user.user);

    /**
    <div className="topnav">
        <Link className="active" to="#home">ERS</Link>
        <Link className="active" to={`/user/${user?.userId}`}>Reimbursement</Link>
        <div className="active opnav-right">
            <Link className="active" to={`/user/${user?.userId}`}>{`/user/${user?.firstName}`}</Link>
            <Link className="active" to="#about">Login/ Logout</Link>
        </div>
    </div>
     */
    return(
        <div className="topnav">
            <Link className="active" to="#home">ERS</Link>
            <Link className="active" to={`/user/${user?.userId}`}>Reimbursement</Link>
            <div className="active opnav-right">
                <Link className="active" to={`/user/${user?.userId}`}>{`/user/${user?.firstName}`}</Link>
                <Link className="active" to="#about">Login/ Logout</Link>
            </div>
        </div>
    )

}