import React, { useState, useEffect } from "react";

const EditMemberModal = ({ isOpen, onClose, onSubmit, userData }) => {
  const [formData, setFormData] = useState({
    Id: "",
    ImageName: "",
    ImageFile: null,
    FirstName: "",
    LastName: "",
    Email: "",
    JobTitle: "",
    PhoneNumber: "",
    Role: "",
    Address: "",
    PostalCode: "",
    City: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        Id: userData.id,
        ImageName: userData.imageName,
        ImageFile: null,
        FirstName: userData.firstName || "",
        LastName: userData.lastName || "",
        Email: userData.email || "",
        JobTitle: userData.jobTitle || "",
        PhoneNumber: userData.phoneNumber || "",
        Role: userData.role || "",
        Address: userData.address || "",
        PostalCode: userData.postalCode || "",
        City: userData.city || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, ImageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <section>
      <div className="modal" id="editMemberModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Edit User</h2>
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
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName.trim()}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="LastName"
                placeholder="Last Name"
                value={formData.LastName.trim()}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="Email"
                placeholder="Email"
                value={formData.Email} 
                readOnly 
              />
            </div>
            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="JobTitle"
                placeholder="Job Title"
                value={formData.JobTitle.trim()}
                onChange={handleChange}
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
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="Role"
                value={formData.Role.trim()}
                onChange={handleChange}
                required>
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="Address"
                placeholder="Address"
                value={formData.Address.trim()}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="PostalCode"
                placeholder="Postal Code"
                value={formData.PostalCode.trim()}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="City"
                placeholder="City"
                value={formData.City.trim()}
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

export default EditMemberModal;
