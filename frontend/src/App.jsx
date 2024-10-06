import React from 'react'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const backendUrl = "https://job-sprouts-backend.onrender.com"

const App = () => {
  return (
    <>
    <ToastContainer/>
    <div style={{backgroundColor:"black"}}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
    </>
  )
}

export default App
