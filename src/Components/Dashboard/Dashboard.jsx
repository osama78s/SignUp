import React, { useState } from 'react';
import { Button, Card } from "flowbite-react";
import { useAuth } from '../../AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handelLogOut = async () => {
    try{
      await logOut();
      navigate('/login')
    }catch{
      setError('Faild To Log out')
    }
  }
  
  return (
    <>
      <Card>
        <h1 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
          Profile
        </h1>
        {error && (
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">{error}</span>
          </Alert>
        )}
        <div className="text-center">Email: {currentUser && currentUser.email}</div>
      </Card>
      <div className="mt-4">
        <Button className='mx-auto' onClick={handelLogOut}>Log out</Button>
      </div>
    </>
  )
}

export default Dashboard