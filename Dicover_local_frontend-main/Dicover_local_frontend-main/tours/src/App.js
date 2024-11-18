import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import './App.css'; // Include CSS here
import HomePage from './Home/HomePage';
import Packages from "./Packages/Packages";
import PackageDetail from "./Packages/PackageDetail";
import Places from './Places/Places';
import AboutUsPage from './About us/AboutUsPage';
import Navbar from './Navbar';
import UserProfile from './Userprofile/UserProfile';
import Guides from './Places/Guide';
import Cabs from './Places/Cabs';
import AdminPanel from './Admin/Admin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure the CSS is included
import TransactionPage from './Transaction/Transaction';
function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path='/navbar' element={<Navbar/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/package" element={<Packages />} /> 
         <Route path="/package/:id" element={<PackageDetail />} />
         <Route path="/places" element={<Places/>}/>
         <Route path="/aboutus" element={<AboutUsPage/>}/>
         <Route path="/userprofile" element={<UserProfile/>}/>
         <Route path="/guide" element={<Guides/>}/>
         <Route path="/cabs" element={<Cabs/>}/>
         <Route path="/admin" element={<AdminPanel/>}/>
         <Route path="/transaction" element={<TransactionPage/>}/>
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Router>
  );
}

export default App;
