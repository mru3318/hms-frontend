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

  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleGenerate = () => {
    setShowCertificate(true);
    setTimeout(() => {
      window.print();
      setShowCertificate(false);
    }, 400);
  };

  const formattedDeathDate = form.deathDate
    ? new Date(form.deathDate).toLocaleDateString()
    : "";
  const formattedIssueDate = form.issueDate
    ? new Date(form.issueDate).toLocaleDateString()
    : "";

  return (
    <>
      {/* ✅ Print-only style */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printArea, #printArea * {
              visibility: visible;
            }
            #printArea {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 40px;
              border: 6px solid #01C0C8;
              box-sizing: border-box;
            }
          }
        `}
      </style>

      {/* Form Section */}
      {!showCertificate && (
        <div className="container-fluid my-4 px-4">
          <div className="card shadow-sm w-100 border-0">
            <div
              className="card-header text-white text-center"
              style={{ backgroundColor: "#01C0C8", border: "none" }}
            >
              <h3 className="mb-0">
                <i className="bi bi-heart-pulse me-2"></i>Death Certificate Form
              </h3>
            </div>

            <form className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Hospital Name *
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
                  <label className="form-label fw-semibold">
                    Certificate Number *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="certNumber"
                    value={form.certNumber}
                    onChange={handleChange}
                    placeholder="Enter certificate number"
                    required
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name *</label>
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
                  <label className="form-label fw-semibold">Gender *</label>
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
                  <label className="form-label fw-semibold">
                    Date of Death *
                  </label>
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
                  <label className="form-label fw-semibold">
                    Time of Death *
                  </label>
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
                  <label className="form-label fw-semibold">
                    Age at Death *
                  </label>
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
                  <label className="form-label fw-semibold">
                    Cause of Death *
                  </label>
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
                <label className="form-label fw-semibold">
                  Place of Death *
                </label>
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
                  <label className="form-label fw-semibold">
                    Authorized Signatory *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signatory"
                    value={form.signatory}
                    onChange={handleChange}
                    placeholder="Enter authorized signatory"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
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

              <div className="text-center mt-4">
                <button
                  type="button"
                  className="btn text-white me-2"
                  style={{ backgroundColor: "#01C0C8" }}
                  onClick={handleGenerate}
                >
                  <i className="bi bi-printer"></i> Generate & Print Certificate
                </button>
                <button type="reset" className="btn btn-secondary">
                  <i className="bi bi-arrow-left"></i> Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Certificate */}
      {showCertificate && (
        <div id="printArea" className="bg-white text-dark">
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#01C0C8" }}>
              {form.hospitalName}
            </h2>
            <small>{form.certNumber}</small>
          </div>

          <h4
            className="text-center fw-bold text-decoration-underline mb-4"
            style={{ color: "#01C0C8" }}
          >
            DEATH CERTIFICATE
          </h4>

          <p>
            This is to certify that <strong>{form.deceasedName}</strong>, aged{" "}
            <strong>{form.age}</strong>, passed away on{" "}
            <strong>{formattedDeathDate}</strong> at{" "}
            <strong>{form.deathTime}</strong> at <strong>{form.place}</strong>.
          </p>
          <p>
            <strong>Gender:</strong> {form.gender}
          </p>
          <p>
            <strong>Cause of Death:</strong> {form.cause}
          </p>
          <p>
            <strong>Address:</strong> {form.address}
          </p>
          <p>
            <strong>Attending Doctor / Certifying Officer:</strong>{" "}
            {form.doctor}
          </p>
          <p>
            <strong>Authorized Signatory:</strong> {form.signatory}
          </p>
          <p>
            <strong>Issue Date:</strong> {formattedIssueDate}
          </p>

          <div className="d-flex justify-content-between mt-5">
            <div className="text-center">
              <div className="pt-2" style={{ borderTop: "1px solid #000" }}>
                Attending Doctor / Certifying Officer
              </div>
            </div>
            <div className="text-center">
              <div className="pt-2" style={{ borderTop: "1px solid #000" }}>
                Authorized Signatory
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeathCertificateForm;
