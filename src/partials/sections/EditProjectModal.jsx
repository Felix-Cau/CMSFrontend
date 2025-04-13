import React, { useState, useEffect } from "react";
import { useClients } from "../../contexts/ClientContext";
import { useUser } from "../../contexts/UserContext";
import { useProj } from "../../contexts/ProjectContext";

const EditProjectModal = ({ isOpen, onClose, onSubmit, projectData }) => {
  const { clients, getClients } = useClients();
  const { users, getUsers } = useUser();
  const { statuses, getStatuses } = useProj();

  const [formData, setFormData] = useState({
    ImageFile: null,
    ProjectName: "",
    ClientId: "",
    Description: "",
    StartDate: "",
    EndDate: "",
    ProjectOwnerId: "",
    Budget: "",
    StatusId: "",
  });

  useEffect(() => {
    getClients();
    getUsers();
    getStatuses();
  }, []);

  useEffect(() => {
    if (projectData) {
      setFormData({
        ImageFile: null,
        ProjectName: projectData.projectName || "",
        ClientId: projectData.clientId || "",
        Description: projectData.description || "",
        //AI Generated.
        StartDate: projectData.startDate
          ? projectData.startDate.substring(0, 10)
          : "",
        EndDate: projectData.endDate
          ? projectData.endDate.substring(0, 10)
          : "",
        ProjectOwnerId: projectData.projectOwnerId || "",
        Budget: projectData.budget ? projectData.budget.toString() : "",
        StatusId: projectData.statusId ? projectData.statusId.toString() : "",
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
      <div className="modal" id="editProjectModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Edit Project</h2>
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
              <label htmlFor="clientId">Client Name</label>
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
              <label htmlFor="projectOwnerId">Project Owner</label>
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
            <div>
              <label htmlFor="statusId">Project Status</label>
              <select
                id="statusId"
                name="StatusId"
                value={formData.StatusId}
                onChange={handleChange}
                required>
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
