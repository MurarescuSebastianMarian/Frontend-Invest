import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';

const Register = () => {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInput = (e, type) => {
    switch (type) {
      case 'firstName':
        setFirstNameInput(e.target.value);
        break;
      
      case 'lastName':
        setLastNameInput(e.target.value);
        break;
        
      case 'email':
        setEmailInput(e.target.value);
        break;
        
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

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    const sendRegisterData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
      username: usernameInput,
      password: passwordInput,
    }

    if (
      !firstNameInput.length ||
      !lastNameInput.length ||
      !emailInput.length ||
      !usernameInput.length ||
      !passwordInput.length
    ) {
      setError('All field must be completed')
      return;
    }
    
    if (!validateEmail(emailInput)) {
      setError('Invalid email format');
      return;
    }

    setError('');
    try {
      const response = await fetch('https://investment-advisor-34a577bbf232.herokuapp.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendRegisterData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      } else {
        const data = await response.json();
        console.log('Registration successful:', data);
        
        // // Save data to localStorage
        // localStorage.setItem('accessToken', data.accessToken);
        // localStorage.setItem('userId', data.userId);
        // localStorage.setItem('username', data.username);
        // localStorage.setItem('email', data.email);

        // Redirect to home page after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration');
    }
  };

  const handleHaveAccount = () => {
    navigate("/login");
  }

  const renderError = () => {
    if(!error) return <div style={{height: "20px"}}></div>
    return (
      <div className='RegisterWrapper_Error'>
        {error}
      </div>
    );
  }

  return (
    <div className="RegisterWrapper">
      <div className="RegisterWrapper_Register">
        <div className="RegisterWrapper_Register_Title">Register</div>

        <div className="RegisterWrapper_Register_FirstNameWrapper">
          <div className="RegisterWrapper_Register_FirstNameWrapper_Label">First Name:</div>
          <input value={firstNameInput} onChange={(e) => handleInput(e, 'firstName')} />
        </div>

        <div className="RegisterWrapper_Register_LastNameWrapper">
          <div className="RegisterWrapper_Register_LastNameWrapper_Label">Last Name:</div>
          <input value={lastNameInput} onChange={(e) => handleInput(e, 'lastName')} />
        </div>

        <div className="RegisterWrapper_Register_EmailWrapper">
          <div className="RegisterWrapper_Register_EmailWrapper_Label">Email:</div>
          <input value={emailInput} onChange={(e) => handleInput(e, 'email')} />
        </div>

        <div className="RegisterWrapper_Register_UsernameWrapper">
          <div className="RegisterWrapper_Register_UsernameWrapper_Label">Username:</div>
          <input value={usernameInput} onChange={(e) => handleInput(e, 'username')} />
        </div>
        
        <div className="RegisterWrapper_Register_PasswordWrapper">
          <div className="RegisterWrapper_Register_PasswordWrapper_Label">Password:</div>
          <input value={passwordInput} onChange={(e) => handleInput(e, 'password')} />
        </div>

        <div className="RegisterWrapper_Register_RegisterBtn">
          <button onClick={handleRegister}>Register</button>
        </div>

        <div className="RegisterWrapper_Register_HaveAccount" onClick={handleHaveAccount}>
          Do you have an account?
        </div>

        {renderError()}
      </div>
    </div>
  );
};

export default Register;