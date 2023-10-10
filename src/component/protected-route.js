import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import UserContext from '../context/user-context';

const ProtectedRoute = () => {
  const {user} = useContext(UserContext);
  console.log(user);
  if (!user) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;