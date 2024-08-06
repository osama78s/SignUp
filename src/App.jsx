import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import AuthProvider from './AuthContext/AuthContext';
import RequireAuth from './RequireAuth/RequireAuth';

const App = () => {
  return (
    <div className='container py-5 h-screen flex items-center justify-center'>
      <div className='max-w-[500px] w-[450px]'>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<RequireAuth>
                <Dashboard />
              </RequireAuth>} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  )
}

export default App