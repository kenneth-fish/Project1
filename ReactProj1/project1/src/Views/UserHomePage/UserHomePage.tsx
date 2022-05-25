import React, { ReactNode, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from '../../Components/Navbar/Navbar';
import { RootState, AppDispatch } from '../../Store';
import { Navigate, useNavigate } from 'react-router-dom';

import { createReimbursement, getReimbursementById, getReimbursements } from '../../Slices/ReimbursementSlice';

import { CreateReimbursement } from '../../Components/CreateReimbursement/CreateReimbursement';
import { Loading } from '../../Components/Loading/Loading';
import { Reimbursement } from '../../Components/Reimbursement/Reimbursement';
import { IReimbursement } from '../../Interfaces/IReimbursement';
import { getUserDetails, logout } from '../../Slices/UserSlice';

//import './FeedPage.css';

export const UserHomePage: React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursements = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        //If user not logged in, push them to the login page
        if(!userInfo.user){
            navigator("/login");
        }
        //If user logged in, get their reimbursements
        else if(userInfo.user && !reimbursements.reimbursements){
            dispatch(getReimbursements());
        }

        console.log("Userstate: ", userInfo, "Reimbursements: ", reimbursements);
    }, [userInfo, reimbursements.reimbursements]);

    const handleViewProfile = (event:React.MouseEvent<HTMLButtonElement>) => {

        let id = userInfo.user?.userId;

        dispatch(getUserDetails(id));
    }

    const handleViewReimbursement = (event:React.MouseEvent<HTMLButtonElement>) => {

        let id = userInfo.user?.userId;

        dispatch(getReimbursementById(id));
    }

    const handleViewAllReimbursements = (event:React.MouseEvent<HTMLButtonElement>) => {

        let id = userInfo.user?.userId;

        dispatch(getReimbursementById(id));
    }

    const handleLogout = (event:React.MouseEvent<HTMLButtonElement>) => {
        dispatch(logout());
    }

    if(userInfo.user?.role == 1){
        return(
            <div>
                <button className="profile-button" onClick={()=> {handleViewProfile; {<Navigate to="/feed" replace />}}}>View Profile</button><br/>
                <button className="remb-button" onClick={handleViewReimbursement}>View My Reimbursement Requests</button><br/>
                <button className="newReimb-button" onClick={()=> {{<Navigate to="/user/view" replace />}}}>Create New Reimbursement Request</button><br/>
                <button className="logout-button" onClick={handleLogout}>Logout</button><br/>
            </div>
        )
    }
    else if (userInfo.user?.role == 2){
        return(
            <div>
                <button className="profile-button" onClick={handleViewProfile}>View Profile</button><br/>
                <button className="remb-button" onClick={handleViewAllReimbursements}>View All Reimbursement Requests</button><br/>
                <button className="logout-button" onClick={handleLogout}>Logout</button><br/>
            </div>
        )
    }
    else{
        return(
            <div>
                <button className="newReimb-button" onClick={()=> {{<Navigate to="/login" replace />}}}>Login</button><br/>
            </div>
        )
    }
    

    /*
    {posts.posts ? posts.posts.map((post:IPost) => {
                    return <Post {...post} key={post.postId} />
                }) :
                <Loading />
                }
    */

}