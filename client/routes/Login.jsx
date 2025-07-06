import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = ({ changeState, loggedIn, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/verifyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('user from server:', data);
      changeState(data);
    } catch (err) {
      console.error('client error:', err);
    }
  };

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="usercred-box">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="usercred-title">Book Exchange</div>
      <form className="usercred-form" onSubmit={login}>
        <input
          type="text"
          placeholder="enter username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="enter password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
};

export default Login;
