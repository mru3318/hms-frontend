import React from "react";

const ViewAmbulanceAssignmentCompletedTable = () => {
  // Dummy completed assignments
  const completedAssignments = [
    {
      id: 1,
      ambulance: { vehicleNumber: "MH31 AB 1234" },
      driver: { driverName: "Ramesh Pawar" },
      patient: { firstName: "Amit" },
      fromLocation: "Ward 1",
      toLocation: "ICU",
      status: "COMPLETED",
      startTime: "2025-03-01 10:00:00",
      endTime: "2025-03-01 10:30:00",
    },
    {
      id: 2,
      ambulance: { vehicleNumber: "MH31 XY 5678" },
      driver: { driverName: "Suresh Thakur" },
      patient: null,
      fromLocation: "Emergency Room",
      toLocation: "Ward 5",
      status: "COMPLETED",
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
  ];

  return (
    <div
      className="tab-pane fade show active"
      id="assignmentHistoryData"
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
          {completedAssignments.length > 0 ? (
            completedAssignments.map((assign, index) => (
              <tr key={assign.id}>
                <td>{index + 1}</td>
                <td>{assign.ambulance.vehicleNumber}</td>
                <td>{assign.driver.driverName}</td>
                <td>{assign.patient ? assign.patient.firstName : "-"}</td>
                <td>{assign.fromLocation}</td>
                <td>{assign.toLocation}</td>
                <td>
                  <span className="badge bg-success">{assign.status}</span>
                </td>
                <td>{assign.startTime}</td>
                <td>{assign.endTime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No completed assignment records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAmbulanceAssignmentCompletedTable;
