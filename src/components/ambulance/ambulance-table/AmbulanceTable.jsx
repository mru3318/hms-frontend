import React from "react";

const AmbulanceTable = () => {
  // Dummy data
  const ambulances = [
    {
      id: 1,
      vehicleNumber: "MH31 AB 1234",
      ambulanceType: "Basic Life Support",
      ambulanceStatus: "Active",
      lastMaintenanceDate: "2025-02-10",
    },
    {
      id: 2,
      vehicleNumber: "MH31 XY 5678",
      ambulanceType: "Advanced Life Support",
      ambulanceStatus: "Inactive",
      lastMaintenanceDate: "2025-01-25",
    },
    {
      id: 3,
      vehicleNumber: "MH31 PQ 9988",
      ambulanceType: "Patient Transport",
      ambulanceStatus: "Active",
      lastMaintenanceDate: "2025-03-01",
    },
  ];

  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Sr.No</th>
          <th>Ambulance Number</th>
          <th>Type</th>
          <th>Status</th>
          <th>Last Maintenance Date</th>
        </tr>
      </thead>

      <tbody>
        {ambulances && ambulances.length > 0 ? (
          ambulances.map((amb, index) => (
            <tr key={amb.id || index}>
              <td>{index + 1}</td>
              <td>{amb.vehicleNumber}</td>
              <td>{amb.ambulanceType}</td>
              <td>
                <span
                  className={`badge ${
                    amb.ambulanceStatus === "Active"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {amb.ambulanceStatus}
                </span>
              </td>
              <td>{amb.lastMaintenanceDate}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No ambulance records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AmbulanceTable;
