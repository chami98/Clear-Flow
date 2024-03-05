import logo from './logo.svg';
import './App.css';
import ComboBox from './ComboBox';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import SignInSide from './Pages/SignInSide';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route exact path="/dashboard" element={<Dashboard titlePlace="Publication" />} />
          <Route exact path="/login" element={<SignInSide />} />
        </Routes>
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
