import React, { useState, useEffect } from "react";

const EditMemberModal = ({ onClose, onSubmit, userData }) => {
  const [formData, setFormData] = useState({
    id: "",
    imageName: "",
    imageFile: null,
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
    role: "",
    address: "",
    postalCode: "",
    city: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        id: userData.id,
        imageName: userData.imageName,
        imageFile: null,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        jobTitle: userData.jobTitle || "",
        phoneNumber: userData.phoneNumber || "",
        role: userData.role || "",
        address: userData.address || "",
        postalCode: userData.postalCode || "",
        city: userData.city || "",
      });
    }
  }, [userData]);

  //AI generated
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //AI generated
  const handleFileChange = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    
    data.append("id", formData.id);
    data.append("imageName", formData.imageName);
    if (formData.imageFile) {
      data.append("imageFile", formData.imageFile);
    }
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("jobTitle", formData.jobTitle);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("role", formData.role);
    data.append("address", formData.address);
    data.append("postalCode", formData.postalCode);
    data.append("city", formData.city);
  
    onSubmit(data);
    onClose();
  };

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
                name="imageFile"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email} 
                readOnly 
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
              <label htmlFor="jobTitle">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role">Member Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
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
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
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
