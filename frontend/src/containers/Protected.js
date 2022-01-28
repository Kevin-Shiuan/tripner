import {  Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { signInContext } from '../context/userContext';

export default function Protected() {
    const [signIn, setSignIn] = useContext(signInContext);
  
    if (!signIn) {
      return <Navigate to="/sign_in" />;
    }
  
    return <Outlet />;
  }