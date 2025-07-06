import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Nav from './components/Nav.jsx';
import Root from './routes/Root.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import MyPage from './routes/MyPage.jsx';
import Search from './routes/Search.jsx';
import NotFound from './routes/NotFound.jsx';
import Exchange from './routes/Exchange.jsx';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  const changeState = useCallback((data) => {
    if (data.err) {
      console.log('error foundddd');
      setLoggedIn(false);
      setError('Please Try Again');
    } else if (data.loggedIn) {
      console.log('data.user.user_id', data.user);
      setLoggedIn(true);
      setUserId(data.user._id);
      setError(null);
    } else {
      setLoggedIn(false);
      setUserId(null);
      setError('Please Try Again');
    }
  }, []);

  const logOut = useCallback(() => {
    setLoggedIn(false);
    setUserId(null);
    setError(null);
  }, []);

  return (
    <div>
      <div className="header-container">
        <h1><a href="/">The Book Exchange</a></h1>
        <hr className="bottom-hr" />
      </div>
      <Router>
        <Nav logOut={logOut} loggedIn={loggedIn} userId={userId} />
        {/* Routes */}
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                changeState={changeState}
                loggedIn={loggedIn}
                userId={userId}
                error={error}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                changeState={changeState}
                loggedIn={loggedIn}
                userId={userId}
                error={error}
              />
            }
          />
          <Route path="/mypage" element={<MyPage loggedIn={loggedIn} userId={userId} />} />
          <Route path="/search" element={<Search loggedIn={loggedIn} userId={userId} />} />
          <Route path="/" element={<Root />} />
          <Route path="/:id" element={<NotFound />} />
          <Route path="/exchange" element={<Exchange loggedIn={loggedIn} userId={userId} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
