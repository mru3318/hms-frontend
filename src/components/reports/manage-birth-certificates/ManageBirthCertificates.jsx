import React, { useState } from "react";

const ManageBirthCertificates = () => {
  const [birthData, setBirthData] = useState([
    {
      id: 1,
      motherName: "Maria Johnson",
      placeOfBirth: "City Hospital",
      timeOfBirth: "10:30 AM",
      issueDate: "2025-11-01",
    },
    {
      id: 2,
      motherName: "Priya Sharma",
      placeOfBirth: "Lotus Clinic",
      timeOfBirth: "08:45 PM",
      issueDate: "2025-10-28",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleView = (record) => {
    setSelected(record);
    setIsEditing(false);
    const modal = new window.bootstrap.Modal(
      document.getElementById("birthModal")
    );
    modal.show();
  };

  const handleEdit = (record) => {
    setSelected(record);
    setIsEditing(true);
    const modal = new window.bootstrap.Modal(
      document.getElementById("birthModal")
    );
    modal.show();
  };

  const handleSave = () => {
    setBirthData((prev) =>
      prev.map((item) => (item.id === selected.id ? selected : item))
    );
    alert("Changes have been saved successfully!");
    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("birthModal")
    );
    modal.hide();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html><head><title>Birth Certificate</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
      </head><body>
      <div style="width:80%;margin:0 auto;padding:40px;border:5px double #000;font-family:'Times New Roman',serif">
        <div style="text-align:center;margin-bottom:30px;">
          <h2 style="font-weight:bold;text-transform:uppercase;color:#0d6efd;">Hospital Birth Certificate</h2>
          <p>City Hospital, Department of Birth Records</p><hr/>
        </div>
        <div style="font-size:18px;line-height:1.8;">
          <p>This is to certify that a child was born at <strong>${selected.placeOfBirth}</strong> to</p>
          <p><strong>Mother:</strong> ${selected.motherName}</p>
          <p><strong>Time of Birth:</strong> ${selected.timeOfBirth}</p>
          <p><strong>Date of Issue:</strong> ${selected.issueDate}</p>
        </div>
        <div style="margin-top:50px;display:flex;justify-content:space-between;font-size:16px;">
          <div style="text-align:center;"><hr style="width:150px;margin:auto;"/><p>Registrar Signature</p></div>
          <div style="text-align:center;"><hr style="width:150px;margin:auto;"/><p>Hospital Seal</p></div>
        </div>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="card-border mb-3">
        <div
          className="card-header text-white d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#01C0C8" }}
        >
          <i className="fa-solid fa-certificate me-2"></i>
          <span>Manage Birth Certificates</span>
        </div>
      </div>

      {/* Table */}
      <div className="container-fluid">
        <table className="table table-striped table-bordered text-center align-middle">
          <thead className="table-primary">
            <tr>
              <th>Sr No.</th>
              <th>Mother Name</th>
              <th>Place of Birth</th>
              <th>Time of Birth</th>
              <th>Issue Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {birthData.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.motherName}</td>
                <td>{record.placeOfBirth}</td>
                <td>{record.timeOfBirth}</td>
                <td>{record.issueDate}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-1"
                    onClick={() => handleView(record)}
                  >
                    <i className="fa-solid fa-eye"></i> View
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(record)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="birthModal"
        tabIndex="-1"
        aria-labelledby="birthModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div
              className="modal-header text-white"
              style={{ backgroundColor: "#01C0C8" }}
            >
              <h5 className="modal-title" id="birthModalLabel">
                {isEditing
                  ? "Edit Birth Certificate"
                  : "View Birth Certificate"}
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {!isEditing && selected && (
                <div id="viewMode">
                  <p>
                    <strong>Mother Name:</strong> {selected.motherName}
                  </p>
                  <p>
                    <strong>Place of Birth:</strong> {selected.placeOfBirth}
                  </p>
                  <p>
                    <strong>Time of Birth:</strong> {selected.timeOfBirth}
                  </p>
                  <p>
                    <strong>Issue Date:</strong> {selected.issueDate}
                  </p>
                </div>
              )}

              {isEditing && selected && (
                <form id="birthForm">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Mother Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selected.motherName}
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            motherName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Place of Birth</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selected.placeOfBirth}
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            placeOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Time of Birth</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selected.timeOfBirth}
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            timeOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Issue Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={selected.issueDate}
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            issueDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              {!isEditing ? (
                <button className="btn btn-success" onClick={handlePrint}>
                  <i className="fa-solid fa-print me-1"></i> Print
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fa-solid fa-floppy-disk me-1"></i> Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBirthCertificates;
