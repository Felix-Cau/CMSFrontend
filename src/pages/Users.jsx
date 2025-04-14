import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import AddMemberModal from "../partials/sections/AddMemberModal";
import EditMemberModal from "../partials/sections/EditMemberModal";
import { useUser } from "../contexts/UserContext";

const Users = () => {
  const { users, getUsers, createUser, updateUser, deleteUser } = useUser();

  const [openDropdownUserId, setOpenDropdownUserId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleDropdown = (userId) => {
    setOpenDropdownUserId((prevId) => (prevId === userId ? null : userId));
  };

  const handleAdd = (formData) => {
    createUser(formData);
  };

  const handleEdit = (formData) => {
    updateUser(formData);
  };

  const handleDelete = ({ user }) => {
    deleteUser(user.id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div id="members">
      <div className="page-header">
        <h1 className="h2">Team Members</h1>
        <ModalButton
          type="add"
          target="#addMemberModal"
          text="Add User"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <button type="button" onClick={() => toggleDropdown(user.id)}>
                ...
              </button>
              {openDropdownUserId === user.id && (
                <div>
                  <button onClick={() => {
                    setSelectedUser(user); 
                    setIsEditModalOpen(true);
                    }}>Edit</button>
                  <button onClick={() => handleDelete({ user })}>
                    Delete User
                  </button>
                </div>
              )}
              <img src={user.imageName} />
              <h2>{user.name}</h2>
              <p>{user.jobTitle}</p>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
              <p>{user.role}</p>
            </div>
          ))
        ) : (
          <p>No members found.</p>
        )}
      </div>

      {isAddModalOpen && (<AddMemberModal
        id="addMemberModal"
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />
      )}

      {isEditModalOpen && (
        <EditMemberModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          userData={selectedUser}
        />
      )}
    </div>
  );
};

export default Users;
