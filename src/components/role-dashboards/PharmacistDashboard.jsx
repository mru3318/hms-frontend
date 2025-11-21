import React from "react";
import img from "/assets/images/dashboard/Pharmacy.png";

const PharmacistDashboard = () => {
  return (
    <>
      <div className="container my-3">
        <div className="header-toolbar d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a
              className="text-decoration-none text-dark d-flex align-items-center"
              href="#"
            >
              <i className="fas fa-home me-2" />
              Home
            </a>
            <span className="text-muted mx-2"> / Pharmacist Dashboard </span>
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-white rounded-pill me-2"
              style={{ fontSize: 16 }}
            >
              <b>
                <i className="fas fa-plus me-1" /> New Scan Request
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
                  <h2 className="fw-bold">Pharmacist Dashboard</h2>
                </div>
                <div className="card-container">
                  <div className="card-hero">
                    <div className="icon-box new-patient">
                      <i className="fas fa-pills fa-2x" />
                    </div>
                    <div>
                      <p className="mb-0 fs-4 fw-bold">24</p>
                      <span className="small">Total Medicines</span>
                    </div>
                  </div>
                  <div className="card-hero">
                    <div className="icon-box surgeries">
                      <i className="fas fa-shopping-cart fa-2x" />
                    </div>
                    <div>
                      <p className="mb-0 fs-4 fw-bold">15</p>
                      <span className="small">Orders Today</span>
                    </div>
                  </div>
                  <div className="card-hero">
                    <div className="icon-box discharge">
                      <i className="fas fa-file-prescription fa-2x" />
                    </div>
                    <div>
                      <p className="mb-0 fs-4 fw-bold">18</p>
                      <span className="small">Pending Prescriptions</span>
                    </div>
                  </div>
                  <img
                    src={img}
                    style={{ marginBottom: "-60px ", height: "340px" }}
                    className="illustration"
                    alt="PharmacistImage"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4 mt-2">
            <div className="container mt-2">
              <div className="main-panel">
                <div className="content-wrapper">
                  {/* ############################################################## */}
                  {/* Add your code here....... */}
                  <div className="container">
                    {/* Additional 4 Pharmacy Cards */}
                    <div className="row g-3 mt-3">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="analytics-card"
                          style={{
                            background:
                              "linear-gradient(135deg, #6a1b9a, #ab47bc)",
                            color: "white",
                            borderRadius: 12,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <i className="fas fa-prescription-bottle-alt" />
                            </div>
                            <div>
                              <h4 className="mb-0 fw-bold">76</h4>
                              <p className="mb-0">Dispensed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="analytics-card"
                          style={{
                            background:
                              "linear-gradient(135deg, #00838f, #4dd0e1)",
                            color: "white",
                            borderRadius: 12,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <i className="fas fa-undo-alt" />
                            </div>
                            <div>
                              <h4 className="mb-0 fw-bold">12</h4>
                              <p className="mb-0">Returned Medicines</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="analytics-card"
                          style={{
                            background:
                              "linear-gradient(135deg, #f57f17, #ffb74d)",
                            color: "white",
                            borderRadius: 12,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <i className="fas fa-truck-loading" />
                            </div>
                            <div>
                              <h4 className="mb-0 fw-bold">6</h4>
                              <p className="mb-0">Incoming Shipments</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <div
                          className="analytics-card"
                          style={{
                            background:
                              "linear-gradient(135deg, #d32f2f, #e57373)",
                            color: "white",
                            borderRadius: 12,
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <div className="icon-box me-3">
                              <i className="fas fa-exclamation-triangle" />
                            </div>
                            <div>
                              <h4 className="mb-0 fw-bold">5</h4>
                              <p className="mb-0">Expired Medicines</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row g-3 mt-0">
                      {/* Latest Notices */}
                      <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                        <div className="analytics-card w-100 d-flex flex-column h-100">
                          {/* Header */}
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0 fw-bold">LATEST NOTICES</h6>
                            <div className="notice-header-tools">
                              <span className="badge bg-danger">3 UNREAD</span>
                              <a href="#" className="text-decoration-none">
                                View All »
                              </a>
                            </div>
                          </div>
                          <hr />
                          {/* Notice Items */}
                          <div className="flex-grow-1 overflow-auto">
                            <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                              <div className="d-flex align-items-center">
                                <span className="text-primary me-2">
                                  <i className="fas fa-file-alt" />
                                </span>
                                <span className="fw-semibold">HR</span>
                              </div>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                              <div className="d-flex align-items-center">
                                <span className="text-warning me-2">
                                  <i className="fas fa-cog" />
                                </span>
                                <span className="fw-semibold">
                                  Shift Change Notification
                                </span>
                              </div>
                              <small className="text-muted">2h ago</small>
                            </div>
                            <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                              <div className="d-flex align-items-center">
                                <span className="text-primary me-2">
                                  <i className="fas fa-network-wired" />
                                </span>
                                <span className="fw-semibold">
                                  Announcement
                                </span>
                              </div>
                              <small className="text-muted">1h ago</small>
                            </div>
                            <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                              <div className="d-flex align-items-center">
                                <span className="text-primary me-2">
                                  <i className="fas fa-file" />
                                </span>
                                <span className="fw-semibold">General</span>
                              </div>
                              <small className="text-muted">Yesterday</small>
                            </div>
                            <div className="notice-item d-flex justify-content-between align-items-center py-2 border-bottom">
                              <div className="d-flex align-items-center">
                                <span className="text-warning me-2">
                                  <i className="fas fa-tools" />
                                </span>
                                <span className="fw-semibold">Maintenance</span>
                              </div>
                              <small className="text-muted">2 days ago</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Insurance Stats */}
                      <div className="col-lg-6 col-md-12 col-sm-12 d-flex">
                        <div className="analytics-card pharmacy-stats w-100 d-flex flex-column h-100">
                          {/* Header */}
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0 fw-bold">Pharmacy Stats</h6>
                            <div>
                              <a href="#" className="ms-2 text-decoration-none">
                                View »
                              </a>
                            </div>
                          </div>
                          <hr />
                          {/* Content */}
                          <div className="row g-3 flex-grow-1">
                            <div className="col-sm-6 col-12">
                              <div
                                className="p-3 border h-100"
                                style={{ borderRadius: 1 }}
                              >
                                <h5>
                                  76{" "}
                                  <small className="text-success">+15%</small>
                                </h5>
                                <p className="mb-0">Dispensed</p>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div
                                className="p-3 border h-100"
                                style={{ borderRadius: 1 }}
                              >
                                <h5>
                                  12 <small className="text-warning">-5%</small>
                                </h5>
                                <p className="mb-0">Returned</p>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div
                                className="p-3 border h-100"
                                style={{ borderRadius: 1 }}
                              >
                                <h5>
                                  6 <small className="text-success">+10%</small>
                                </h5>
                                <p className="mb-0">Incoming Shipments</p>
                              </div>
                            </div>
                            <div className="col-sm-6 col-12">
                              <div
                                className="p-3 border h-100"
                                style={{ borderRadius: 1 }}
                              >
                                <h5>
                                  5 <small className="text-danger">-8%</small>
                                </h5>
                                <p className="mb-0">Expired</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ####################################################################### */}
                  </div>
                  {/* content-wrapper ends */}
                  {/* partial:partials/_footer.html */}
                  <footer className="footer mt-4">
                    <div className="d-sm-flex justify-content-center justify-content-sm-between">
                      <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                        Copyright © 2025 Hospital Management System. All rights
                        reserved.
                      </span>
                      <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                        Designed and Developed by
                        <a
                          href="https://kavyainfoweb.com/"
                          target="_blank"
                          style={{
                            textDecoration: "none",
                            color: "rgb(2, 62, 62)",
                          }}
                        >
                          Kavya Infoweb Pvt. Ltd.
                        </a>
                      </span>
                    </div>
                  </footer>
                  {/* partial */}
                </div>
                {/* main-panel ends */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacistDashboard;
