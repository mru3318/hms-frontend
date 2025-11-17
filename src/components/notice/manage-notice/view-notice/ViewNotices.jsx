import React from "react";

const ViewNotices = () => {
  return (
    <div className="full-width-card card shadow-sm border-0">
      {/* Header */}
      <div
        className=" text-white text-center py-3"
        style={{
          backgroundColor: "#01C0C8",
          borderTopLeftRadius: "0.50rem",
          borderTopRightRadius: "0.50rem",
        }}
      >
        <h4 className="mb-0">
          <i className="bi bi-megaphone-fill me-2"></i>Notice List
        </h4>
      </div>

      <div className="card-body">
        {/* Alert Messages */}
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ display: "none" }}
        >
          Success message here.
        </div>
        <div
          className="alert alert-danger text-center"
          role="alert"
          style={{ display: "none" }}
        >
          Error message here.
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle text-center mb-0">
            <thead style={{ backgroundColor: "#E0F7FA" }}>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Attachment</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="fw-semibold">Hospital Holiday Notice</td>
                <td>
                  Hospital will remain closed on <b>1st November</b> for
                  maintenance.
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-10-29T09:00"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-10-29T17:00"
                    readOnly
                  />
                </td>
                <td>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm w-100 text-white"
                    style={{ backgroundColor: "#01C0C8" }}
                  >
                    Download
                  </a>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <a
                      href="#"
                      className="btn btn-sm text-white px-3"
                      style={{ backgroundColor: "#01C0C8" }}
                    >
                      Edit
                    </a>
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() =>
                        window.confirm(
                          "Are you sure you want to delete this notice?"
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="fw-semibold">Staff Meeting</td>
                <td>
                  Quarterly review meeting for all staff members in Conference
                  Hall.
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-11-02T10:00"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-11-02T12:00"
                    readOnly
                  />
                </td>
                <td>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm w-100 text-white"
                    style={{ backgroundColor: "#01C0C8" }}
                  >
                    Download
                  </a>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <a
                      href="#"
                      className="btn btn-sm text-white px-3"
                      style={{ backgroundColor: "#01C0C8" }}
                    >
                      Edit
                    </a>
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() =>
                        window.confirm(
                          "Are you sure you want to delete this notice?"
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="fw-semibold">New Policy Update</td>
                <td>
                  All employees must review the updated leave policy document.
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-10-30T09:00"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="datetime-local"
                    className="form-control form-control-sm text-center"
                    value="2025-10-31T18:00"
                    readOnly
                  />
                </td>
                <td>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm w-100 text-white"
                    style={{ backgroundColor: "#01C0C8" }}
                  >
                    Download
                  </a>
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <a
                      href="#"
                      className="btn btn-sm text-white px-3"
                      style={{ backgroundColor: "#01C0C8" }}
                    >
                      Edit
                    </a>
                    <button
                      className="btn btn-danger btn-sm px-3"
                      onClick={() =>
                        window.confirm(
                          "Are you sure you want to delete this notice?"
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewNotices;
