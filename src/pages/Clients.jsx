import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import { useClients } from "../contexts/ClientContext";
import AddClientModal from "../partials/sections/AddClientModal";
import EditClientModal from "../partials/sections/EditClientModal";

//This JSX is created via taking the finished Users.jsx, feeding it to ChatGPT to get help to quicken the process. Then I checked it to make sure everything is ok and changed what was necissary.

const Clients = () => {
  const { clients, getClients, createClient, updateClient, deleteClient } = useClients();

  const [openDropdownClientId, setOpenDropdownClientId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const toggleDropdown = (clientId) => {
    setOpenDropdownClientId((prevId) => (prevId === clientId ? null : clientId));
  };

  const handleAdd = (formData) => {
    createClient(formData);
  };

  const handleEdit = (formData) => {
    updateClient(formData);
  };

  const handleDelete = ({ client }) => {
    deleteClient(client.id);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div id="clients">
      <div className="page-header">
        <h1 className="h2">Clients</h1>
        <ModalButton
          type="add"
          target="#addClientModal"
          text="Add Client"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      {clients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <div>{client.clientName}</div>
                  <div>{client.email}</div>
                </td>
                <td>{client.phone || "Not available"}</td>
                {/* AI generated date logic */}
                <td>{new Date(client.created).toLocaleDateString()}</td>
                <td>{client.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button type="button" onClick={() => toggleDropdown(client.id)}>
                    ...
                  </button>
                  {openDropdownClientId === client.id && (
                    <div>
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setIsEditModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete({ client })}>
                        Delete Client
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found.</p>
      )}

      {isAddModalOpen && (
        <AddClientModal
          id="addClientModal"
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
        />
      )}

      {isEditModalOpen && (
        <EditClientModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          clientData={selectedClient}
        />
      )}
    </div>
  );
};

export default Clients;