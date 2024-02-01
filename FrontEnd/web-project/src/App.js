// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import { WebSocketProvider } from './WebSocketContext';

const App = () => {
  return (
    <Router>
      <WebSocketProvider>
        <div>
          <nav>
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
          </nav>

          <Switch>
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/chat" component={ChatPage} />
          </Switch>
        </div>
      </WebSocketProvider>
    </Router>
  );
};

export default App;
