import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

//Pages
import Home from "./pages/Home/Home"
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path="/about" element={<About/>}/>
            </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
