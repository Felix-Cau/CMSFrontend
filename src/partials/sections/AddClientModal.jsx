import React, { useState } from "react";

//After creating Add & Edit Member modals i asked ChatGPT for creating a similar ones for the rest. I then checked and changed what was needed to make sure it is ok.

const AddClientModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    clientName: "",
    clientEmail: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    reference: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <section>
      <div className="modal" id="addClientModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Add Client</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="imageFile">Profile Image</label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="clientName">Client Name</label>
              <input
                type="text"
                id="clientName"
                name="clientName"
                placeholder="Client Name"
                value={formData.clientName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="clientEmail">Email</label>
              <input
                type="text"
                id="clientEmail"
                name="clientEmail"
                placeholder="Email"
                value={formData.clientEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="reference">Reference</label>
              <input
                type="text"
                id="reference"
                name="reference"
                placeholder="Reference"
                value={formData.reference}
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
