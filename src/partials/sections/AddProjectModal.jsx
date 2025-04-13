import React, { useState, useEffect } from "react";
import { useClients, getClients } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";

const AddProjectModal = ({ isOpen, onClose, onSubmit }) => {
  const { clients, getClients } = useClients();
  const { users, getUsers } = useUser();

  useEffect(() => {
    getClients();
    getUsers();
  }, []);

  const [formData, setFormData] = useState({
    ImageFile: null,
    ProjectName: "",
    ClientId: "",
    Description: "",
    StartDate: "",
    EndDate: "",
    ProjectOwnerId: "",
    Budget: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      ImageFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <section>
      <div className="modal" id="addProjectModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Add Project</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                name="ImageFile"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="ProjectName"
                placeholder="Project Name"
                value={formData.ProjectName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="clientId">Client ID</label>
              <select
                id="clientId"
                name="ClientId"
                value={formData.ClientId}
                onChange={handleChange}
                required>
                <option value="">Select a client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.clientName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="Description"
                placeholder="Description"
                value={formData.Description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="StartDate"
                value={formData.StartDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="EndDate"
                value={formData.EndDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="projectOwnerId">Project Owner ID</label>
              <select
                id="projectOwnerId"
                name="ProjectOwnerId"
                value={formData.ProjectOwnerId}
                onChange={handleChange}
                required>
                <option value="">Select a project owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.Name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="Budget"
                placeholder="Budget"
                value={formData.Budget}
                onChange={handleChange}
                step="0.01"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProjectModal;
