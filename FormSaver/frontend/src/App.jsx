import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    registrationDate: "",
    phoneNumber: "",
    altPhoneNumber: "",
    email: "",
    permanentAddress: "",
    idProofNumber: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    roomNumber: "",
    roomType: "",
    deposit: "",
    monthlyRent: "",
    expectedStay: "",
  });

  const [page, setPage] = useState("form"); // form or confirm

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPage("confirm"); // go to confirmation page
  };

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:3000/api/students", formData);
      toast.success("Your data has been saved!");
      setPage("form");
      setFormData({
        fullName: "",
        gender: "",
        dob: "",
        registrationDate: "",
        phoneNumber: "",
        altPhoneNumber: "",
        email: "",
        permanentAddress: "",
        idProofNumber: "",
        emergencyContactName: "",
        emergencyContactRelation: "",
        emergencyContactPhone: "",
        roomNumber: "",
        roomType: "",
        deposit: "",
        monthlyRent: "",
        expectedStay: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  // --- Form Page ---
  if (page === "form") {
    return (
      <div className="app-container">
        <div className="form-card">
          <h1>PG Student Registration</h1>
          <form onSubmit={handleFormSubmit}>
            <h2>Student Information</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            {/* Gender */}
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />{" "}
                Other
              </label>
            </div>

            <label>Registration Date:</label>
            <input
              type="date"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={handleChange}
              required
            />
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="altPhoneNumber"
              placeholder="Alternate Phone Number"
              value={formData.altPhoneNumber}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Address */}
            <h2>Address</h2>
            <textarea
              name="permanentAddress"
              placeholder="Permanent Address"
              value={formData.permanentAddress}
              onChange={handleChange}
              required
            />

            {/* ID Proof */}
            <h2>ID Proof (Aadhar only)</h2>
            <input
              type="text"
              name="idProofNumber"
              placeholder="Aadhar Card Number"
              value={formData.idProofNumber}
              onChange={handleChange}
              required
            />

            {/* Emergency Contact */}
            <h2>Emergency Contact</h2>
            <input
              type="text"
              name="emergencyContactName"
              placeholder="Name"
              value={formData.emergencyContactName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="emergencyContactRelation"
              placeholder="Relation"
              value={formData.emergencyContactRelation}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="emergencyContactPhone"
              placeholder="Phone Number"
              value={formData.emergencyContactPhone}
              onChange={handleChange}
              required
            />

            {/* PG Stay */}
            <h2>PG Stay Details</h2>
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label>
                <input
                  type="radio"
                  name="roomType"
                  value="Bedroom"
                  onChange={handleChange}
                />{" "}
                Bedroom
              </label>
              <label>
                <input
                  type="radio"
                  name="roomType"
                  value="Hall"
                  onChange={handleChange}
                />{" "}
                Hall
              </label>
            </div>
            <input
              type="number"
              name="deposit"
              placeholder="Deposit Amount"
              value={formData.deposit}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="monthlyRent"
              placeholder="Monthly Rent"
              value={formData.monthlyRent}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="expectedStay"
              placeholder="Expected Stay Duration (months)"
              value={formData.expectedStay}
              onChange={handleChange}
              required
            />

            <button type="submit">Review Details</button>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000} // 3 seconds
          hideProgressBar={false}
        />
      </div>
    );
  }

  // --- Confirmation Page ---
  if (page === "confirm") {
    return (
      <div className="app-container">
        <div className="form-card">
          <h1>Confirm Your Details</h1>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <tbody>
              {Object.entries(formData).map(([key, value]) => (
                <tr key={key} style={{ borderBottom: "1px solid #ccc" }}>
                  <td
                    style={{
                      fontWeight: "bold",
                      padding: "8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td style={{ padding: "8px" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: "20px" }}>
            <button onClick={() => setPage("form")}>Edit</button>
            <button onClick={handleConfirm}>Confirm & Save</button>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    );
  }
}

export default App;
