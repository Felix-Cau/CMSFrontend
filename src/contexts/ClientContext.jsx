import React, {createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const ClientContext = createContext()

export const ClientProvider = ({children}) => {
    const { token, adminApiKey } = useAuth()
    const apiUri = 'https://localhost:7263/api/clients';
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const getClients = async () => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
    
            if (res.status === 200) {
                setClients(data)
                return true;
            }
            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const getClient = async (id) => {
        try {
            const res = await fetch(`${apiUri}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }) 

            const data = await res.json()

            if (res.status === 200) {
                setClient(data)
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error)
            return false;
        }
    }

    const createClient = async (formData) => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                },
                body: formData
            })

            if (res.status === 201)
            {
                await getClients();
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const updateClient = async (formData) => {
        try {
            const res = await fetch(`${apiUri}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                },
                body: formData
            })

            if (res.status === 200)
            {
                await getClients();
                return true;
            }

            setErrorMessage('Unexpected error occurred')
            return false;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const deleteClient = async (id) => {
        try {
            const res = await fetch(`${apiUri}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-ADM-API-KEY': `${adminApiKey}`
                }
            })

            if (res.status === 200)
            {
                await getClients();
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
        getClients()
    }, [])

    return (
        <ClientContext.Provider value={{clients, client, getClients, getClient, createClient, updateClient, deleteClient}}>
            {children}
        </ClientContext.Provider>
    )
}

export const useClients = () => useContext(ClientContext)