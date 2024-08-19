import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

export function ComponentProtect({children}: {children: React.ReactNode}) {
  const ubi = localStorage.getItem('ubi');
  if (!ubi) {
    return <Navigate to='/' />;
  }
  return <>{children}</>;
}

export function ComponentProtectUser({userData}: {userData: {id: string}}) {
  if (!userData.id) {
    return <Navigate to={'/login'} />;
  }
  return <>{<Outlet />}</>;
}

export function ComponentProtectLoginSingup({userData}: {userData: {id: string}}) {
  if (userData.id) {
    return <Navigate to={'/myReport'} />;
  }
  return <>{<Outlet />}</>;
}
