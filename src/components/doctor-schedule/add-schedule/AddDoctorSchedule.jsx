import React from "react";

function AddDoctorSchedule() {
  return (
    <div className="full-width-card card border-0 shadow">
      <div
        className="card-header text-white text-center fw-bold fs-4 py-3"
        style={{ backgroundColor: "#01c0c8" }}
      >
        <i className="bi bi-calendar-week me-2"></i> Doctor Timing Schedule
      </div>

      <div className="card-body">
        <form className="row g-3">
          {/* Doctor Info */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Department</label>
            <select className="form-select">
              <option selected disabled>
                Select Department
              </option>
              <option>Cardiologist</option>
              <option>Dentist</option>
              <option>Dermatologist</option>
              <option>Neurologist</option>
              <option>Gynecologist</option>
              <option>Orthopedic</option>
              <option>Pediatrician</option>
              <option>Psychiatrist</option>
              <option>Radiologist</option>
              <option>Urologist</option>
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Doctor Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter doctor name"
            />
          </div>

          {/* Weekly Schedule */}
          <div className="col-12 mt-4">
            <h6 className="fw-bold text-secondary border-bottom pb-2">
              Weekly Schedule
            </h6>
            <div className="row">
              {/* Left Column (Mon-Wed) */}
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-sm align-middle text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Mon</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Tue</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Wed</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column (Thu-Sat) */}
              <div className="col-md-6">
                <div className="table-responsive">
                  <table className="table table-sm align-middle text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Thu</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Fri</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Sat</td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                        <td>
                          <input
                            type="time"
                            className="form-control form-control-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Common Fees */}
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              Appointment Fees (₹)
            </label>
            <div className="input-group">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter total fees"
                min="0"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="col-12 text-center mt-4">
            <button
              type="reset"
              className="btn btn-outline-secondary me-2 px-4"
            >
              <i className="bi bi-x-circle me-1"></i> Reset
            </button>
            <button
              type="submit"
              className="btn text-white px-4"
              style={{ backgroundColor: "#01c0c8" }}
            >
              <i className="bi bi-save me-1"></i> Save Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctorSchedule;
