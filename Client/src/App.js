import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ComboBox from './ComboBox';
import Dashboard from './Components/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInSide from './Pages/SignInSide';
import AdminDashboard from './Pages/AdminDashboard'

function App() {
  // Initialize authenticated state with the value retrieved from localStorage or default to false
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  const [worksAt, setWorksAt] = useState("");
  const [isAssetAdministrator, setIsAssetAdministrator] = useState(false); // State to track if user is an Asset Administrator

  useEffect(() => {
    // Update the authentication state in localStorage whenever it changes
    localStorage.setItem('isAuthenticated', authenticated);
  }, [authenticated]); // Dependency array ensures this effect runs when authenticated state changes

  useEffect(() => {
    // Check if the user is authenticated and works as an Asset Administrator
    if (authenticated && worksAt === "Asset Administrator") {
      setIsAssetAdministrator(true);
    } else {
      setIsAssetAdministrator(false);
    }
  }, [authenticated, worksAt]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? (isAssetAdministrator ? <Navigate to="/assetAdministrator" /> : <Dashboard titlePlace={worksAt} setAuthenticated={setAuthenticated} />) : <Navigate to="/signin" />}
          />
          <Route
            path="/assetAdministrator"
            element={isAssetAdministrator ? <AdminDashboard titlePlace={worksAt} /> : <Navigate to="/" />} // Render AdminDashboard if isAssetAdministrator is true
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
