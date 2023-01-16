import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import _ from 'underscore'


//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// hooks
import { useAuthentication } from './hooks/useAuthentication';
import { useState, useEffect } from 'react';

//context
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './context/AuthContext';

//Pages
import Home from "./pages/Home/Home"
import About from './pages/About/About';
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register';
import CreateTask from './pages/CreateTask/CreateTask';
import Task from './pages/Task/Task';


function App() {
  const [user, setUser] = useState({})
  const { userAuth } = useAuthentication()

  useEffect(() => {
    onAuthStateChanged(userAuth, (data?) => {
      if (data) {
        return setUser(data);
      } else {
        return setUser({});

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
              <Route path='/' element={!_.isEmpty(user) ? <Home /> : <Navigate to="/login" />} />
              <Route path="/createtask" element={!_.isEmpty(user) ? <CreateTask /> : <Navigate to="/login" />} />
              <Route path="/posts/:id" element={!_.isEmpty(user) ? <Task /> : <Navigate to="/login" />} />
              <Route path="/login" element={_.isEmpty(user) ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={_.isEmpty(user) ? <Register /> : <Navigate to="/" />} />
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
