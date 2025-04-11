import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { UserProvider } from './contexts/UserContext'
import { ClientProvider } from './contexts/ClientContext'
import { ProjectProvider } from './contexts/ProjectContext'

const Providers = ({children}) => {
  return (
    <>
    <AuthProvider>
      <UserProvider>
        <ClientProvider>
          <ProjectProvider>
            {children}  
          </ProjectProvider>
        </ClientProvider>
      </UserProvider>
    </AuthProvider>
    </>
  )
}

export default Providers