import React, { useState } from "react";

const AddMemberModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    Email: "",
    ImageFile: null,
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    JobTitle: "",
    Role: "",
    Address: "",
    PostalCode: "",
    City: "",
  });

  //AI generated
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //AI generated
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
      <div className="modal" id="addMemberModal">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <h2>Add Member</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="Email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="imageFile">Profile Image</label>
              <input
                id="imageFile"
                type="file"
                name="ImageFile"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                name="FirstName"
                placeholder="First Name"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="LastName"
                placeholder="Last Name"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone</label>
              <input
                id="phoneNumber"
                type="text"
                name="PhoneNumber"
                placeholder="Phone Number"
                value={formData.PhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                name="JobTitle"
                placeholder="Job Title"
                value={formData.JobTitle}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="Role"
                value={formData.Role}
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
                id="address"
                type="text"
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code</label>
              <input
                id="postalCode"
                type="text"
                name="PostalCode"
                placeholder="Postal Code"
                value={formData.PostalCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="City"
                placeholder="City"
                value={formData.City}
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

export default AddMemberModal;
