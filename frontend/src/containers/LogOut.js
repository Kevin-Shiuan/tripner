import {  Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { signInContext } from '../context/userContext';

export default function LogOut() {
    const [signIn, setSignIn] = useContext(signInContext);

    setSignIn(false);
  
    return <Navigate to="/sign_in" />;
  }