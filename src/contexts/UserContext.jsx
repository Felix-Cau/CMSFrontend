import React, {createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const { token, adminApiKey } = useAuth()
    const apiUri = 'https://localhost:7263/api/users';
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getUsers = async () => {
        try {
            const res = await fetch(`${apiUri}/getusers`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if (res.status === 200) {
                const data = await res.json()
                setUsers(data)
                return true;
            }
            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const getUser = async (id) => {
        try {
            const res = await fetch(`${apiUri}/getuser/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 

            const data = await res.json()

            if (res.status === 200) {
                setUser(data)
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const createUser = async (formData) => {
        try {
            const res = await fetch(`${apiUri}/createuser`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                },
                body: formData
            })

            if (res.status === 201)
            {
                await getUsers();
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const updateUser = async (formData) => {
        try {
            const res = await fetch(`${apiUri}/updateuser`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                },
                body: formData
            })

            if (res.status === 200)
            {
                await getUsers();
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`${apiUri}/deleteuser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                }
            })

            if (res.status === 200)
            {
                await getUsers();
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <UserContext.Provider value={{users, user, getUsers, getUser, createUser, updateUser, deleteUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)