import React, { ReactNode, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../Store';
import { useNavigate } from 'react-router-dom';

import './ProfilePage.css';

export const ProfilePage: React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const reimbursements = useSelector((state:RootState) => state.reimbursements);
    const navigator = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    useEffect(() => {
        if(!userInfo.user){
            navigator("/login");
        }
        else if(userInfo.user && !reimbursements.reimbursements){
            //dispatch(getReimbursement(userInfo.user.userId));
        }

        console.log("Userstate: ", userInfo, "Reimbursements: ", reimbursements);
    }, [userInfo, reimbursements.reimbursements]);

    
    return(
        <form>
            {/* <label>Reimbursement Id</label>
            <input type="number" className="reimbursementId" onChange={handleReimbursementIdChange}/>
            <label>Amount</label>
            <input type="text" className="amount" onChange={handleAmountChange}/>
            <label>Submitted Date</label>
            <input type="text" className="submittedDate" onChange={handleSubmittedDateChange}/>
            <label>Resolved Date</label>
            <input type="text" className="submittedDate" onChange={handleResolvedDateChange}/>
            <label>Description</label>
            <textarea id="" className="description" onChange={handleDescriptionChange}></textarea>
            <label>Author</label>
            <input type="text" className="submittedDate" onChange={handlAuthorChange}/>
            <label>Resolver</label>
            <input type="text" className="submittedDate" onChange={handleResolverChange}/>
            <div><label>Status</label><br/>
            <select>
                    {statuses.map((status) => (
                    <option value={type.value} onChange={
                        handleStatusChange
                    }>{status.label}</option>
                    ))}
                </select>
            </div>
            <div><label>Type</label><br/>
                <select>
                    {types.map((type) => (
                    <option value={type.value} onChange={
                        handleTypeChange
                    }>{type.label}</option>
                    ))}
                </select>
            </div>
            <br/>
            <br/>
            <br/>
            <input type="submit" value="Submit" onClick={handleReimbursement}/>
            <input type="submit" value="Update"></input>
            <input type="submit" value="Delete"></input> */}
        </form>
    )

}