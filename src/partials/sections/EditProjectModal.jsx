import React, { useState, useEffect } from "react";
import { useClients } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";
import { useProj } from "../../contexts/ProjectContext";

//After creating Add & Edit Member modals i asked ChatGPT for creating a similar ones for the rest. I then checked and changed what was needed to make sure it is ok.
//The date handling is only AI generated.

const EditProjectModal = ({ onClose, onSubmit, projectData }) => {
  const { clients, getClients } = useClients();
  const { users, getUsers } = useUser();
  const { statuses, getStatuses } = useProj();

  const [formData, setFormData] = useState({
    id: "",
    imageFile: null,
    projectName: "",
    clientId: "",
    description: "",
    startDate: "",
    endDate: "",
    projectOwnerId: "",
    budget: "",
    statusId: "",
  });

  useEffect(() => {
    getClients();
    getUsers();
    getStatuses();
  }, []);

  useEffect(() => {
    if (projectData) {
      setFormData({
        id: projectData.id,
        imageFile: null,
        projectName: projectData.projectName || "",
        clientId: projectData.clientId || "",
        description: projectData.description || "",

        startDate: projectData.startDate
          ? projectData.startDate.substring(0, 10)
          : "",
        endDate: projectData.endDate
          ? projectData.endDate.substring(0, 10)
          : "",
        projectOwnerId: projectData.projectOwnerId || "",
        budget: projectData.budget ? projectData.budget.toString() : "",
        statusId: projectData.statusId ? projectData.statusId.toString() : "",
      });
    }
  }, [projectData]);

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
  
    data.append("id", formData.id);
    if (formData.imageFile) {
      data.append("newImageFile", formData.imageFile);
    }
    data.append("projectName", formData.projectName);
    data.append("clientId", formData.clientId);
    data.append("description", formData.description);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("projectOwnerId", formData.projectOwnerId);
    data.append("budget", formData.budget);
    data.append("statusId", formData.statusId);

    onSubmit(data);
    onClose();
  };

  return (
    <section>
      <div className="modal" id="editModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Edit Project</h2>
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
            <div>
              <label htmlFor="statusId">Project Status</label>
              <select
                id="statusId"
                name="statusId"
                value={formData.statusId}
                onChange={handleChange}
                required
              >
                <option value="">Select a status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.statusName}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProjectModal;