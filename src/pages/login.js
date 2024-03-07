import React, { useState } from 'react';
import Button from '../components/button';
import TextField from "../components/textField";
import PasswordField from "../components/passwordField";
import logoPurwa from "../components/icons/logo-purwa.png"
import '../styles/style.css';

export const Login = () => {
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