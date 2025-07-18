import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// ExchangeRow
// MyBookRow
// Nav
// SearchBookRow
// Exchange
// Login
// MyPage
// NotFound
// Register
// Root
// Search


import App from '../App.jsx';
import Nav from '../components/Nav.jsx';
import Login from '../routes/Login.jsx';
import Register from '../routes/Register.jsx';

describe('Testing React Components', () => {
  describe('Homepage', () => {

    // beforeAll(() => {
    //     component = render(<Nav />);
    // })

    test('Displays page title', () => {
      render(<App />)
      expect(screen.getByText(/The Book Exchange/i)).toBeInTheDocument()
    })
  })
  
  describe('Navbar', () => {
    test('Displays login when loggedIn is false', () => {
        const TestComponent = () => (
          <Router>
            <Nav loggedIn={false}/>
          </Router>
        );
        
        render(<TestComponent />);
        expect(screen.getByText(/Login/i)).toBeInTheDocument();
    })
    
    test('Displays register when loggedIn is false', () => {
        const TestComponent = () => (
          <Router>
            <Nav loggedIn={false}/>
          </Router>
        );
        
        render(<TestComponent />);
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    })

    test('Displays Home, My Books, My Requests, Find Books, and Log Out when loggedIn is true', () => {
        const TestComponent = () => (
          <Router>
            <Nav loggedIn={true}/>
          </Router>
        );
        
        render(<TestComponent />);
        expect(screen.getByText(/Home/i)).toBeInTheDocument();
        expect(screen.getByText(/My Books/i)).toBeInTheDocument();
        expect(screen.getByText(/My Requests/i)).toBeInTheDocument();
        expect(screen.getByText(/find books/i)).toBeInTheDocument();
        expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    })
  })
  describe('Logging Out', () => {
      test('Displays correct Nav when user clicks Logout', async () => {
        // Create a wrapper component that manages state properly
        const TestWrapper = () => {
          const [loggedIn, setLoggedIn] = React.useState(true);
          
          const logOut = () => {
            setLoggedIn(false);
          }

          return (
            <Router>
              <Nav logOut={logOut} loggedIn={loggedIn}/>
            </Router>
          );
        };

        render(<TestWrapper />);
        
        const user = userEvent.setup();
        
        // Initially should show logged in nav
        expect(screen.getByText(/Log out/i)).toBeInTheDocument();
        
        // Click logout
        await user.click(screen.getByText(/Log out/i));
        
        // After user logs out, expect to see login and register 
        await waitFor(() => {
          expect(screen.getByText(/Login/i)).toBeInTheDocument();
          expect(screen.getByText(/Register/i)).toBeInTheDocument();
        });
      })
  })

//end of parent block DONT DELETE
})
