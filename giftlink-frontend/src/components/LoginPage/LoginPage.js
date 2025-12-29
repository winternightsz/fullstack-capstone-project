import React, { useState,useEffect } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [incorrect, setIncorrect] = useState(''); // state for incorrect password.

    //local variable for `navigate`,`bearerToken`   and `setIsLoggedIn`.
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();


    //If the bearerToken has a value (user already logged in), navigate to MainPage
    useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
        navigate('/app')
    }
    }, [navigate])

const handleLogin = async () => {
    e.preventDefault();
    const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': bearerToken ? `Bearer ${bearerToken}` : '', // Include Bearer token if available
        },
        //Set body to send user details
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });

    // Access data coming from fetch API
    const json = await res.json();
        console.log('Json',json);
        if (json.authtoken) {
            // Set user details
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', json.userName);
            sessionStorage.setItem('email', json.userEmail);
            //Set the user's state to log in using the `useAppContext`.    
            setIsLoggedIn(true);
            navigate('/app');
        } else {
            //Clear input and set an error message if the password is incorrect
            document.getElementById("email").value="";
            document.getElementById("password").value="";
            setIncorrect("Wrong password. Try again.");
            setTimeout(() => {
                setIncorrect("");
            }, 2000);
        }
}


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span style={{color:'red',height:'.5cm',display:'block',fontStyle:'italic',fontSize:'12px'}}>{incorrect}</span>
                        </div>
                        
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>Login</button>
                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;