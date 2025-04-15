import React, { useEffect, useState } from "react";
import ModalButton from "../partials/components/ModalButton";
import { useProj } from "../contexts/ProjectContext";
import AddProjectModal from "../partials/sections/AddProjectModal";
import EditProjectModal from "../partials/sections/EditProjectModal";

//This JSX is created via taking the finished Users.jsx, feeding it to ChatGPT to get help to quicken the process. Then I checked it to make sure everything is ok and changed what was necissary.

const Projects = () => {
  const { projects, getProjects, createProject, updateProject, deleteProject } = useProj();

  const [openDropdownProjectId, setOpenDropdownProjectId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const toggleDropdown = (projectId) => {
    setOpenDropdownProjectId((prevId) => (prevId === projectId ? null : projectId));
  };

  const handleAdd = (formData) => {
    createProject(formData);
  };

  const handleEdit = async (formData) => {
    await updateProject(formData);
  };

  const handleDelete = async ({ project }) => {
    await deleteProject(project.id);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton
          type="add"
          target="#addProjectModal"
          text="Add Project"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <div>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id}>
              <h2>{project.projectName}</h2>
              <button type="button" onClick={() => toggleDropdown(project.id)}>
                ...
              </button>
              {openDropdownProjectId === project.id && (
                <div>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete({ project })}>
                    Delete Project
                  </button>
                </div>
              )}
              <p>{project.description}</p>
              <p>Status: {project.statusName}</p>
              <p>End date: {project.endDate}</p>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

      {isAddModalOpen && (
        <AddProjectModal
          id="addProjectModal"
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
        />
      )}

      {isEditModalOpen && (
        <EditProjectModal
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          projectData={selectedProject}
        />
      )}
    </div>
  );
};

export default Projects;