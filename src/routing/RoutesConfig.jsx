import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from './ProtectedRoutes'

import PortalLayout from '../pages/layouts/PortalLayout'
import CenterScreenLayout from '../pages/layouts/CenterScreenLayout'

import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Projects from '../pages/Projects'
import Users from '../pages/Users'
import Clients from '../pages/Clients'

const routesConfig = [
  {
    element: <CenterScreenLayout />,
    children: [
      { path: "/", element: <Navigate to="/signin" replace /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> }
    ]
  },
  {
    element: (
      <ProtectedRoute>
        <PortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/projects", element: <Projects /> },
      { path: "/users", element: <AdminRoute><Users /></AdminRoute> },
      { path: "/clients", element: <AdminRoute><Clients /></AdminRoute> },
      { path: "*", element: <Navigate to="/admin/projects" replace /> }
    ]
  },

]

export default routesConfig;