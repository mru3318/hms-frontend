import React, { useEffect, useState, useRef } from "react";

export default function ViewPatientAppointment() {
  const [appointments, setAppointments] = useState([
    {
      patient: "Rohan Das",
      age: "28",
      phone: "9876543210",
      doctor: "Dr. Anita Sharma",
      date: "15-02-2025",
      time: "11:00 AM – 12:00 PM",
      status: "Pending",
    },
    {
      patient: "Neha Verma",
      age: "32",
      phone: "9988776655",
      doctor: "Dr. Rakesh Patil",
      date: "20-02-2025",
      time: "02:00 PM – 03:00 PM",
      status: "Approved",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [modalData, setModalData] = useState({
    patient: "",
    age: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    status: "Pending",
  });

  const modalRef = useRef(null);

  // OPEN MODAL
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  // CLOSE MODAL
  const closeModal = () => {
    const modal = window.bootstrap.Modal.getInstance(modalRef.current);
    modal.hide();
  };

  // VIEW ROW
  const viewRow = (index) => {
    setSelectedIndex(null); // hide save button
    setModalData(appointments[index]);
    openModal();
  };

  // EDIT ROW
  const editRow = (index) => {
    setSelectedIndex(index); // show save button
    setModalData(appointments[index]);
    openModal();
  };

  // DELETE ROW
  const deleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // SAVE CHANGES
  const saveChanges = () => {
    if (selectedIndex === null) return;

    const updatedList = [...appointments];
    updatedList[selectedIndex] = modalData;
    setAppointments(updatedList);

    closeModal();
  };

  // STATUS COLOR MAP
  const statusColor = (status) => {
    return {
      Pending: "warning text-dark",
      Approved: "success",
      Completed: "secondary",
      Cancelled: "danger",
    }[status];
  };

  // FILTER APPOINTMENTS
  const filteredAppointments = appointments.filter((a) => {
    const matchSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.doctor.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "" ||
      a.status.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  return (
    <>
      {/* Header */}
      <div className="full-width-card rounded card shadow border-0">
        <div
          className="text-center text-white fw-bold py-3 rounded-top"
          style={{ backgroundColor: "#01c0c8" }}
        >
          <i className="bi bi-card-list me-2"></i> Patient Appointment List
        </div>

        {/* Search and Filter */}
        <div className="row px-4 mt-4 mb-2">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search patient, phone, doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Filter by Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive px-4 pb-4">
          <table className="table table-bordered table-hover">
            <thead className="bg-info text-white">
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((a, index) => (
                <tr key={index}>
                  <td>{a.patient}</td>
                  <td>{a.age}</td>
                  <td>{a.phone}</td>
                  <td>{a.doctor}</td>
                  <td>{a.date}</td>
                  <td>{a.time}</td>
                  <td>
                    <span className={`badge bg-${statusColor(a.status)}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-info btn-sm me-1"
                      onClick={() => viewRow(index)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-1"
                      onClick={() => editRow(index)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteRow(index)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="viewEditModal"
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title">Appointment Details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {/* Form Inputs */}
              <div className="row mb-2">
                <div className="col-6">
                  <label className="fw-bold">Patient:</label>
                  <input
                    className="form-control"
                    value={modalData.patient}
                    onChange={(e) =>
                      setModalData({ ...modalData, patient: e.target.value })
                    }
                  />
                </div>

                <div className="col-3">
                  <label className="fw-bold">Age:</label>
                  <input
                    className="form-control"
                    value={modalData.age}
                    onChange={(e) =>
                      setModalData({ ...modalData, age: e.target.value })
                    }
                  />
                </div>

                <div className="col-3">
                  <label className="fw-bold">Phone:</label>
                  <input
                    className="form-control"
                    value={modalData.phone}
                    onChange={(e) =>
                      setModalData({ ...modalData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-6">
                  <label className="fw-bold">Doctor:</label>
                  <input
                    className="form-control"
                    value={modalData.doctor}
                    onChange={(e) =>
                      setModalData({ ...modalData, doctor: e.target.value })
                    }
                  />
                </div>

                <div className="col-3">
                  <label className="fw-bold">Date:</label>
                  <input
                    className="form-control"
                    value={modalData.date}
                    onChange={(e) =>
                      setModalData({ ...modalData, date: e.target.value })
                    }
                  />
                </div>

                <div className="col-3">
                  <label className="fw-bold">Time:</label>
                  <input
                    className="form-control"
                    value={modalData.time}
                    onChange={(e) =>
                      setModalData({ ...modalData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="fw-bold">Status:</label>
                <select
                  className="form-select"
                  value={modalData.status}
                  onChange={(e) =>
                    setModalData({ ...modalData, status: e.target.value })
                  }
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              {selectedIndex !== null && (
                <button className="btn btn-success" onClick={saveChanges}>
                  Save Changes
                </button>
              )}
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
}
