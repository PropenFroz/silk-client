import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import TextField from "../components/textField";
import PasswordField from "../components/passwordField";
import logoPurwa from "../components/icons/logo-purwa.png"
import '../styles/style.css';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Memindahkan panggilan useHistory() ke sini

    const HandleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                history.push('/homepageKaryawan');
                console.log(data)
                console.log("Redirecting to welcome page...");
                
            } else {
                console.error('Response not ok:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            // Tangani kesalahan fetch
        }
    };

    return (
        <div className="hifi-login-page">
            <div className="group">
                <Button
                    brand="one"
                    className="button-instance"
                    divClassName="design-component-instance-node"
                    iconLeft={false}
                    size="m"
                    style="filled"
                    onClick={HandleLogin}
                >
                    Log In
                </Button>
                <TextField
                    className="text-field-instance"
                    description={false}
                    error={false}
                    fieldText="Email"
                    fieldTextClassName="text-field-3"
                    label1="Email Address"
                    labelClassName="text-field-2"
                    textarea={false}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <PasswordField
                    className="text-field-4"
                    description={false}
                    error={false}
                    fieldText="Password"
                    fieldTextClassName="text-field-3"
                    label1="Password"
                    labelClassName="text-field-2"
                    textarea={false}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="div">
                    <div className="group-2">
                        <div className="frame">
                            <div className="text-wrapper">PURWA</div>
                            <div className="div-wrapper">
                                <div className="text-wrapper-2">CARAKA</div>
                            </div>
                        </div>
                        <p className="paragraph">Please log in to your account.</p>
                    </div>
                    <img className="logo-purwa" alt="Logo purwa" src={logoPurwa} />
                </div>
            </div>
        </div>
    );
};

export default Login;
