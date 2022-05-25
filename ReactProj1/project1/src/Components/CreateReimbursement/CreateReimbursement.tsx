import React, {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store';

import { IReimbursement } from '../../Interfaces/IReimbursement';

import './CreateReimbursement.css';

export const CreateReimbursement: React.FC = () => {

    const currentUser = useSelector((state:RootState)=> state.user.user);
    const dispatch:AppDispatch = useDispatch();

    const [amount, setAmount] = useState<number>(0);
    const handleAmountChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    }
    
    const [submittedDate, setSubmittedDate] = useState<string>("");
    const handleSubmittedDateChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSubmittedDate(event.target.value);
    }

    const [description, setDescription] = useState<string>("");
    const handleDescriptionChange = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const [type, setType] = useState<any>();
    const handleTypeChange = (event:React.ChangeEvent<HTMLOptionElement>) => {
         setType(event.target.value);
    }


    const handleReimbursement = () => {
        if(currentUser){
            let reimbursement:IReimbursement = {
                reimbursementId: 0,
                amount: amount,
                submittedDate,
                resolvedDate: "",
                description: description,
                reimbursementAuthor: currentUser.userId,
                reimbursementResolver: 0,
                reimbursementStatus: 0,
                reimbursementType: type,
                reimbursementUser: currentUser
            }

            //dispatch(createReimbursement(reimbursement));
        }
    }

    useEffect(() => {
        console.log(amount);
    }, [amount])

    const types = [
        {
          label: "Lodging",
          value: 1,
        },
        {
          label: "Travel",
          value: 2,
        },
        {
          label: "Food",
          value: 3,
        },
        {
          label: "Other",
          value: 4,
        },
      ];

    return(
        <div className="create-container">
            <div className="content-container">
                <form>
                    <label>Amount</label>
                    <input type="text" className="amount" onChange={handleAmountChange}/>
                    <label>Submitted Date</label>
                    <input type="text" className="submittedDate" onChange={handleSubmittedDateChange}/>
                    <label>Description</label>
                    <textarea id="" className="description" onChange={handleDescriptionChange}></textarea>
                    <div><label>Type</label><br/>
                    <select>
                        {types.map((type) => (
                        <option value={type.value} onChange={
                            handleTypeChange
                        }>{type.label}</option>
                        ))}
                    </select></div>
                    <br/>
                    <br/>
                    <br/>
                    {/* <input type="submit" value="Submit" onClick={handleReimbursement}/>
                    <input type="submit" value="Update"></input>
                    <input type="submit" value="Delete"></input> */}
                </form>
            </div>
            <button className="create-btn" onClick={handleReimbursement}>Creat New Reimbursement</button>
        </div>
    )

}