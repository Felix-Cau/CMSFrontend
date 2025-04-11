import React, { useEffect, useState } from 'react';
import ModalButton from '../partials/components/ModalButton';
import {useUser} from '../contexts/UserContext';

const Users = () => {
  const {users, getUsers, deleteUser} = useUser();

  const [showDropdownMenu, setDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropDown((prev) => !prev);
  }

  const handleEdit = ({user}) => {

  }

  const handleDelete = ({user}) => {
    deleteUser(user.id)
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div id="members">
      <div className="page-header">
        <h1 className="h2">Team Members</h1>
        <ModalButton type="add" target="#addMemberModal" text="Add User" />
      </div>

      <div>
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id}>
              <button type="button" onClick={toggleDropdown}>
                test
              </button>
              {showDropdownMenu && (
                <div>
                    <button onClick={() => handleEdit({user})}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete({user})}>
                      Delete User
                    </button>
                </div>
              )}
              <img src={user.imageName} /> 
              <h2>{user.name}</h2>
              <p>{user.jobTitle}</p>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
              <p>{user.Role}</p>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  )
}

export default Users