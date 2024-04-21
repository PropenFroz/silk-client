import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import TextField from "../components/textField";
import PasswordField from "../components/passwordField";
import logoPurwa from "../components/icons/logo-purwa.png"
import '../styles/style.css';

import { orderApi } from '../components/auth/context/OrderApi'
import { useAuth } from '../components/auth/context/AuthContext'
import { parseJwt, handleLogError } from '../components/auth/context/Helpers'


export const Login = () => {
    
    const Auth = useAuth()
    const isLoggedIn = Auth.userIsAuthenticated()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false)
    const history = useHistory(); // Memindahkan panggilan useHistory() ke sini
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e, { name, value }) => {
        if (name === 'username') {
          setUsername(value)
        } else if (name === 'password') {
          setPassword(value)
        }
      }

    const HandleLogin = async () => {
        try {
            const response = await orderApi.authenticate(username, password)
    
            console.log("ini response ", JSON.stringify(response))

            const { accessToken } = response.data
            console.log("ini accessToken", accessToken)
                    
            const data = parseJwt(accessToken)
            console.log("ini data", JSON.stringify(data))
        
            const authenticatedUser = { data, accessToken }
            console.log("ini authenticatedUser" + authenticatedUser)
            
            Auth.userLogin(authenticatedUser)
            
            setUsername('')
            setPassword('')
            setIsError(false)
            
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 403) {
                // Tangani kasus ketika respons memiliki status kode 403 (Forbidden)
                setErrorMessage('Username atau password tidak sesuai!');
            } else {
                // Tangani kasus lainnya, seperti kesalahan jaringan atau kesalahan server
                setErrorMessage('Terjadi kesalahan saat melakukan login.');
            }

        }
    
    }; 

    if (isLoggedIn) {
               
        if (Auth.getUser().data.role[0] === 'Admin') {
            history.push('/admin/daftar-akun');
            return null;
        }
        else if (Auth.getUser().data.role[0] === 'Karyawan') {
            history.push('/homepage-karyawan');
            return null;
        }
        else if (Auth.getUser().data.role[0] === 'Eksekutif') {
            history.push('/homepage-karyawan');
            return null;
        }
        else if (Auth.getUser().data.role[0] === 'Guru') {
            history.push('/homepage-guru');
            return null;
        }

    }
     

    return (
        <div className="hifi-login-page">
        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
