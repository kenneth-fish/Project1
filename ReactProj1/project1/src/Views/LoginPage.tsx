import axios from 'axios';
import React, {useContext, useState, Component} from 'react';

import './LoginPage.css';

export const LoginPage: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const handleUsernameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        console.log(event.target.value);
    }

    const [password, setPassword] = useState<string>("");
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        console.log(event.target.value);
    }

    const userInput = {
        username: username,
        password: password
      };

    const handleSubmit = () => {
        axios.post("http://localhost:8000/users/login", userInput).then((response) => {
            console.log(response.data);
            
            if(response.data.userRole == 1)
                alert("You're logged in as an Employee!");
                else{
                    alert("You're logged in as a Manager!");
                }
        });
    }

    return(
        <div className="row">
            <div className="login column">
                <form>
                    <div className="container">
                        <h2 id="header">Login Here</h2>
                        <label>Username</label><br/>
                        <input autoComplete="off" className="login-input" type="text" placeholder="username" name="username" onChange={handleUsernameChange}/><br/>

                        <label >Password</label><br/>
                        <input autoComplete="off" className="login-input" type="password" name="password" placeholder="password" onChange={handlePasswordChange}/><br/><br/>

                        <button className="login-button" onClick={handleSubmit}>Login</button><br/>
                        
                        <span>Not registerd? &nbsp;&nbsp;<a href="#">Create an account</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}