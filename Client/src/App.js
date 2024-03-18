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
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? <Dashboard titlePlace="Publication" /> : <Navigate to="/signin" />}
          />
          <Route
            path="/signin"
            element={!authenticated ? <SignInSide setAuthenticated={setAuthenticated} /> : <Navigate to="/" />}
          />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
