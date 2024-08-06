import React, { useRef, useState } from 'react';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const SignUp = () => {
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useRef();
  const password = useRef();
  const confirmationPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password.current.value !== confirmationPassword.current.value) {
      return setError('Passwords do not match');
    }

    // Check if password is at least 6 characters long
    if (password.current.value.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(email.current.value, password.current.value);
      navigate('/');
    } catch (error) {
      setError('This account already exists.');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          Signup
        </h1>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2" value="Password Confirmation" />
            </div>
            <TextInput id="password2" type="password" ref={confirmationPassword} required />
          </div>
          <Button type="submit" disabled={loading}>Signup</Button>
        </form>
      </Card>
      <div className='mt-4 text-center'>
        Already have an account? <Link className='underline text-[#0E7490]' to={'/login'}>Login</Link>
      </div>
    </>
  );
};

export default SignUp;
