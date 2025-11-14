import React from "react";

function DoctorScheduleList() {
  // 🩺 Static doctor schedule data
  const schedules = [
    {
      id: 1,
      doctorName: "Dr. Ramesh Patil",
      department: "Cardiology",
      availableDays: ["Monday", "Wednesday", "Friday"],
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      fees: 500,
      status: true,
    },
    {
      id: 2,
      doctorName: "Dr. Meena Sharma",
      department: "Pediatrics",
      availableDays: ["Tuesday", "Thursday"],
      startTime: "11:00 AM",
      endTime: "3:00 PM",
      fees: 400,
      status: true,
    },
    {
      id: 3,
      doctorName: "Dr. Sanjay Deshmukh",
      department: "Orthopedics",
      availableDays: ["Monday", "Wednesday", "Saturday"],
      startTime: "9:00 AM",
      endTime: "1:00 PM",
      fees: 450,
      status: false,
    },
    {
      id: 4,
      doctorName: "Dr. Priya Kulkarni",
      department: "Dermatology",
      availableDays: ["Tuesday", "Thursday", "Friday"],
      startTime: "2:00 PM",
      endTime: "6:00 PM",
      fees: 550,
      status: true,
    },
  ];

  // 🗑 Static delete handler (demo only)
  const onDelete = (id) => {
    alert(`Delete button clicked for Schedule ID: ${id}`);
  };

  return (
    <div className="full-width-card card shadow-lg border-0 rounded-4">
      <div
        className="card-header text-center text-white"
        style={{
          backgroundColor: "#01C0C8",
          fontWeight: 600,
          fontSize: "1.25rem",
        }}
      >
        Doctor Schedules
      </div>

      <div className="card-body">
        {/* Desktop / Tablet: show table on md+ */}
        <div className="d-none d-md-block">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Available Days</th>
                <th>Available Time</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((sch) => (
                <tr key={sch.id}>
                  <td>{sch.id}</td>
                  <td>{sch.doctorName}</td>
                  <td>{sch.department}</td>
                  <td>
                    {sch.availableDays.map((day) => (
                      <span key={day} className="badge bg-info me-1">
                        {day}
                      </span>
                    ))}
                  </td>
                  <td>
                    {sch.startTime} - {sch.endTime}
                  </td>
                  <td>₹{sch.fees}</td>
                  <td>
                    <span
                      className={`badge ${
                        sch.status ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {sch.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(sch.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards for better readability */}
        <div className="d-block d-md-none">
          <div className="row g-3">
            {schedules.map((sch) => (
              <div key={sch.id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 className="mb-1">{sch.doctorName}</h6>
                        <div className="text-muted small">{sch.department}</div>
                      </div>
                      <div className="text-end">
                        <div>
                          <span
                            className={`badge ${
                              sch.status ? "bg-success" : "bg-secondary"
                            }`}
                          >
                            {sch.status ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="text-muted small">ID: {sch.id}</div>
                      </div>
                    </div>

                    <div className="mt-2 small">
                      <div>
                        <strong>Days: </strong>
                        {sch.availableDays.map((day) => (
                          <span key={day} className="badge bg-info me-1">
                            {day}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1">
                        <strong>Time: </strong>
                        {sch.startTime} - {sch.endTime}
                      </div>
                      <div className="mt-1">
                        <strong>Fees: </strong>₹{sch.fees}
                      </div>
                    </div>

                    <div className="mt-3 d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary flex-grow-1">
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-danger flex-grow-1"
                        onClick={() => onDelete(sch.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorScheduleList;
