import React, {useState} from 'react';
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const {loggedInUser, signOut} = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <header className="header">
      <img src={loggedInUser.imageName} alt="User Image" onClick={() => toggleDropdown()} />
      { isDropdownOpen && (
        <div>
          <div>
            <img src={loggedInUser.imageName} alt="User Image" onClick={() => toggleDropdown()} />
            <p>{`${loggedInUser.name}`}</p>
          </div>
          <div>
            <i class="fa-solid fa-gear"></i><span> Dark Mode</span>
          </div>
          <button onClick={() => signOut()}>
            <i className="fa fa-sign-out-alt"></i>
            sign out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header