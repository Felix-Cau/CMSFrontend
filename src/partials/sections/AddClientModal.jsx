import React, { useState, useEffect } from "react";

const AddClientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    ImageFile: null,
    ClientName: "",
    ClientEmail: "",
    PhoneNumber: "",
    Address: "",
    PostalCode: "",
    City: "",
    Reference: "",
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
      <div className="modal" id="addClientModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Add Client</h2>
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
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                name="ClientName"
                placeholder="Client Name"
                value={formData.ClientName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="clientEmail">Client Email</label>
              <input
                type="text"
                id="clientEmail"
                name="ClientEmail"
                placeholder="Client Email"
                value={formData.ClientEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="PhoneNumber"
                placeholder="Phone Number"
                value={formData.PhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="PostalCode"
                placeholder="Postal Code"
                value={formData.PostalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="City"
                placeholder="City"
                value={formData.City}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="reference">Reference</label>
              <input
                type="text"
                id="reference"
                name="Reference"
                placeholder="Reference"
                value={formData.Reference}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddClientModal;