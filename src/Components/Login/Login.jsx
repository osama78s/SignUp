import React, { useState, useRef } from 'react'
import { Alert, Button, Card, Label, TextInput } from "flowbite-react";
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { HiInformationCircle } from "react-icons/hi";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email.current.value, password.current.value)
      navigate(redirectPath, { replace: true })
    }
    catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError('Failed to login. Please try again.');
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Card onSubmit={handelSubmit}>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          Login
        </h1>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your Email" />
            </div>
            <TextInput id="email1" type="email" ref={email} required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput id="password1" type="password" ref={password} required />
          </div>
          <Button type="submit" disabled={loading}>Login</Button>
          <div className="text-center">
            <Link className='underline text-[#0E7490]' to={'/forgot-password'}>Forgot Password</Link>
          </div>
        </form>
      </Card>
      <div className='mt-4 text-center'>
        Need an account ? <Link className='underline text-[#0E7490]' to={'/signup'}>SignUp</Link>
      </div>
    </>
  )
}

export default Login