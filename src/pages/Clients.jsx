import React, { useEffect } from 'react'
import ModalButton from '../partials/components/ModalButton'
import { useClients } from '../contexts/ClientContext'

const Clients = () => {
  const {clients, getClients} = useClients();

  const [showDropdownMenu, setDropDown] = useState(false);
  
  const toggleDropdown = () => {
    setDropDown((prev) => !prev);
  }

  const handleEdit = ({client}) => {

  }

  const handleDelete = ({client}) => {
    
  }

  useEffect(() => {
    getClients();
  }, [])

  return (
    <div id="clients">
      <div className="page-header">
        <h1 className="h2">Clients</h1>
        <ModalButton type="add" target="#addClientModal" text="Add Client" />
      </div>

      {clients.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>
                  <div>{client.clientName}</div>
                  <div>{client.email}</div>
                </td>
                <td>{client.phone || 'Not available'}</td>
                {/* ChatGPT generated */}
                <td>{new Date(client.created).toLocaleDateString()}</td>
                <td>{client.isActive ? 'Active' : 'Inactive'}</td>
                <td></td>
                <td>
                  <button type="button" onClick={toggleDropdown}>
                  test
                  </button>
                  {showDropdownMenu && (
                    <div>
                      <button onClick={() => handleEdit({client})}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete({client})}>
                        Delete User
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
    </div>
  )
}

export default Clients