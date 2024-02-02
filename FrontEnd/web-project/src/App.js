import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes/*, Link */} from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import { WebSocketProvider } from './WebSocketContext';

const App = () => {
  const [userData, setUserData] = useState(null);

  const handleUserDataChange = (data) => {
    setUserData(data);
    localStorage.setItem("userId", data);
  };

  return (
    <Router>
      <WebSocketProvider>
        <div>
          {/* <nav>
            <ul>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </nav> */}
          <LoginPage onUserDataChange={handleUserDataChange} />

          <Routes>
            <Route
              exact
              path="/register"
              element={<RegisterPage onUserDataChange={handleUserDataChange} />}
            />

            <Route
              exact
              path="/login"
              element={<LoginPage onUserDataChange={handleUserDataChange} />}
            />

            <Route
              exact
              path="/chat"
              element={<ChatPage userData={userData} />}
            />
          </Routes>
        </div>
      </WebSocketProvider>
    </Router>
  );
};

export default App;