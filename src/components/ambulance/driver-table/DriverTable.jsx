import React from "react";

const DriverTable = () => {
  // Dummy driver data
  const drivers = [
    {
      id: 1,
      driverName: "Ramesh Pawar",
      licenseNumber: "MH12 2023456",
      contactNumber: "9876543210",
    },
    {
      id: 2,
      driverName: "Suresh Thakur",
      licenseNumber: "MH31 5566778",
      contactNumber: "9822334455",
    },
    {
      id: 3,
      driverName: "Mahesh Patil",
      licenseNumber: "MH49 9988776",
      contactNumber: "9090909090",
    },
  ];

  return (
    <div className="tab-pane fade show active" id="driverData" role="tabpanel">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Sr.No</th>
            <th>Driver Name</th>
            <th>License Number</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {drivers && drivers.length > 0 ? (
            drivers.map((drv, index) => (
              <tr key={drv.id || index}>
                <td>{index + 1}</td>
                <td>{drv.driverName}</td>
                <td>{drv.licenseNumber}</td>
                <td>{drv.contactNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No driver records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
