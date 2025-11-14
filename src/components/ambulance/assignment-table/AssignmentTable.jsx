import React, { useState } from "react";

const AssignmentTable = () => {
  // Dummy assignment data
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      ambulance: { vehicleNumber: "MH31 AB 1234" },
      driver: { driverName: "Ramesh Pawar" },
      patient: { firstName: "Amit" },
      fromLocation: "Ward 1",
      toLocation: "ICU",
      status: "SCHEDULED",
      startTime: "2025-03-01 10:00:00",
      endTime: "2025-03-01 10:30:00",
    },
    {
      id: 2,
      ambulance: { vehicleNumber: "MH31 XY 5678" },
      driver: { driverName: "Suresh Thakur" },
      patient: null,
      fromLocation: "Emergency",
      toLocation: "Ward 5",
      status: "IN_PROGRESS",
      startTime: "2025-03-01 11:15:00",
      endTime: "2025-03-01 11:45:00",
    },
    {
      id: 3,
      ambulance: { vehicleNumber: "MH31 PQ 9988" },
      driver: { driverName: "Mahesh Patil" },
      patient: { firstName: "Sunita" },
      fromLocation: "OT",
      toLocation: "Recovery Room",
      status: "COMPLETED",
      startTime: "2025-03-01 09:00:00",
      endTime: "2025-03-01 09:20:00",
    },
  ]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div
      className="tab-pane fade show active"
      id="assignmentData"
      role="tabpanel"
    >
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Sr.No</th>
            <th>Ambulance</th>
            <th>Driver</th>
            <th>Patient</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>

        <tbody>
          {assignments.length > 0 ? (
            assignments.map((assign, index) => (
              <tr key={assign.id}>
                <td>{index + 1}</td>
                <td>{assign.ambulance.vehicleNumber}</td>
                <td>{assign.driver.driverName}</td>
                <td>{assign.patient ? assign.patient.firstName : "-"}</td>
                <td>{assign.fromLocation}</td>
                <td>{assign.toLocation}</td>

                {/* Status Badge + Dropdown */}
                <td>
                  <span
                    className={`badge ${
                      assign.status === "COMPLETED"
                        ? "bg-success"
                        : assign.status === "IN_PROGRESS"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {assign.status}
                  </span>

                  <select
                    className="form-select form-select-sm mt-2"
                    value={assign.status}
                    onChange={(e) =>
                      handleStatusChange(assign.id, e.target.value)
                    }
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </td>

                <td>{assign.startTime}</td>
                <td>{assign.endTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No assignment records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
