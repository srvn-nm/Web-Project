import React, { useState } from 'react';
import { useWebSocketContext } from './WebSocketContext';
import RegistrationForm from './RegistrationForm';

const RegisterPage = () => {
  const [formData] = useState({
    id: 0,
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    image: null,
    bio: '',
  });
  
  const { handleUrlChange } = useWebSocketContext();

const handleSubmit = async (e) => {
  e.preventDefault();
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
        
        // Do something with the token, for example, save it to localStorage
        localStorage.setItem('jwtToken', token);

        // Redirect to the chat page or any other page
        handleUrlChange('/chat');
      } else {
        // Error in registration
        // Display error message to the user
        const errorData = await response.json();
        console.error('Registration Error:', errorData.message);
      }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div>
      <h2>Register</h2>
      {/* Registration Form */}
      <RegistrationForm onSubmit={handleSubmit} />
    </div>
  );
};

export default RegisterPage;
