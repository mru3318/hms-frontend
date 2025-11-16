import React, { useState } from "react";

export default function AddNewPrescription() {
  // `${API_BASE_URL}/endpoint`
  const [selectedDept, setSelectedDept] = useState("");
  const [doctors, setDoctors] = useState([]);
  // console.log("URL is :", API_BASE_URL);
  const doctorsByDepartment = {
    cardiology: ["Dr. A. Sharma", "Dr. K. Patel"],
    neurology: ["Dr. R. Mehta", "Dr. V. Kapoor"],
    orthopedics: ["Dr. S. Khan", "Dr. L. Ghosh"],
    dermatology: ["Dr. P. Desai", "Dr. N. Chatterjee"],
    pediatrics: ["Dr. R. Nair", "Dr. S. Reddy"],
    general: ["Dr. B. Joshi", "Dr. M. Gupta", "Dr. T. Varma"],
  };

  const handleDeptChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    setDoctors(doctorsByDepartment[dept] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Prescription Saved Successfully!");
  };

  const handleReset = () => {
    setSelectedDept("");
    setDoctors([]);
  };

  return (
    <div className="full-width-card card shadow border-0 rounded-3">
      {/* Header */}
      <div
        className=" text-white text-center py-3 rounded-top fw-semibold"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <i className="bi bi-file-medical-fill me-2"></i>Patient Prescription
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit} onReset={handleReset}>
          {/* Department & Doctor */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Department <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                required
                value={selectedDept}
                onChange={handleDeptChange}
              >
                <option value="">Select Department</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="dermatology">Dermatology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="general">General Medicine</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Doctor Name <span className="text-danger">*</span>
              </label>
              <select className="form-select" required>
                <option value="">Select Doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Patient Info */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Patient Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter age"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label fw-semibold">Gender</label>
              <select className="form-select">
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Date <span className="text-danger">*</span>
              </label>
              <input type="date" className="form-control" required />
            </div>
          </div>

          {/* Symptoms */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Symptoms <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Enter patient symptoms"
              required
            ></textarea>
          </div>

          {/* Diagnosis */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Diagnosis <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Enter diagnosis details"
              required
            ></textarea>
          </div>

          {/* Prescription Details */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Prescription Details <span className="text-danger">*</span>
            </label>
            <table className="table table-bordered text-center align-middle">
              <thead className="table-info">
                <tr>
                  <th>Medicine Name</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g., Paracetamol"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="2 times/day"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="5 days"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Additional Notes</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Any additional advice..."
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center mt-4">
            <button type="reset" className="btn btn-secondary me-2">
              <i className="bi bi-arrow-left"></i> Cancel
            </button>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#01C0C8", color: "white" }}
            >
              <i className="bi bi-save me-1"></i> Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
