import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    image: '',
    bio: '',
  });


  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful registration
        // Assuming the server responds with a JWT token
        const data = await response.json();
        // Assuming the server responds with a token property in the JSON
        const token = data.token;
        localStorage.setItem('jwtToken', token);
        // Redirect to the chat page or any other page
        // Optionally, you can redirect from here or use react-router-dom history
        window.location.href = '/chat';
      } else {
        // Error in registration
        // Display error message to the user
        const errorData = await response.json();
        alert('Registration Error: '+ errorData.message);
      }
    } catch (error) {
  alert('Error: ' + error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {/* Registration Form */}
      <RegistrationForm onSubmit={handleSubmit} />
      <Link to="/login">
        <button>Already have an account? LogIn</button>
      </Link>
    </div>
  );
};

export default RegisterPage;
