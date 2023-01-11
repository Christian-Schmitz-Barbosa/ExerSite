import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// hooks
import { useAuthentication } from './hooks/useAuthentication';
import { useState, useEffect } from 'react';

//Pages
import Home from "./pages/Home/Home"
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from './context/AuthContext';

function App() {
  const [user, setUser] = useState({})
  const { userAuth } = useAuthentication()

  useEffect(() => {
    onAuthStateChanged(userAuth, (data?) => {
      if (data) {
        return setUser(data);
      } else {
        setUser({})
      }
    })
  }, [userAuth])

  return (
    <div className="App">
      <AuthProvider value={user}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={Object.keys(user).length > 0 ? <Home /> : <Navigate to="/login" />} />
              <Route path="/login" element={Object.keys(user).length === 0 ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={Object.keys(user).length === 0 ? <Register /> : <Navigate to="/" />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
