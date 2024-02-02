import LoginForm from './LoginForm';
import React from 'react';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful login
        // Assuming the server responds with a JWT token
        const data = await response.json();
        // Assuming the server responds with a token property in the JSON
        const token = data.token;

        // Do something with the token, for example, save it to localStorage
        localStorage.setItem('jwtToken', token);

        // Redirect to the chat page or any other page
        // Optionally, you can redirect from here or use react-router-dom history
        window.location.href = '/chat';
      } else {
        // Error in login
        // Display error message to the user
        const errorData = await response.json();
        alert('Login Error: '+ errorData.message);
      }
    } catch (error) {
      alert('Error: '+ error);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/register', { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Login Form */}
      <LoginForm onSubmit={handleLogin} />

      <button onClick={handleNavigate}>Don't have an account? SignUp</button>
    </div>
  );
};

export default LoginPage;
