import React from "react";
import "./Dashboard.css";
import hrImage from "/assets/images/dashboard/hrImage.png";
export default function HRDashboard() {
  return (
    <>
      <div className="container my-3">
        <div className="header-toolbar d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a
              className="text-decoration-none text-dark d-flex align-items-center"
              href="#"
            >
              <b>Welcome</b>
            </a>
            <span className="text-dark fw-bold mx-2"> HR</span>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-white rounded-pill me-2"
              style={{ fontSize: 16 }}
            >
              <b>
                <i className="fas fa-plus me-1" />
                Add New Employee
              </b>
            </button>
          </div>
        </div>

        <div className="container mt-4">
          <div className="row">
            <div className="col-12">
              <div className="jumbotron-hero">
                <div>
                  <h5 className="fw-normal">Good Morning.</h5>
                  <h2 className="fw-bold">HR Manager – Meera</h2>
                </div>
                <div className="card-container">
                  <div className="card-hero">
                    <div className="icon-box new-patient">
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <p className="mb-0 fs-4 fw-bold">350</p>
                      <span className="small">Total Employees</span>
                    </div>
                  </div>

                  <div className="card-hero">
                    <div className="icon-box surgeries">
                      <i className="fas fa-user-clock"></i>
                    </div>
                    <div>
                      <p className="mb-0 fs-4 fw-bold">42</p>
                      <span className="small">On Leave</span>
                    </div>
                  </div>

                  <div className="card-hero">
                    <div className="icon-box discharge">
                      <i className="fas fa-user-shield"></i>
                    </div>
                    <div>
                      <p className="mb-0 fs-5 fw-bold">18</p>
                      <span className="small">New Joiners</span>
                    </div>
                  </div>

                  <img
                    src={hrImage}
                    className="illustration"
                    alt="HR illustration"
                    style={{ marginBottom: "-21px" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="row g-3 mt-0">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="analytics-card"
                style={{
                  background: "linear-gradient(135deg, #00897b, #4db6ac)",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="icon-box me-3">
                    <i className="fas fa-id-card-alt"></i>
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">18</h4>
                    <p className="mb-0">Pending Verifications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="analytics-card"
                style={{
                  background: "linear-gradient(135deg, #1976d2, #64b5f6)",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="icon-box me-3">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">12</h4>
                    <p className="mb-0">Open Positions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="analytics-card"
                style={{
                  background: "linear-gradient(135deg, #c62828, #ef5350)",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="icon-box me-3">
                    <i className="fas fa-file-signature"></i>
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">09</h4>
                    <p className="mb-0">Pending Approvals</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
              <div
                className="analytics-card"
                style={{
                  background: "linear-gradient(135deg, #ef6c00, #ffb74d)",
                  color: "white",
                }}
              >
                <div className="d-flex align-items-center">
                  <div className="icon-box me-3">
                    <i className="fas fa-user-graduate"></i>
                  </div>
                  <div>
                    <h4 className="mb-0 fw-bold">28</h4>
                    <p className="mb-0">Training Sessions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDE BY SIDE SECTION */}
          <div className="row g-4 mt-3">
            {/* LATEST NOTICES */}
            <div className="col-lg-6 col-md-12">
              <div
                className="analytics-card p-3"
                style={{ height: "315px", overflowY: "auto" }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 fw-bold">LATEST HR NOTICES</h6>
                  <div className="notice-header-tools">
                    <span className="badge bg-danger">5 UNREAD</span>
                    <a href="#" className="text-decoration-none">
                      View All »
                    </a>
                  </div>
                </div>

                <hr />

                <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="text-primary me-2">
                      <i className="fas fa-bullhorn"></i>
                    </span>
                    <span className="fw-semibold">
                      Policy Update: Leave Rules
                    </span>
                  </div>
                  <small className="text-muted">1h ago</small>
                </div>

                <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="text-warning me-2">
                      <i className="fas fa-users-cog"></i>
                    </span>
                    <span className="fw-semibold">Shift Reallocation</span>
                  </div>
                  <small className="text-muted">2h ago</small>
                </div>

                <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="text-primary me-2">
                      <i className="fas fa-file"></i>
                    </span>
                    <span className="fw-semibold">New Joining Documents</span>
                  </div>
                  <small className="text-muted">3h ago</small>
                </div>

                <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                  <div className="d-flex align-items-center">
                    <span className="text-primary me-2">
                      <i className="fas fa-chalkboard-teacher"></i>
                    </span>
                    <span className="fw-semibold">Training Schedule</span>
                  </div>
                  <small className="text-muted">Yesterday</small>
                </div>
              </div>
            </div>

            {/* EMPLOYEE STATUS */}
            <div className="col-lg-6 col-md-12">
              <div
                className="analytics-card p-3"
                style={{ height: "315px", overflowY: "auto" }}
              >
                <h6 className="fw-bold mb-3">Employee Status Overview</h6>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "240px", overflowY: "auto" }}
                >
                  <table className="table table-striped table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rohan Verma</td>
                        <td>Cardiology</td>
                        <td>Senior Nurse</td>
                        <td>
                          <span className="badge bg-success">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Anita Sharma</td>
                        <td>Pediatrics</td>
                        <td>Junior Doctor</td>
                        <td>
                          <span className="badge bg-warning">On Leave</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Vikas Rao</td>
                        <td>Admin</td>
                        <td>HR Assistant</td>
                        <td>
                          <span className="badge bg-info">Training</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Deepak Gupta</td>
                        <td>Orthopedics</td>
                        <td>Ward Manager</td>
                        <td>
                          <span className="badge bg-danger">Resigned</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="footer mt-4">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                © 2025 Hospital HR Dashboard. All rights reserved.
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Designed by
                <a
                  href="https://kavyainfoweb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "rgb(2, 62, 62)" }}
                >
                  Kavya Infoweb Pvt. Ltd.
                </a>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
