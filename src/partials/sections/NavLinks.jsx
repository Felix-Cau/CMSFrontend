import React from 'react'
import NavLinkItem from '../components/NavLinkItem'
import { useAuth } from '../../contexts/AuthContext'

const NavLinks = () => {
  const {isAdmin} = useAuth()

  return (
    <nav className="nav-links">
        <NavLinkItem to="/projects" text="Projects" iconClass="fa-duotone fa-solid fa-briefcase"  />
        
        {isAdmin && (
        <>
          <NavLinkItem to="/users" text="Members" iconClass="fa-duotone fa-solid fa-user-group" />
          <NavLinkItem to="/clients" text="Clients" iconClass="fa-duotone fa-solid fa-handshake" />
        </>
      )}
        
    </nav>
  )
}

export default NavLinks