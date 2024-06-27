import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

const PrivateRoute = () => {
  const { keycloak } = useKeycloak();

  return (
    keycloak.authenticated ? <Outlet/> : <Navigate to={"/"}/>
  )
}

export default PrivateRoute;