import React, { useState } from "react";

const BabyBirthCertificateForm = () => {
  const [form, setForm] = useState({
    hospitalName: "HarishChandra Hospital",
    certificateNo: "",
    childName: "",
    dob: "",
    time: "",
    weight: "",
    height: "",
    gender: "",
    place: "",
    father: "",
    mother: "",
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
    }, 300);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
  };

  return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm w-100 border-0">
        {/* Header */}
        {!showCertificate && (
          <>
            <div
              className="card-header text-white text-center"
              style={{ backgroundColor: "#01C0C8" }}
            >
              <h3 className="mb-0">
                <i className="bi bi-heart-pulse me-2"></i>
                Baby Birth Certificate Form
              </h3>
            </div>

            {/* Form */}
            <div className="card-body">
              <form id="birthForm" autoComplete="off">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Hospital Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="hospitalName"
                      value={form.hospitalName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Certificate Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="certificateNo"
                      value={form.certificateNo}
                      onChange={handleChange}
                      placeholder="Enter certificate number"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Child’s Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="childName"
                      value={form.childName}
                      onChange={handleChange}
                      placeholder="Enter child’s full name"
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dob"
                      value={form.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Time of Birth *</label>
                    <input
                      type="time"
                      className="form-control"
                      id="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="e.g., 3.2"
                      step="0.01"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Height (inch)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="e.g., 20"
                      step="0.1"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender *</label>
                    <select
                      className="form-select"
                      id="gender"
                      value={form.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Place of Birth (Hospital / Ward)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="place"
                      value={form.place}
                      onChange={handleChange}
                      placeholder="Enter place of birth"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Father’s Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="father"
                      value={form.father}
                      onChange={handleChange}
                      placeholder="Enter father's name"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Mother’s Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mother"
                      value={form.mother}
                      onChange={handleChange}
                      placeholder="Enter mother's name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter address"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      Attending Doctor / Midwife
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="doctor"
                      value={form.doctor}
                      onChange={handleChange}
                      placeholder="Enter doctor’s name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Authorized Signatory</label>
                    <input
                      type="text"
                      className="form-control"
                      id="signatory"
                      value={form.signatory}
                      onChange={handleChange}
                      placeholder="Enter signatory name"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Issue Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="issueDate"
                      value={form.issueDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    id="printButton"
                    className="btn text-white px-4"
                    style={{
                      backgroundColor: "#01C0C8",
                      borderColor: "#01C0C8",
                    }}
                    onClick={handleGenerate}
                  >
                    <i className="bi bi-printer-fill me-1"></i> Generate & Print
                    Certificate
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Certificate Preview / Print Section */}
        {showCertificate && (
          <div
            id="printArea"
            className="p-5 border border-4 mx-auto"
            style={{
              borderColor: "#01C0C8",
              maxWidth: "900px",
              backgroundColor: "#fff",
            }}
          >
            <div className="text-center mb-4">
              <h2
                id="hospitalHeader"
                className="fw-bold"
                style={{ color: "#01C0C8" }}
              >
                {form.hospitalName}
              </h2>
              <small id="certNo">{form.certificateNo}</small>
            </div>

            <h4 className="text-center fw-bold text-decoration-underline mb-4">
              BABY BIRTH CERTIFICATE
            </h4>

            <div className="mb-3">
              <p>
                This is to certify that{" "}
                <span className="fw-bold border-bottom">{form.childName}</span>,
                weighing{" "}
                <span className="fw-bold border-bottom">{form.weight}</span> kg
                and <span className="fw-bold border-bottom">{form.height}</span>{" "}
                inches tall, was born on{" "}
                <span className="fw-bold border-bottom">
                  {formatDate(form.dob)} {form.time}
                </span>{" "}
                at <span className="fw-bold border-bottom">{form.place}</span>.
              </p>
              <p>
                Gender:{" "}
                <span className="fw-bold border-bottom">{form.gender}</span>
              </p>
              <p>
                Father’s Name:{" "}
                <span className="fw-bold border-bottom">{form.father}</span>
              </p>
              <p>
                Mother’s Name:{" "}
                <span className="fw-bold border-bottom">{form.mother}</span>
              </p>
              <p>
                Address:{" "}
                <span className="fw-bold border-bottom">{form.address}</span>
              </p>
              <p>
                Attending Doctor / Midwife:{" "}
                <span className="fw-bold border-bottom">{form.doctor}</span>
              </p>
            </div>

            <div className="d-flex justify-content-between mt-5">
              <div className="text-center">
                <div className="border-top pt-2">
                  {form.doctor || "Attending Doctor / Midwife"}
                </div>
              </div>
              <div className="text-center">
                <div className="border-top pt-2">
                  {form.signatory || "Authorized Signatory"}
                </div>
                <p className="mt-2">
                  {form.issueDate
                    ? `Issue Date: ${formatDate(form.issueDate)}`
                    : ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BabyBirthCertificateForm;
