import logo from './logo.svg';
import './App.css';
import Qrcode from './component/Qrcode';
import Register from './component/register';
import Login from './component/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './component/Navbar';
import { Route, Routes } from 'react-router-dom';
import ScanQr from './component/ScanQr';

function App() {





  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Qrcode />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="scanqr" element={<ScanQr />}></Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
