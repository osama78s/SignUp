import React, { useRef, useState } from 'react';
import { Button, Card, Label, TextInput, Alert } from "flowbite-react";
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const email = useRef();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      setMessage('Check Your Inbox To Get Your Password')
      await resetPassword(email.current.value);
    }
    catch {
      setError('Faild To Reset Password');
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          Reset Password
        </h1>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        {message && (
          <Alert color="success">
            <span className="font-medium">{message}</span>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handelSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your Email" />
            </div>
            <TextInput id="email1" type="email" ref={email} required />
          </div>
          <Button type="submit" disabled={loading}>Reset Password</Button>
          <div className="text-center">
            <Link className='underline text-[#0E7490]' to={'/login'}>Login</Link>
          </div>
        </form>
      </Card>
      <div className='mt-4 text-center'>
        Need an account ? <Link className='underline text-[#0E7490]' to={'/signup'}>SignUp</Link>
      </div>
    </>
  )
}

export default ForgotPassword