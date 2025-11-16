import React from "react";

export default function AddPatientAppointment() {
  return (
    <div className="full-width-card card shadow border-0">
      {/* Header */}
      <div
        className="text-center text-white fw-bold py-3"
        style={{
          backgroundColor: "#01c0c8",
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
        }}
      >
        <i className="bi bi-calendar2-check me-2"></i>
        Patient Appointment Form
      </div>

      {/* Body */}
      <div className="p-4">
        <form>
          <div className="row g-3">
            {/* Patient Name */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Patient Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue="Rohan Das"
                required
              />
            </div>

            {/* Age */}
            <div className="col-md-3">
              <label className="form-label fw-bold">Age</label>
              <input type="number" className="form-control" defaultValue="28" />
            </div>

            {/* Gender */}
            <div className="col-md-3">
              <label className="form-label fw-bold">Gender</label>
              <select className="form-select" defaultValue="Male">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                defaultValue="9876543210"
              />
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Address</label>
              <input
                type="text"
                className="form-control"
                defaultValue="MG Road, Pune, Maharashtra"
              />
            </div>

            {/* Symptoms */}
            <div className="col-md-12">
              <label className="form-label fw-bold">Symptoms / Problem</label>
              <textarea
                className="form-control"
                rows="3"
                defaultValue="Fever, headache and body pain since last 2 days."
              ></textarea>
            </div>

            {/* Doctor */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Select Doctor</label>
              <select
                className="form-select"
                defaultValue="Dr. Anita Sharma (General Physician)"
              >
                <option>Dr. Anita Sharma (General Physician)</option>
                <option>Dr. Rajiv Mehta (Cardiologist)</option>
                <option>Dr. Seema Patel (Dermatologist)</option>
              </select>
            </div>

            {/* Department */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Department</label>
              <select className="form-select" defaultValue="General Medicine">
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Dermatology</option>
                <option>Neurology</option>
              </select>
            </div>

            {/* Appointment Date */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Appointment Date</label>
              <input
                type="date"
                className="form-control"
                defaultValue="2025-02-15"
              />
            </div>

            {/* Time Slot */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Time Slot</label>
              <select
                className="form-select"
                defaultValue="11:00 AM – 12:00 PM"
              >
                <option>10:00 AM – 11:00 AM</option>
                <option>11:00 AM – 12:00 PM</option>
                <option>12:00 PM – 01:00 PM</option>
                <option>04:00 PM – 05:00 PM</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Status</label>
              <select className="form-select" defaultValue="Pending">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn text-white fw-bold px-4"
              style={{ background: "#01c0c8" }}
            >
              <i className="bi bi-save me-1"></i> Save Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
