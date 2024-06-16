import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInput = (e, type) => {
    switch (type) {
      case 'username':
        setUsernameInput(e.target.value);
        break;
      case 'password':
        setPasswordInput(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleLogin = async () => {
    const sendLoginData = {
      username: usernameInput,
      password: passwordInput,
    }

    if (!usernameInput.length || !passwordInput.length) {
      setError('All field must be completed')
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendLoginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      } else {
        const data = await response.json();
        console.log('Login successful:', data);
        
        // Save data to localStorage
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);

        // Redirect to home page after successful login
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  const handleRegister = () => {
    navigate("/register");
  }

  const renderError = () => {
    if(!error) return <div style={{height: "20px"}}></div>
    return (
      <div className="LoginWrapper_Login_PasswordWrapper_Error">
        {error}
      </div>
    );
  }

  return (
    <div className="LoginWrapper">
      <div className="LoginWrapper_Login">
        <div className="LoginWrapper_Login_Title">LOGIN</div>

        <div className="LoginWrapper_Login_UsernameWrapper">
          <div className="LoginWrapper_Login_UsernameWrapper_Label">Username:</div>
          <input value={usernameInput} onChange={(e) => handleInput(e, 'username')} />
        </div>
        
        <div className="LoginWrapper_Login_PasswordWrapper">
          <div className="LoginWrapper_Login_PasswordWrapper_Label">Password:</div>
          <input type='password' value={passwordInput} onChange={(e) => handleInput(e, 'password')} />
        </div>

        <div className="LoginWrapper_Login_LoginBtn">
          <button onClick={handleLogin}>Login</button>
        </div>

        <div className="LoginWrapper_Login_CreateAccount" onClick={handleRegister}>
          Do you want to create an Account?
        </div>

        {renderError()}
      </div>
    </div>
  );
};

export default Login;