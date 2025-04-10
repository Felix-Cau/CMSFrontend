import React from 'react'
import { AuthProvider } from './contexts/AuthContext'

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