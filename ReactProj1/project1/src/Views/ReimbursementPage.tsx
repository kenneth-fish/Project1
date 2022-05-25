import React, { useEffect } from 'react';

import './ProfilePage.css';
import axios from 'axios';

export const ReimbursementPage:React.FC = () => {

    const handleView = () => {
        axios.post("http://localhost:8000/users/login", 2).then((response) => {
            console.log(response.data);
        });

        axios.get("http://localhost:8000/users/viewall").then((response) => {
            console.log(response.data);
        });

    }

    return (
        <div>
            <table>
            <caption>Reimbursements</caption> 
            <thead>
                <tr>
                <th>Reimbursement ID</th><th>Amount</th><th>Submitted Date</th>
                <th>Resolved Date</th><th>Description</th><th>Author</th>
                <th>Resolver</th>
                <th>
                    <select name="status" id="status">
                    <option value="all">Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                    </select>
                </th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th></th>
                <td></td><td></td><td></td>
                <td></td><td></td><td></td>
                <td></td><td></td>
                </tr>
            </tbody>

            <button className="login-button" onClick={handleView}>Show JSON</button><br/>
        </table>
        </div>
    )
}