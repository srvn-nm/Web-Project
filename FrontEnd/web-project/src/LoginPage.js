import LoginForm from './LoginForm';
import { useWebSocketContext } from './WebSocketContext';

const LoginPage = () => {
  const { handleUrlChange } = useWebSocketContext();

  const handleLogin = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
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
        handleUrlChange('/chat');
      } else {
        // Error in login
        // Display error message to the user
        const errorData = await response.json();
        console.error('Login Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Login Form */}
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
