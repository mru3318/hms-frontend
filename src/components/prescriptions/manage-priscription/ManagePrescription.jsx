import React, { useState, useEffect } from "react";

export default function ManagePrescription() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      patient: "Rohan Kumar",
      doctor: "Dr. A. Sharma",
      department: "Cardiology",
      date: "2025-02-10",
      status: "Completed",
    },
    {
      id: 2,
      patient: "Meera Patel",
      doctor: "Dr. R. Mehta",
      department: "Neurology",
      date: "2025-02-11",
      status: "Pending",
    },
  ]);

  const filteredRows = rows.filter((r) => {
    const searchMatch =
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === "" || r.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="full-width-card card shadow border-0 rounded-3">
      <div
        className=" text-white text-center py-3 rounded-top fw-semibold"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <i className="bi bi-file-medical-fill me-2"></i>
        Patient Prescription List
      </div>

      <div className="card-body">
        {/* Search + Filter */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Search</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search patient or doctor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Filter by Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-info">
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.patient}</td>
                  <td>{row.doctor}</td>
                  <td>{row.department}</td>
                  <td>{row.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        row.status === "Completed"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-info text-white me-1">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-warning text-white me-1">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
