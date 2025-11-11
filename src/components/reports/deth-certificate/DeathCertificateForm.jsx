import axios from "axios";
import React, { useState } from "react";

const DeathCertificateForm = () => {
  const [form, setForm] = useState({
    hospitalName: "HarishChandra Hospital",
    certNumber: "",
    deceasedName: "",
    gender: "",
    deathDate: "",
    deathTime: "",
    age: "",
    cause: "",
    place: "",
    address: "",
    doctor: "",
    signatory: "",
    issueDate: "",
  });

  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Existing handleChange
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  // ✅ Fetch data from backend using Patient ID
  const handleSearch = async () => {
    if (!patientId) {
      setError("Please enter a Patient ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Example API endpoint — replace with your backend URL
      const res = await axios.get(
        `http://localhost:8080/api/patients/${patientId}`
      );

      if (res.data) {
        const { fullName, gender } = res.data;

        // ✅ Only update required fields (don’t reset others)
        setForm((prev) => ({
          ...prev,
          deceasedName: fullName || prev.deceasedName,
          gender: gender || prev.gender,
        }));
      } else {
        setError("Patient not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching patient details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Submitting Death Certificate Data:", form);
    alert("Death Certificate Saved!");
    // Optionally reset the form
    // setForm({ ...initial state ... });
    // setPatientId("");
  };

  return (
    <>
      {/* Form Section */}
      <div className="card full-width-card shadow-sm w-100 border-0">
        <div
          className="card-header text-white text-center"
          style={{ backgroundColor: "#01C0C8", border: "none" }}
        >
          <h3 className="mb-0">
            <i className="bi bi-heart-pulse me-2"></i>Death Certificate Form
          </h3>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          {/* 🔍 Search by Patient ID */}
          <div className="row mb-3 align-items-end">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Hospital Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="hospitalName"
                value={form.hospitalName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              {" "}
              <label className="form-label fw-semibold">Patient ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-danger fw-semibold">{error}</p>}

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="deceasedName"
                value={form.deceasedName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select"
                id="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Date of Death</label>
              <input
                type="date"
                className="form-control"
                id="deathDate"
                value={form.deathDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Time of Death</label>
              <input
                type="time"
                className="form-control"
                id="deathTime"
                value={form.deathTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Age at Death</label>
              <input
                type="number"
                className="form-control"
                id="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Cause of Death</label>
              <input
                type="text"
                className="form-control"
                id="cause"
                value={form.cause}
                onChange={handleChange}
                placeholder="Enter cause of death"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Place of Death</label>
            <input
              type="text"
              className="form-control"
              id="place"
              value={form.place}
              onChange={handleChange}
              placeholder="Hospital / Ward Name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <textarea
              className="form-control"
              id="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Attending Doctor / Certifying Officer *
              </label>
              <input
                type="text"
                className="form-control"
                id="doctor"
                value={form.doctor}
                onChange={handleChange}
                placeholder="Enter doctor name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Issue Date *</label>
              <input
                type="date"
                className="form-control"
                id="issueDate"
                value={form.issueDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button
              type="submit"
              className="btn text-white me-2"
              style={{ backgroundColor: "#01C0C8" }}
            >
              <i className="bi bi-save me-2"></i> Save Certificate
            </button>
            <button type="reset" className="btn btn-secondary">
              <i className="bi bi-arrow-left"></i> Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeathCertificateForm;
