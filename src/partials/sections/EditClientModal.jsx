import React, { useState, useEffect } from "react";

//After creating Add & Edit Member modals i asked ChatGPT for creating a similar ones for the rest. I then checked and changed what was needed to make sure it is ok.

const EditClientModal = ({ onClose, onSubmit, clientData }) => {
  const [formData, setFormData] = useState({
    id: "",
    imageName: "",
    imageFile: null,
    clientName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    city: "",
    reference: "",
  });

  useEffect(() => {
    if (clientData) {
      setFormData({
        id: clientData.id,
        imageName: clientData.imageName || "",
        imageFile: null,
        clientName: clientData.clientName || "",
        email: clientData.email || "",
        phoneNumber: clientData.phone || "",
        address: clientData.address || "",
        postalCode: clientData.postalCode || "",
        city: clientData.city || "",
        reference: clientData.reference || "",
      });
    }
  }, [clientData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("id", formData.id);
    data.append("imageName", formData.imageName);
    if (formData.imageFile) {
      data.append("newImageFile", formData.imageFile);
    }
    data.append("clientName", formData.clientName);
    data.append("clientEmail", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("address", formData.address);
    data.append("postalCode", formData.postalCode);
    data.append("city", formData.city);
    data.append("reference", formData.reference);

    onSubmit(data);
    onClose();
  };

  return (
    <section>
      <div className="modal" id="editModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Edit Client</h2>
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
                placeholder="Client Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
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

export default EditClientModal;