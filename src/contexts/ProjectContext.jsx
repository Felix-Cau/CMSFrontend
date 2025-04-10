import React, {createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ProjectContext = createContext()

export const ProjectProvider = ({children}) => {
    const { token } = useAuth()
    const apiUri = 'https://localhost:7263/api/projects';
    const statusUri = 'https://localhost:7263/api/status';
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const createProject = async (formData) => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (res.status !== 201)
                {
                  setErrorMessage('Unexpected error occured');
                  return false;
                }
      
                await getProjects();
                return true;
      
        } catch (error) {
            console.error(error);
            setErrorMessage('Unexpected error occured');
            return false;
        }
    }

    const getProjects = async () => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
    
            if (res.status === 200) 
                {
                    setProjects(data)
                    return true;
                }

                setErrorMessage('Unexpected error occured');
                return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const getProject = async (id) => {
        try {
            const res = await fetch(`${apiUri}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json();

            if (res.status === 200)
            {
                setProject(data)
                return true;
            }

            setErrorMessage('Unexpected error occured');
            return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const updateProject = async (formData) => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (res.status !== 200)
            {
                setErrorMessage('Unexpected error occurred');
                return false;
            }

            await getProjects();
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }

    }

    const deleteProject = async (id) => {
        try {
            const res = await fetch(`${apiUri}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json();
            
            if (res.status !== 200)
            {
                setErrorMessage('Unexpected error occured');
                return false;
            }

            await getProjects();
            return true;
        }
        catch (error) {
            console.error(error);
            setErrorMessage('Unexpected error occcured');
            return false;
        }
    }

    const getStatuses = async () => {
        try {
            const res = await fetch(`${statusUri}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json();

            if (res.status !== 200)
            {
                setErrorMessage('Unexpected error occured');
                return false;
            }

            setStatuses(data);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    useEffect(() => {
        getProjects();
        getStatuses();
    }, [])

    return (
        <ProjectContext.Provider value={{projects, project, statuses, createProject, getProjects, getProject, updateProject, deleteProject, getStatuses}}>
            {children}
        </ProjectContext.Provider>
    )
}

export const useProj = () => useContext(ProjectContext);