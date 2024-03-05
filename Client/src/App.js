import logo from './logo.svg';
import './App.css';
import ComboBox from './ComboBox';
import Dashboard from './Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInSide from './Pages/SignInSide';

function App() {
  return (
    <>
      <Dashboard titlePlace="Publication" />
      {/* <SignInSide /> */}
      <ToastContainer />
    </>
  );
}

export default App;
