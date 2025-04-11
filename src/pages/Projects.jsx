import React, { useEffect } from 'react';
import ModalButton from '../partials/components/ModalButton';
import {useProj} from '../contexts/ProjectContext';

const Projects = () => {
  const {projects, getProjects} = useProj();

  const [showDropdownMenu, setDropDown] = useState(false);
  
    const toggleDropdown = () => {
      setDropDown((prev) => !prev);
    }
  
    const handleEdit = ({project}) => {
  
    }
  
    const handleDelete = ({project}) => {
    }

  useEffect(() => {
    getProjects();
  }, [])

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton type="add" target="#addProjectModal" text="Add Project" />
      </div>

      <div>
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id}>
              <h2>{project.projectName}</h2>
              <button type="button" onClick={toggleDropdown}>
                test
              </button>
              {showDropdownMenu && (
                <div>
                    <button onClick={() => handleEdit({project})}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete({project})}>
                      Delete User
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

    </div>
  )
}

export default Projects