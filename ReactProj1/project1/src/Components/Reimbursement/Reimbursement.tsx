import React from 'react'
import {IReimbursement} from '../../Interfaces/IReimbursement';
import './Reimbursement.css';

interface ReimbursementProps {
    reimbursements: IReimbursement[];
}

export const Reimbursement:React.FC<ReimbursementProps> = ({reimbursements}:ReimbursementProps) => {
    return(
        <div className = "reimbursement">
            <thead>
                <tr className = "reimbursement-title">
                    <td>Amount</td><td>Submited Date</td><td>Resolved Date</td>
                    <td>Description</td><td>Author</td><td>Resolver</td><td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                reimbursements.map(reimburse => {
                    return <tr className = "reimbursement-detail"><td>{reimburse.amount}</td><td>{reimburse.submittedDate}</td>
                           <td>{reimburse.resolvedDate}</td><td>{reimburse.description}</td>
                           <td>{reimburse.reimbursementAuthor}</td><td>{reimburse.reimbursementResolver}</td>
                           <td>{reimburse.reimbursementStatus}</td>
                           </tr>
                })}
            </tbody>
        </div>
    )
}