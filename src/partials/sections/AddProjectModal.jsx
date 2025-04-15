import React, { useState, useEffect } from "react";
import { useClients } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";

//After creating Add & Edit Member modals i asked ChatGPT for creating a similar ones for the rest. I then checked and changed what was needed to make sure it is ok.

const AddProjectModal = ({ onClose, onSubmit }) => {
  const { clients, getClients } = useClients();
  const { users, getUsers } = useUser();

  useEffect(() => {
    getClients();
    getUsers();
  }, []);

  const [formData, setFormData] = useState({
    imageFile: null,
    projectName: "",
    clientId: "",
    description: "",
    startDate: "",
    endDate: "",
    projectOwnerId: "",
    budget: "",
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
      imageFile: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("imageFile", formData.imageFile);
    data.append("ProjectName", formData.projectName);
    data.append("ClientId", formData.clientId);
    data.append("Description", formData.description);
    data.append("StartDate", formData.startDate);
    data.append("EndDate", formData.endDate);
    data.append("ProjectOwnerId", formData.projectOwnerId);
    data.append("Budget", formData.budget);

    onSubmit(data);
    onClose();
  };

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
                name="imageFile"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Project Name"
                value={formData.projectName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="clientId">Client Name</label>
              <select
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
              >
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
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="projectOwnerId">Project Owner</label>
              <select
                id="projectOwnerId"
                name="projectOwnerId"
                value={formData.projectOwnerId}
                onChange={handleChange}
                required
              >
                <option value="">Select a project owner</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget">Budget</label>
              <input
                type="number"
                id="budget"
                name="budget"
                placeholder="Budget"
                value={formData.budget}
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