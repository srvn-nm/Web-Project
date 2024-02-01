import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import ChatPage from './ChatPage';
import { WebSocketProvider } from './WebSocketContext';

const App = () => {
  return (
    <Router>
      <WebSocketProvider>
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/chat" component={ChatPage} />
        </Switch>
      </WebSocketProvider>
    </Router>
  );
};

export default App;
