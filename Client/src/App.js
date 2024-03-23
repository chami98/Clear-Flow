import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ComboBox from './ComboBox';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInSide from './Pages/SignInSide';

function App() {
  // Initialize authenticated state with the value retrieved from localStorage or default to false
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [worksAt, setWorksAt] = useState("");

  useEffect(() => {
    // Update the authentication state in localStorage whenever it changes
    localStorage.setItem('isAuthenticated', authenticated);
  }, [authenticated]); // Dependency array ensures this effect runs when authenticated state changes

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? <Dashboard titlePlace={worksAt} setAuthenticated={setAuthenticated} /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signin"
            element={!authenticated ? <SignInSide setAuthenticated={setAuthenticated} setWorksAt={setWorksAt} /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
